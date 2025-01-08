import { query } from '../../db/index.js';

const dbGetLocations = () => {
  return query('SELECT * FROM locations');
};

const dbGetLocationById = (id) => {
  return query('SELECT * FROM locations WHERE id = $1', [id]);
};

const dbCreateLocation = (name, address) => {
  return query(
    'INSERT INTO locations (name, address) VALUES ($1, $2) RETURNING *',
    [name, address]
  );
};

const dbUpdateLocation = (id, name, address) => {
  return query(
    'UPDATE locations SET name = $1, address = $2 WHERE id = $3 RETURNING *',
    [name, address, id]
  );
};

const dbDeleteLocation = (id) => {
  return query('DELETE FROM locations WHERE id = $1 RETURNING *', [id]);
};

export { dbGetLocations, dbGetLocationById, dbCreateLocation, dbUpdateLocation, dbDeleteLocation };