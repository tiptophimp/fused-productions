const buckets = new Map<string, { count: number; reset: number }>();

export function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const row = buckets.get(key);
  if (!row || row.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return false;
  }
  row.count += 1;
  return row.count > limit;
}
