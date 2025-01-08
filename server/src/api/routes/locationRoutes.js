import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
} from '../controllers/locationController.js';

const router = express.Router();

router.get('/locations', asyncHandler(getLocations));
router.get('/locations/:id', asyncHandler(getLocationById));
router.post('/locations', asyncHandler(createLocation));
router.patch('/locations/:id', asyncHandler(updateLocation));
router.delete('/locations/:id', asyncHandler(deleteLocation));

export default router;
