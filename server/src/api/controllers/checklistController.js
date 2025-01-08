import {
    dbGetChecklistsForLocation,
    dbGetChecklistById,
    dbCreateChecklist,
    dbUpdateChecklist,
    dbDeleteChecklist
} from '../models/checklistModel.js';

const getChecklistsForLocation = async (req, res) => {
    try {
        const { locationId } = req.params;
        const result = await dbGetChecklistsForLocation(locationId);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getChecklistById = async (req, res) => {
    try {
        const { locationId, checklistId } = req.params;
        const result = await dbGetChecklistById(locationId, checklistId);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Checklist not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const createChecklist = async (req, res) => {
    try {
        const { locationId } = req.params;
        const { title, items } = req.body;
        const result = await dbCreateChecklist(locationId, title, items);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateChecklist = async (req, res) => {
    try {
        const { locationId, checklistId } = req.params;
        const { title, items } = req.body;
        const result = await dbUpdateChecklist(locationId, checklistId, title, items);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Checklist not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const deleteChecklist = async (req, res) => {
    try {
        const { locationId, checklistId } = req.params;
        const result = await dbDeleteChecklist(locationId, checklistId);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Checklist not found' });
        }
        res.status(200).json({ message: 'Checklist deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export { getChecklistsForLocation, getChecklistById, createChecklist, updateChecklist, deleteChecklist };
