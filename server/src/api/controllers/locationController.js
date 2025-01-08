import {
  dbGetLocations,
  dbGetLocationById,
  dbCreateLocation,
  dbUpdateLocation,
  dbDeleteLocation
} from '../models/locationModel.js';

const getLocations = async (req, res) => {
  try {
    const result = await dbGetLocations();
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await dbGetLocationById(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createLocation = async (req, res) => {
  try {
    const { name, address } = req.body;
    const result = await dbCreateLocation(name, address);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    const result = await dbUpdateLocation(id, name, address);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await dbDeleteLocation(id);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export { getLocations, getLocationById, createLocation, updateLocation, deleteLocation };
