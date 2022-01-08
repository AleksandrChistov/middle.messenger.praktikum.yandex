import {Indexed} from "./core/types";
import {host} from "./constants";


export function isObject(value: unknown): value is Indexed {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function getParams(data: Indexed | [], parentKey: string = '') {
  const result: [string, string][] = [];

  for(const [key, value] of Object.entries(data)) {
    if (isObject(value) || isArray(value)) {
      result.push(...getParams(value, `${parentKey}[${key}]`));
    } else {
      result.push([`${parentKey}[${key}]`, encodeURIComponent(String(value))]);
    }
  }

  return result;
}

/**
 * На входе: объект.
 * Пример: { key: 1, key2: 'test', key3: false, key4: true, key5: [1, 2, 3], key6: {a: 1}, key7: {b: {d: 2} } }
 * На выходе: строка.
 * Пример: '?key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
 */
export function queryStringify(data: Indexed | undefined): string {
  if (!isObject(data)) {
    throw new Error('input must be an object');
  }

  return '?' + getParams(data).map(arr => arr.join('=')).join('&');
}

export function isDeepEqual(a: Indexed, b: Indexed): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key: string) => {
    if (isObject(a[key]) || isArray(a[key])) {
      if (isObject(b[key]) || isArray(b[key])) {
        return isDeepEqual(a[key] as Indexed, b[key] as Indexed);
      }
      return false;
    } else {
      return a[key] === b[key];
    }
  })
}

export function cloneDeep<T extends object = object>(obj: T) {
  return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    if (item === null || typeof item !== "object") {
      return item;
    }

    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    if (item instanceof Array) {
      let copy = [] as unknown[];

      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    if (item instanceof Set) {
      let copy = new Set();

      item.forEach(v => copy.add(_cloneDeep(v)));

      return copy;
    }

    if (item instanceof Map) {
      let copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    if (item instanceof Object) {
      let copy: object = {};

      Object.getOwnPropertySymbols(item).forEach(s => (copy[s] = _cloneDeep(item[s])));

      Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}

export function debounce(fn: (...args: unknown[]) => void, ms: number): (...args: unknown[]) => void {
  let timeout: NodeJS.Timeout;

  return function (...args: unknown[]): void {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    }

    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
  }
}

export function getAvatarLink(pathToAvatar: string | null | undefined): string | null {
  return pathToAvatar ? `${host}/api/v2/resources${pathToAvatar}` : null;
}
