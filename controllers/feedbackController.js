
import {
  getAllFeedbacks,
  getAllFeedbacksWithDetails,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from '../models/feedbackModel.js';


export const getAllFeedbacksController = async (req, res) => {
  try {
    const feedbacks = await getAllFeedbacks();
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const getAllFeedbacksWithDetailsController = async (req, res) => {
  try {
    const feedbacks = await getAllFeedbacksWithDetails();
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const getFeedbackByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await getFeedbackById(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback non trouvé' });
    }

    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const createFeedbackController = async (req, res) => {
  try {
    const {
      rated,
      user_id,
      escape_id,
      rating,
      photo_feedback,
    } = req.body;

    if (rated === undefined || !user_id || !escape_id) {
      return res
        .status(400)
        .json({ message: 'rated, user_id et escape_id sont requis' });
    }

    const result = await createFeedback({
      rated,
      user_id,
      escape_id,
      rating,
      photo_feedback,
    });

    res.status(201).json({
      message: 'Feedback créé',
      id_feedback: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const updateFeedbackController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rated,
      user_id,
      escape_id,
      rating,
      photo_feedback,
    } = req.body;

    const result = await updateFeedback(id, {
      rated,
      user_id,
      escape_id,
      rating,
      photo_feedback,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Feedback non trouvé' });
    }

    res.json({ message: 'Feedback mis à jour' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const deleteFeedbackController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteFeedback(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Feedback non trouvé' });
    }

    res.json({ message: 'Feedback supprimé' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
