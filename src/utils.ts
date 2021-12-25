import {FieldNameValueType} from "./services/form-validation-service";
import {Indexed} from "./core/types";

export function getErrorMessageFieldName(fieldName: FieldNameValueType): string {
  return `${fieldName}ErrorMessage`;
}

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
