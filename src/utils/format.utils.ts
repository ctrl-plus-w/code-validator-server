/**
 * Transform the value to undefined if null
 * @param value The value to check
 * @returns The value or undefined
 */
export const valOrUndefined = (value: unknown): unknown => {
  if (value === undefined || value === null) return undefined;
  return value;
};
