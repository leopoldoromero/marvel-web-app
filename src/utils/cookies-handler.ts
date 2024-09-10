export class CookieHandler {
  static set(name: string, value: string, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  static get(name: string): string | null {
    const cookies = document.cookie.split(';');
    if (!cookies) {
      return null;
    }
    return cookies.find((cookie) => cookie.includes(name))?.split('=')[1] ?? null;
  }

  static clear() {
    document.cookie = '';
  }
}
