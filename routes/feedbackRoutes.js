import express from 'express';

import {
  getAllFeedbacksController,
  getAllFeedbacksWithDetailsController,
  getFeedbackByIdController,
  createFeedbackController,
  updateFeedbackController,
  deleteFeedbackController,
} from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/feedbacks', getAllFeedbacksController);
router.get('/feedbacks/details', getAllFeedbacksWithDetailsController);
router.get('/feedbacks/:id', getFeedbackByIdController);
router.post('/feedbacks', createFeedbackController);
router.put('/feedbacks/:id', updateFeedbackController);
router.delete('/feedbacks/:id', deleteFeedbackController);

export default router;
