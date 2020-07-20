export interface CacheItem<T> {
  data: T;
  expiration: number;
}

class SimpleLocalStorageCache<T> {
  private key: string;

  constructor(key: string, private durationInSeconds: number) {
    this.key = `slsc-${key}`
  }

  update(data: T): void {
    const durationInMilliseconds = this.durationInSeconds * 1000;
    
    localStorage.setItem(
      this.key,
      JSON.stringify({
        data,
        expiration: Date.now() + durationInMilliseconds,
      })
    );
  }

  get(): CacheItem<T> | null {
    const cache = localStorage.getItem(this.key);
    
    if (!cache) {
      return null;
    }

    const parsedCache = JSON.parse(cache);

    if (Date.now() >= parsedCache.expiration) {
      return null;
    }

    return parsedCache;
  }

  hasCache(): boolean {
    const cache = localStorage.getItem(this.key);
    
    if (!cache) {
      return false;
    }

    const parsedCache = JSON.parse(cache);

    return Date.now() < parsedCache.expiration;
  }
}

export default SimpleLocalStorageCache;
