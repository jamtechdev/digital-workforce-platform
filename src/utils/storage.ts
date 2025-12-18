export const storage = {
  get<T>(key: string, fallback: T): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  },

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  clear(): void {
    localStorage.clear();
  }
};
