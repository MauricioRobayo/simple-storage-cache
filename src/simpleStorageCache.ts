interface CacheItem<T> {
  data: T;
  expiration: number;
}

class SimpleLocalStorageCache<T> {
  private key: string;

  constructor(key: string, private milliseconds: number, private storage: Storage = localStorage) {
    this.key = `slsc-${key}`
  }

  update(data: T): void {
    this.storage.setItem(
      this.key,
      JSON.stringify({
        data,
        expiration: Date.now() + this.milliseconds,
      })
    );
  }

  get(): CacheItem<T> | null {
    const cache = this.storage.getItem(this.key);
    
    if (!cache) {
      return null;
    }

    const parsedCache = JSON.parse(cache);

    if (Date.now() >= parsedCache.expiration) {
      return null;
    }

    return parsedCache;
  }
}

export default SimpleLocalStorageCache;
