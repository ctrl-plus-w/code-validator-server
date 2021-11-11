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
      user: import('../database/models/User').User;
    }
  | {
      loggedIn: false;
      jwt: null;
      user: null;
    };
