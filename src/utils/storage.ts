const inMemoryStore = new Map<string, string>();

function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === 'undefined') return defaultValue;

    let raw: string | null = null;
    if (isStorageAvailable()) {
      raw = window.localStorage.getItem(key);
    } else {
      raw = inMemoryStore.get(key) ?? null;
    }

    if (raw === null || raw === undefined) {
      return defaultValue;
    }

    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[Storage] Failed to read key "${key}":`, error);
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): boolean {
  try {
    if (typeof window === 'undefined') return false;

    const serialized = JSON.stringify(value);
    if (isStorageAvailable()) {
      window.localStorage.setItem(key, serialized);
    }
    inMemoryStore.set(key, serialized);
    return true;
  } catch (error) {
    console.warn(`[Storage] Failed to write key "${key}":`, error);
    // Fallback to in-memory store even if localStorage fails
    try {
      inMemoryStore.set(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
}

export function removeStorageItem(key: string): void {
  try {
    if (typeof window !== 'undefined' && isStorageAvailable()) {
      window.localStorage.removeItem(key);
    }
    inMemoryStore.delete(key);
  } catch (error) {
    console.warn(`[Storage] Failed to delete key "${key}":`, error);
  }
}
