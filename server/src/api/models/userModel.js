import { query } from '../../db/index.js';

export const createUser = async (vorname, nachname, email, password) => {
    const query = 'INSERT INTO users (vorname, nachname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, vorname, nachname, email';
    const result = await db.query(query, [vorname, nachname, email, password]);
    return result.rows[0];
};

export const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
};
