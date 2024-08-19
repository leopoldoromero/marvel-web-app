export class StorageHandler {
    static save<T>(key: string, value: T) {
      try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
      } catch (error) {
        throw new Error(error as string);
      }
    }
  
    static retrieve<T>(key: string): T | null {
      try {
        const state = localStorage.getItem(key);
        if (state === null) return null;
        return JSON.parse(state);
      } catch (error) {
        throw new Error(error as string);
      }
    }
  
    static clear(key?: string): void {
      try {
        return key ? localStorage.removeItem(key) : localStorage.clear();
      } catch (error) {
        throw new Error(error as string);
      }
    }
  }
  