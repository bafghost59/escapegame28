import express from 'express';
import * as escapeGameController from '../controllers/escapeGameController.js';

const router = express.Router();

router.get('/escapes', escapeGameController.getAllEscapesController);
router.get('/escapes/light', escapeGameController.getEscapesLightController);
router.get('/escapes/:id', escapeGameController.getEscapeByIdController);
router.post('/escapes', escapeGameController.createEscapeController);
router.put('/escapes/:id', escapeGameController.updateEscapeController);
router.delete('/escapes/:id',escapeGameController.deleteEscapeController);

export default router;
