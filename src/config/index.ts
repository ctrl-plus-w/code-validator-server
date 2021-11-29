import pkg from '../../package.json';

const CONFIG = {
  APP: {
    NAME: pkg.name,
    VERSION: pkg.version,
    DESCRIPTION: pkg.description,
    AUTHORS: pkg.authors,
    HOST: process.env.APP_HOST,
    BASE_URL: process.env.API_BASE_URL,
    PORT: process.env.NODE_ENV === 'test' ? 8888 : process.env.PORT || 8080,
    ENV: process.env.NODE_ENV
  },
  DATABASE: {
    URI: process.env.DB_URI,
    DIALECT: process.env.DB_DIALECT
  },
  AUTH: {
    SALT_ROUNDS: process.env.SALT_ROUNDS || '11',
    TOKEN_DURATION: process.env.TOKEN_DURATION || '1h',
    TOKEN_SALT: process.env.TOKEN_SALT || 'abcdefghijklm12345'
  },
  ROLES: {
    STUDENT: {
      NAME: 'Étudiant',
      SLUG: 'etudiant'
    },
    PROFESSOR: {
      NAME: 'Enseignant',
      SLUG: 'enseignant'
    },
    ADMIN: {
      NAME: 'Administrateur',
      SLUG: 'administrateur'
    }
  }
};

export default CONFIG;
