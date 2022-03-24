import { EmitsEvent } from "./event";

/**
 * Check if value is of type object.
 *
 * @param value
 */
export function isObject(value: any): boolean {
  if (typeof value === "object" && value !== null) {
    return true;
  }
  return false;
}

/**
 * Check if value is of type array.
 * @param value
 */
export function isArray(value: any): boolean {
  return Array.isArray(value);
}

/**
 * Check if value is empty
 *
 * @param value
 */
export function isEmpty(value: any): boolean {
  if (Array.isArray(value) && value.length < 1) return true;
  if (isObject(value) && Object.keys(value).length < 1) return true;
  if (!value) return true;

  return false;
}

export async function EmitEvent<T>(
  event: EmitsEvent<T>,
  data: T
): Promise<void> {
  await event.emit(data);
  return;
}
