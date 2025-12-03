import express from 'express';
import * as escapeGameController from '../controllers/escapeGameController.js';
import verifyToken from '../middlewares/checkToken.js';

const router = express.Router();

router.get('/escapes',  escapeGameController.getAllEscapesController);
router.get('/escapes/light', verifyToken, escapeGameController.getEscapesLightController);
router.get('/escapes/:id', escapeGameController.getEscapeByIdController);
router.post('/escapes', verifyToken, escapeGameController.createEscapeController);
router.put('/escapes/:id', verifyToken, escapeGameController.updateEscapeController);
router.delete('/escapes/:id', verifyToken, escapeGameController.deleteEscapeController);

export default router;
