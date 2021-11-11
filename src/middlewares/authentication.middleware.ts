import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

import { Context } from '@type/graphql';

/**
 * Throw an error if the user isn't logged in
 * @param context The request context
 */
export const isLoggedIn = async (context: Context): Promise<void> => {
  if (!context.loggedIn || !context.jwt.role)
    throw new AuthenticationError('You must be logged in');
};

/**
 * Throw an error if the user isn't an admin
 * @param context The request context
 */
export const checkIsAdmin = async (context: Context): Promise<void> => {
  await isLoggedIn(context);

  if (context.jwt && context.jwt.role.permission !== 0)
    throw new ForbiddenError("You don't have the required role");
};

/**
 * Throw an error if the user isn't an professor
 * @param context The request context
 */
export const checkIsProfessor = async (context: Context): Promise<void> => {
  await isLoggedIn(context);

  if (context.jwt && context.jwt.role.permission !== 1)
    throw new ForbiddenError("You don't have the required role");
};

/**
 * Throw an error if the user isn't an professor
 * @param context The request context
 */
export const checkIsStudent = async (context: Context): Promise<void> => {
  await isLoggedIn(context);

  if (context.jwt && context.jwt.role.permission !== 2)
    throw new ForbiddenError("You don't have the required role");
};

/**
 * Throw an error if the user isn't an professor or an admin
 * @param context The request context
 */
export const checkIsAdminOrProfessor = async (
  context: Context
): Promise<void> => {
  await isLoggedIn(context);

  if (context.jwt && context.jwt.role.permission in [0, 1])
    throw new ForbiddenError("You don't have the required role");
};

/**
 * Throw an error if the user isn't an professor or an student
 * @param context The request context
 */
export const checkIsStudentOrProfessor = async (
  context: Context
): Promise<void> => {
  await isLoggedIn(context);

  if (context.jwt && context.jwt.role.permission in [1, 2])
    throw new ForbiddenError("You don't have the required role");
};

/**
 * Throw an error if the user isn't a student or an admin
 * @param context The request context
 */
export const checkIsAdminOrStudent = async (
  context: Context
): Promise<void> => {
  await isLoggedIn(context);

  if (context.jwt && context.jwt.role.permission in [0, 2])
    throw new ForbiddenError("You don't have the required role");
};
