export function randomId(len = 12): string {
  return Math.random().toString(36).substring(2, len) + Math.random().toString(36).substring(2, len);
}
