import config from '../config';
import * as dbLocal from './local';

const dbs = {
  local: dbLocal,
};

export const db = dbLocal;