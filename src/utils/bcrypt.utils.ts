import { compareSync, hashSync } from 'bcrypt';

import CONFIG from '@/config';

/**
 * Hash the password
 * @param password The password the encrypt
 * @returns An encrypted value
 */
export const hash = (password: string): string => {
  console.log(CONFIG.AUTH.SALT_ROUNDS);
  return hashSync(password, parseInt(CONFIG.AUTH.SALT_ROUNDS));
};

/**
 * Check if the password is valid
 * @param password The password to verify
 * @param encryptedPassword The encrypted password
 * @returns A boolean
 */
export const verify = (
  password: string,
  encryptedPassword: string
): boolean => {
  return compareSync(password, encryptedPassword);
};
