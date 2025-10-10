## PR 유형

- [ ] 새로운 기능 추가
- [ ] 버그 수정
- [ ] CSS 등 사용자 UI 디자인 변경
- [ ] 코드에 영향을 주지 않는 변경사항 (오타 수정, 탭 사이즈 변경, 변수명 변경)
- [ ] 코드 리팩토링
- [ ] 주석 추가 및 수정
- [ ] 문서 수정
- [ ] 테스트 추가, 테스트 리팩토링
- [ ] 빌드 부분 혹은 패키지 매니저 수정
- [ ] 파일 혹은 폴더명 수정/삭제

---

## PR 체크리스트

- [ ] 커밋 메시지 컨벤션에 맞게 작성했습니다.
- [ ] 변경 사항에 대한 테스트를 했습니다. (버그 수정/기능에 대한 테스트)

---

### PR 상세

<!-- 변경 내용을 구체적으로 적어주세요. -->

---

## 이슈

resolves #

const target = "Hello hello\nHELLO";

// g
target.match(/hello/g); 
// ["hello"]

// i
target.match(/hello/gi);
// ["Hello", "hello", "HELLO"]

// m
target.match(/^HELLO/m);
// ["HELLO"]

// s 
"ab\ncd".match(/a.b/s);
// ["ab\n"]

// u 
"👍".match(/\u{1F44D}/u);
// ["👍"]

// y
const regex = /hello/y;
regex.lastIndex = 6;
target.match(regex);
// ["hello"] (index 6부터 바로 매칭 성공)