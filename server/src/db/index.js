import pg from 'pg';

const pool = new pg.Pool();

export const query = (text, params) => pool.query(text, params);
