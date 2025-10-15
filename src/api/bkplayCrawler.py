import os
import re
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from supabase import create_client, Client

# ===== (선택) .env 로드 =====
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

# ===== 상수 =====
BASE_URL = "https://sfa.bkplay.kr"
YEAR_LIST_URL = f"{BASE_URL}/tournament/all/year/list.do"
DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; BKPlayCrawler/1.0; +https://example.com)"
}

# ===== Supabase 설정 =====
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def get_supabase_client() -> Client:
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise RuntimeError("SUPABASE_URL / SUPABASE_KEY 환경변수를 설정하세요.")
    return create_client(SUPABASE_URL, SUPABASE_KEY)

# ===== HTTP 유틸 (재시도 포함) =====
def fetch(url: str, params: dict | None = None) -> requests.Response:
    """GET 요청을 3회까지 재시도하며 수행한다."""
    for attempt_index in range(3):
        try:
            response = requests.get(url, params=params, headers=DEFAULT_HEADERS, timeout=10)
            response.raise_for_status()
            return response
        except Exception:
            if attempt_index == 2:
                raise
            time.sleep(1.5 * (attempt_index + 1))

# ===== 공통 유틸 =====
def squish(text: str) -> str:
    """연속 공백/개행을 한 칸으로 정리."""
    return re.sub(r"\s+", " ", text or "").strip()

# ===== 기간 파싱 =====
def parse_period(source_text: str, default_year: int | None = None) -> tuple[str | None, str | None]:
    """
    텍스트에서 'YYYY.MM.DD ~ YYYY.MM.DD' 또는 'MM.DD ~ MM.DD' 형태를 찾아 ISO 날짜로 반환.
    """
    year_in_text_match = re.search(r"(\d{4})\.", source_text)
    base_year = year_in_text_match.group(1) if year_in_text_match else default_year

    period_match = re.search(
        r"(\d{4}\.)?(\d{1,2})\.(\d{1,2})\s*~\s*(\d{4}\.)?(\d{1,2})\.(\d{1,2})",
        source_text,
    )
    if not period_match:
        return None, None

    start_year_str = (period_match.group(1)[:-1]) if period_match.group(1) else (base_year or "")
    end_year_str   = (period_match.group(4)[:-1]) if period_match.group(4) else (start_year_str or base_year or "")

    def normalize_iso_date(year_str: str, month_str: str, day_str: str) -> str | None:
        if year_str == "":
            return None
        return f"{int(year_str):04d}-{int(month_str):02d}-{int(day_str):02d}"

    start_date_str = normalize_iso_date(start_year_str, period_match.group(2), period_match.group(3))
    end_date_str   = normalize_iso_date(end_year_str,   period_match.group(5), period_match.group(6))
    return start_date_str, end_date_str

def parse_period_iso(text: str, default_year: int | None = None) -> tuple[str | None, str | None]:
    """ 'YYYY.MM.DD ~ YYYY.MM.DD' 또는 'MM.DD ~ MM.DD' → ISO (YYYY-MM-DD) """
    return parse_period(text, default_year)

# ===== 월 필터 =====
def month_matches(start_date_str: str | None, target_month: int | None) -> bool:
    """
    시작일(YYYY-MM-DD)의 월이 target_month와 같은지 검사.
    target_month가 None이면(= 'all') 항상 True.
    """
    if target_month is None:
        return True
    if not start_date_str or len(start_date_str) < 7:
        return False
    return int(start_date_str[5:7]) == target_month

# ===== 라벨 정규화 & 값 파서 =====
def normalize_label(label: str) -> str:
    base = re.sub(r"\s+", "", label or "").strip()
    mapping = {
        "구분": "category",
        "참가지역": "region",
        "접수기간": "apply_period",
        "신청기간": "apply_period",
        "대회기간": "event_period",
        "대회일정": "event_period",
        "주최": "host",
        "주관": "organizer",
        "후원": "supporter",
        "협찬": "sponsor",
        "참가비": "fee",
        "계좌번호": "account",
        "예금주": "account_holder",
        "문의전화": "contact",
        "문의": "contact",
        "연락처": "contact",
    }
    if base in mapping:
        return mapping[base]
    if "계좌" in base: return "account"
    if "문의" in base or "연락" in base: return "contact"
    if "주최" in base: return "host"
    if "주관" in base: return "organizer"
    if "후원" in base: return "supporter"
    if "협찬" in base: return "sponsor"
    if "참가비" in base or "참가료" in base: return "fee"
    if "접수기간" in base or "신청기간" in base: return "apply_period"
    if "대회기간" in base or "일정" in base: return "event_period"
    return base

def parse_money(text: str) -> dict:
    digits = re.findall(r"\d[\d,]*", text or "")
    amount = None
    if digits:
        amount = int(re.sub(r"[^\d]", "", digits[0]))
    return {"fee_amount": amount, "fee_raw": squish(text)}

def parse_phone(text: str) -> list[str]:
    phones = re.findall(r"(0\d{1,2}[-.\s]?\d{3,4}[-.\s]?\d{4})", text or "")
    return list(dict.fromkeys(p.replace(" ", "").replace(".", "-") for p in phones))

def parse_account(text: str) -> dict:
    bank = None
    account = None
    holder = None

    bank_match = re.search(r"(국민|신한|우리|부산|농협|하나|기업|대구|경남|광주|전북|SC제일|씨티|카카오|토스)은행?", text)
    if bank_match:
        bank = bank_match.group(0)

    acct_match = re.search(r"\b\d{6,}\b(?:-\d+)*", text.replace(" ", ""))
    if acct_match:
        account = acct_match.group(0)

    holder_match = re.search(r"예금주[:\s]*([^\s]+)", text)
    if holder_match:
        holder = holder_match.group(1)

    return {"account_bank": bank, "account_number": account, "account_holder": holder, "account_raw": squish(text)}

# ===== 포스터 + 상세 테이블 추출 (분해 포함) =====
def extract_poster_and_detail(detail_soup: BeautifulSoup, base_url: str, default_year: int | None = None) -> tuple[str | None, list[dict], dict, dict]:
    """
    return: (poster_url, rows, detail_kv, parsed)
      - rows: [{label, value}] 원본 정리
      - detail_kv: { normalized_key: raw_value }
      - parsed: 구조화 필드 (apply/event 기간, fee, account, contacts 등)
    """
    # 포스터
    poster_url: str | None = None
    poster_img = detail_soup.select_one("div.poster img")
    if poster_img and poster_img.get("src"):
        poster_url = urljoin(base_url, poster_img["src"])

    rows: list[dict] = []
    detail_kv: dict = {}
    parsed: dict = {
        "apply_start": None, "apply_end": None,
        "event_start": None, "event_end": None,
        "fee_amount": None, "fee_raw": None,
        "account_bank": None, "account_number": None, "account_holder": None, "account_raw": None,
        "contacts": [],
        "category": None, "region": None, "host": None, "organizer": None, "supporter": None, "sponsor": None,
    }

    # 테이블 느슨 탐색
    table = detail_soup.select_one("table.table.detail") or detail_soup.select_one("table.detail") or detail_soup.select_one("table")
    if table:
        for idx, tr in enumerate(table.select("tr"), start=1):
            th = tr.find("th")
            tds = tr.find_all("td")

            if th and tds:
                label_text = squish(th.get_text(" ", strip=True))
                value_text = squish(" ".join(td.get_text(" ", strip=True) for td in tds))
            elif len(tds) >= 2:
                label_text = squish(tds[0].get_text(" ", strip=True))
                value_text = squish(" ".join(td.get_text(" ", strip=True) for td in tds[1:]))
            elif len(tds) == 1:
                label_text = f"row_{idx:02d}"
                value_text = squish(tds[0].get_text(" ", strip=True))
            else:
                continue

            if label_text and "접수기간" in label_text:
                value_text = re.sub(r"\s*~\s*", " ~ ", value_text)

            rows.append({"label": label_text, "value": value_text})

            key = normalize_label(label_text)
            detail_kv[key] = value_text

            # 분해 로직
            if key == "apply_period":
                s, e = parse_period_iso(value_text, default_year)
                parsed["apply_start"], parsed["apply_end"] = s, e
            elif key == "event_period":
                s, e = parse_period_iso(value_text, default_year)
                parsed["event_start"], parsed["event_end"] = s, e
            elif key == "fee":
                parsed.update(parse_money(value_text))
            elif key == "account":
                parsed.update(parse_account(value_text))
            elif key == "contact":
                phones = parse_phone(value_text)
                parsed["contacts"] = list({*parsed.get("contacts", []), *phones})
            elif key in ("category", "region", "host", "organizer", "supporter", "sponsor"):
                parsed[key] = value_text

    return poster_url, rows, detail_kv, parsed

# ===== 메인 스크래핑 =====
def scrape_year_page(
    year: int | None,
    target_month: int | None,
    include_detail: bool = True,
    delay_sec: float = 0.4,
):
    """
    연간 리스트 페이지를 긁어 대상 월의 대회만 추려서 반환.
    target_month=None이면 월 필터를 적용하지 않고 '전부' 반환.
    year는 날짜 파싱 기본값으로만 사용(페이지는 all/year/list.do 하나).
    """
    year_page_response = fetch(YEAR_LIST_URL)
    year_page_soup = BeautifulSoup(year_page_response.text, "html.parser")
    detail_anchors = year_page_soup.select('a[href*="/tournament/detail.do"]')

    tournaments: list[dict] = []

    for _, detail_anchor in enumerate(detail_anchors, start=1):
        title_text = detail_anchor.get_text(strip=True)
        detail_url = urljoin(BASE_URL, detail_anchor.get("href"))
        parent_node = detail_anchor.find_parent()
        surrounding_text = parent_node.get_text(" ", strip=True) if parent_node else ""

        start_date_str, end_date_str = parse_period(surrounding_text, default_year=year or None)
        poster_url: str | None = None
        detail_rows: list[dict] = []
        detail_kv: dict = {}
        parsed: dict = {}

        if include_detail:
            detail_response = fetch(detail_url)
            detail_soup = BeautifulSoup(detail_response.text, "html.parser")
            detail_text = detail_soup.get_text(" ", strip=True)

            refined_start_date_str, refined_end_date_str = parse_period(detail_text, default_year=year or None)
            start_date_str = refined_start_date_str or start_date_str
            end_date_str   = refined_end_date_str   or end_date_str

            poster_url, detail_rows, detail_kv, parsed = extract_poster_and_detail(
                detail_soup, BASE_URL, default_year=year or None
            )

        # 월 필터
        if not month_matches(start_date_str, target_month):
            continue

        tournament_id_match = re.search(r"tnmtId=(\d+)", detail_url)
        tournament_id = tournament_id_match.group(1) if tournament_id_match else None

        tournament_item = {
            "tnmtId": tournament_id,
            "title": title_text,
            "startDate": start_date_str,
            "endDate": end_date_str,
            "detailUrl": detail_url,
            "posterUrl": poster_url,
            "detailRows": detail_rows,  
            "detailKv": detail_kv,      
            "parsed": parsed,           
        }
        tournaments.append(tournament_item)

        if include_detail and delay_sec:
            time.sleep(delay_sec)

    return tournaments

# ===== Supabase 업서트 유틸 =====
def to_row_for_db(t: dict) -> dict | None:
    """크롤 결과(dict) -> DB 업서트용 레코드. tnmt_id 없으면 스킵."""
    tnmt_id = t.get("tnmtId")
    if not tnmt_id:
        return None

    parsed = t.get("parsed") or {}
    kv     = t.get("detailKv") or {}

    contacts = parsed.get("contacts") or []
    if not isinstance(contacts, list):
        contacts = []

    return {
        "tnmt_id":     tnmt_id,
        "title":       t.get("title"),

        "start_date":  t.get("startDate") or None,
        "end_date":    t.get("endDate") or None,

        "category":       kv.get("category"),
        "region":         kv.get("region"),
        "apply_start":    parsed.get("apply_start"),
        "apply_end":      parsed.get("apply_end"),
        "event_start":    parsed.get("event_start"),
        "event_end":      parsed.get("event_end"),
        "fee_amount":     parsed.get("fee_amount"),
        "fee_raw":        parsed.get("fee_raw"),
        "account_bank":   parsed.get("account_bank"),
        "account_number": parsed.get("account_number"),
        "account_holder": parsed.get("account_holder"),
        "contact_primary": kv.get("contact"),
        "contacts":       contacts,
        "host":           kv.get("host"),
        "organizer":      kv.get("organizer"),
        "supporter":      kv.get("supporter"),
        "sponsor":        kv.get("sponsor"),

        "detail_url":  t.get("detailUrl"),
        "poster_url":  t.get("posterUrl"),

        "detail_rows": t.get("detailRows") or [],
        "detail_kv":   kv,
        "parsed":      parsed,
        "raw":         t,
    }

def upsert_tournaments(rows: list[dict], batch_size: int = 500):
    """bk_tournaments에 배치 업서트(on_conflict=tnmt_id)."""
    if not rows:
        print("ℹ️ 업서트할 데이터가 없습니다.")
        return
    sb = get_supabase_client()

    cleaned = [r for r in (to_row_for_db(t) for t in rows) if r is not None]
    if not cleaned:
        print("ℹ️ 유효한 tnmt_id가 없어 업서트를 건너뜁니다.")
        return

    for i in range(0, len(cleaned), batch_size):
        chunk = cleaned[i:i+batch_size]
        sb.table("bk_tournaments").upsert(chunk, on_conflict="tnmt_id").execute()
        print(f"✅ 업서트 배치 {i//batch_size + 1}: {len(chunk)}건")

# ===== 실행부 =====
if __name__ == "__main__":
    year_env = os.getenv("YEAR", "")
    month_env = os.getenv("MONTH", "all").strip().lower()

    target_year: int | None = int(year_env) if year_env.isdigit() else None
    if month_env in ("", "all", "전체", "allmonths", "any"):
        target_month: int | None = None
    else:
        try:
            target_month = int(month_env)
        except ValueError:
            target_month = None

    include_detail_pages = os.getenv("DETAIL", "true").lower() == "true"

    tournament_list = scrape_year_page(
        year=target_year,
        target_month=target_month, 
        include_detail=include_detail_pages,
    )

    print("=== CONFIG ===")
    print("YEAR env     :", os.getenv("YEAR", ""))
    print("MONTH env    :", os.getenv("MONTH", "all"))
    print("DETAIL env   :", os.getenv("DETAIL", "true"))
    print("Resolved year:", target_year)
    print("Resolved month(target_month):", target_month) 
    print("================")

    for display_index, tournament in enumerate(tournament_list, start=1):
        print(
            f"{display_index:02d}. "
            f"[{tournament['startDate']}~{tournament['endDate']}] "
            f"{tournament['title']}"
        )
        print(f"    tnmtId={tournament['tnmtId']}")
        print(f"    poster: {tournament.get('posterUrl') or '-'}")
        rows = tournament.get("detailRows") or []
        print(f"    rows: {len(rows)}개")
        for r in rows:
            print(f"      - {r.get('label','')}: {r.get('value','')}")
        print(f"    kv: {tournament.get('detailKv', {})}")
        p = tournament.get("parsed", {})
        print(f"    parsed.apply: {p.get('apply_start')} ~ {p.get('apply_end')}")
        print(f"    parsed.event: {p.get('event_start')} ~ {p.get('event_end')}")
        print(f"    parsed.fee_amount: {p.get('fee_amount')}")
        print(f"    parsed.account: {p.get('account_bank')} {p.get('account_number')} ({p.get('account_holder')})")
        print(f"    parsed.contacts: {', '.join(p.get('contacts', []))}")
        print(f"    detail: {tournament['detailUrl']}")
    print(f"\nTOTAL: {len(tournament_list)} items")

    try:
        upsert_tournaments(tournament_list)
        print("✅ Supabase 업서트 완료")
    except Exception as e:
        print(f"❌ Supabase 업서트 실패: {e}")
