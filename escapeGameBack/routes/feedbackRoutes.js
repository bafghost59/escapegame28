import express from 'express';

import {
  getAllFeedbacksController,
  getAllFeedbacksWithDetailsController,
  getFeedbackByIdController,
  createFeedbackController,
  updateFeedbackController,
  deleteFeedbackController,
  getFeedbackStatsByEscapeIdController,
  getFeedbacksByEscapeIdController
} from '../controllers/feedbackController.js';
import verifyToken from '../middlewares/checkToken.js';

const router = express.Router();

router.get('/feedbacks', getAllFeedbacksController);
router.get('/feedbacks/details', getAllFeedbacksWithDetailsController);
router.get('/feedbacks/:id', getFeedbackByIdController);
router.post('/feedbacks', verifyToken, createFeedbackController);
router.put('/feedbacks/:id', verifyToken, updateFeedbackController);
router.delete('/feedbacks/:id', verifyToken, deleteFeedbackController);
router.get("/feedbacks/escape/:escapeId", getFeedbacksByEscapeIdController);
router.get("/feedbacks/escape/:escapeId/stats", getFeedbackStatsByEscapeIdController);

export default router;
