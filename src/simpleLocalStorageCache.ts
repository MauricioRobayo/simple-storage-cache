export interface CacheItem<T> {
  data: T;
  expiration: number;
}

class SimpleLocalStorageCache<T> {
  constructor(private key: string, private durationInSeconds: number) {}

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
}

export default SimpleLocalStorageCache;
