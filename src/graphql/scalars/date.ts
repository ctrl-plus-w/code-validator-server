import { GraphQLScalarType, ASTNode, Kind } from 'graphql';

/**
 * Convert the Date to integer for JSON
 * @param value The date to serialize
 * @returns The value in ms
 */
const serialize = (value: Date): number => {
  return value.getTime();
};

/**
 * Convert integer to Date
 * @param value The value in ms
 * @returns The date
 */
const parseValue = (value: number): Date => {
  return new Date(value);
};

/**
 * Convert hard-coded AST string into the Date
 * @param ast The abstract syntax tree
 * @returns The Date
 */
const parseLiteral = (ast: ASTNode): Date | null => {
  if (ast.kind === Kind.INT) {
    return new Date(parseInt(ast.value, 10));
  }

  return null;
};

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',

  serialize,
  parseValue,
  parseLiteral
});

export default dateScalar;
