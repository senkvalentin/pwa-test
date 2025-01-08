import express from 'express';
import asyncHandler from 'express-async-handler';
import {
    getChecklistsForLocation,
    getChecklistById,
    createChecklist,
    updateChecklist,
    deleteChecklist
} from '../controllers/checklistController.js';

const router = express.Router();

router.get('/locations/:locationId/checklists', asyncHandler(getChecklistsForLocation));
router.get('/locations/:locationId/checklists/:checklistId', asyncHandler(getChecklistById));
router.post('/locations/:locationId/checklists', asyncHandler(createChecklist));
router.patch('/locations/:locationId/checklists/:checklistId', asyncHandler(updateChecklist));
router.delete('/locations/:locationId/checklists/:checklistId', asyncHandler(deleteChecklist));

export default router;
