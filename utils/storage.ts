export function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : fallback;
}

export function setStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorage(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

export function clearStorage() {
  if (typeof window === 'undefined') return;
  localStorage.clear();
} 