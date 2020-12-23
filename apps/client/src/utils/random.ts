export function randomId(len: number = 12): string {
  return Math.random().toString(36).substring(2, len) + Math.random().toString(36).substring(2, len);
}
