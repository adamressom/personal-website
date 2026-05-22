export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  if (email.length < 3 || email.length > 254) return false;
  if (email.includes("\n") || email.includes("\r")) return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
