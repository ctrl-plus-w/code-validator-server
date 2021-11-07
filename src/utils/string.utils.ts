/**
 * Transform a string into its slug
 * @param str The string to slugify
 * @returns The slugifyied string
 */
export const slugify = (str: string): string => {
  str = str.replace(/^\s+|\s+$/g, ''); // Trim
  str = str.toLowerCase();

  // Remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaeeeeiiiioooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Collapse whitespace and replace by -
    .replace(/-+/g, '-'); // Collapse dashes

  return str;
};
