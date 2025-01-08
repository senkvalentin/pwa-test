import { query } from '../../db/index.js';

const dbGetChecklistsForLocation = (locationId) => {
    return query('SELECT * FROM checklists WHERE location_id = $1', [locationId]);
};

const dbGetChecklistById = (locationId, checklistId) => {
    return query('SELECT * FROM checklists WHERE location_id = $1 AND id = $2', [locationId, checklistId]);
};

const dbCreateChecklist = (locationId, title, items) => {
    return query(
        'INSERT INTO checklists (location_id, title, items) VALUES ($1, $2, $3) RETURNING *',
        [locationId, title, JSON.stringify(items)]
    );
};

const dbUpdateChecklist = (locationId, checklistId, title, items) => {
    return query(
        'UPDATE checklists SET title = $1, items = $2 WHERE location_id = $3 AND id = $4 RETURNING *',
        [title, JSON.stringify(items), locationId, checklistId]
    );
};

const dbDeleteChecklist = (locationId, checklistId) => {
    return query('DELETE FROM checklists WHERE location_id = $1 AND id = $2 RETURNING *', [
        locationId,
        checklistId,
    ]);
};

export { dbGetChecklistsForLocation, dbGetChecklistById, dbCreateChecklist, dbUpdateChecklist, dbDeleteChecklist };
