export interface CacheItem<T> {
  data: T;
  expiration: number;
}

class SimpleLocalStorageCache<T> {
  private expiration: number | null = null;
  private key: string;

  constructor(key: string, private durationInSeconds: number) {
    this.key = `slsc-${key}-${Math.floor(Math.random() * 1_000_000_000)}`
  }

  update(data: T): void {
    const durationInMilliseconds = this.durationInSeconds * 1000;
    this.expiration = Date.now() + durationInMilliseconds;
    
    localStorage.setItem(
      this.key,
      JSON.stringify({
        data,
        expiration: this.expiration,
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
    return !!this.expiration && this.expiration > Date.now();
  }
}

export default SimpleLocalStorageCache;
