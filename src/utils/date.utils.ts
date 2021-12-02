/**
 * Return a date with the given seconds changed.
 * @param date The date to modify the seconds.
 * @param value The new seconds value.
 * @returns A date
 */
export const setSeconds = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setSeconds(value);
  return tempDate;
};

/**
 * Return a date with the given minutes changed.
 * @param date The date to modify the minutes.
 * @param value The new minutes value.
 * @returns A date
 */
export const setMinutes = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setMinutes(value);
  return tempDate;
};

/**
 * Return a date with the given hours changed.
 * @param date The date to modify the hours.
 * @param value The new hours value.
 * @returns A date
 */
export const setHours = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setHours(value);
  return tempDate;
};

/**
 * Return a date with the given day changed.
 * @param date The date to modify the day.
 * @param value The new date value.
 * @returns A date
 */
export const setDate = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setDate(value);
  return tempDate;
};

/**
 * Return a date with the given month changed.
 * @param date The date to modify the month.
 * @param value The new month value.
 * @returns A date
 */
export const setMonth = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setMonth(value);
  return tempDate;
};

/**
 * Return a date with the given year changed.
 * @param date The date to modify the year.
 * @param value The new year value.
 * @returns A date
 */
export const setYear = (date: Date, value: number): Date => {
  const tempDate = new Date(date);
  tempDate.setFullYear(value);
  return tempDate;
};

/**
 * Return a date with its seconds incremented by the amount.
 * @param date The date to increment the seconds.
 * @param amount The amount of seconds to increment the date.
 * @returns A date
 */
export const incrementSeconds = (date: Date, amount: number): Date => {
  return setSeconds(date, date.getSeconds() + amount);
};

/**
 * Return a date with its minutes incremented by the amount.
 * @param date The date to increment the minutes.
 * @param amount The amount of minutes to increment the date.
 * @returns A date
 */
export const incrementMinutes = (date: Date, amount: number): Date => {
  return setMinutes(date, date.getMinutes() + amount);
};

/**
 * Return a date with its hours incremented by the amount.
 * @param date The date to increment the hours.
 * @param amount The amount of hours to increment the date.
 * @returns A date
 */
export const incrementHours = (date: Date, amount: number): Date => {
  return setHours(date, date.getHours() + amount);
};

/**
 * Return a date with its hours and minutes incremented by the given amount.
 * @param date The date to increment the time from
 * @param hours The amount of hours to increment
 * @param minutes The amount of minutes to increment
 * @returns A date
 */
export const incrementTime = (
  date: Date,
  hours: number,
  minutes: number
): Date => {
  return incrementHours(incrementMinutes(date, minutes), hours);
};

/**
 * Return a date with its date incremented by the amount.
 * @param date The date to increment the day.
 * @param amount The amount of days to increment the date.
 * @returns A date
 */
export const incrementDate = (date: Date, amount: number): Date => {
  return setDate(date, date.getDate() + amount);
};

/**
 * Return a date with its month incremented by the amount.
 * @param date The date to increment the months.
 * @param amount The amount of months to increment the date.
 * @returns A date
 */
export const incrementMonth = (date: Date, amount: number): Date => {
  return setMonth(date, date.getMonth() + amount);
};

/**
 * Return a date with its year incremented by the amount.
 * @param date The date to increment the years.
 * @param amount The amount of years to increment the date.
 * @returns A date
 */
export const incrementYear = (date: Date, amount: number): Date => {
  return setYear(date, date.getFullYear() + amount);
};

/**
 * Modify the hours and minutes of a date
 * @param date The date to modify
 * @param hours The new hours to set
 * @param minutes The new minutes to set
 * @returns A date
 */
export const setTime = (
  date: Date,
  hours: number,
  minutes: number,
  seconds = 0,
  ms = 0
): Date => {
  const tempDate = new Date(date);
  tempDate.setHours(hours);
  tempDate.setMinutes(minutes);
  tempDate.setSeconds(seconds);
  tempDate.setMilliseconds(ms);
  return tempDate;
};

/**
 * Check if the date is after today (at 23:59)
 * @param date The date to check
 * @returns A boolean
 */
export const isInFuture = (date: Date): boolean => {
  return date.valueOf() > setTime(new Date(), 24, 0, 0, 0).valueOf();
};
