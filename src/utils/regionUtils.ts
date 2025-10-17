export function extractRegionTags(region: string | null | undefined): string[] {
  const tags = new Set<string>();
  const text = (region ?? '').trim();
  if (!text) return [];

  const tokens = text.split(/\s+/).filter(Boolean);
  const hasNational = tokens.includes('전국') || text.includes('전국');

  if (hasNational) {
    tags.add('전국대회');
  } else {
    tags.add('지역대회');
  }

  const firstLocal = tokens.find((t) => t !== '전국');
  if (firstLocal) {
    tags.add(firstLocal);
  } else if (!hasNational && tokens[0]) {
    tags.add(tokens[0]);
  }

  return Array.from(tags);
}
