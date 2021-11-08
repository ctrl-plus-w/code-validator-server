export interface TokenPayload {
  id: number;
  username: string;
  role: import('../database/models/Role').Role;
  iat: number;
  exp: number;
}

export type Context =
  | {
      loggedIn: true;
      jwt: TokenPayload;
    }
  | {
      loggedIn: false;
      jwt: null;
    };
