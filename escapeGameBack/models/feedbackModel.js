import bdd from '../config/bdd.js';


export const getAllFeedbacks = async () => {
  const AllFeedbacks = `
    SELECT
      id_feedback,
      rated,
      user_id,
      escape_id,
      rating,
      photo_feedback
    FROM feedback;
  `;
  const [response] = await bdd.query(AllFeedbacks);
  return response;
};


export const getAllFeedbacksWithDetails = async () => {
  const AllFeedbacksWithDetails = `
    SELECT
      feedback.id_feedback,
      feedback.rated,
      feedback.rating,
      feedback.photo_feedback,
      users.lastname,
      users.firstname,
      users.email,
      escapeGame.title     AS escape_title,
      escapeGame.location  AS escape_location
    FROM feedback
    INNER JOIN users
      ON feedback.user_id = users.id_user
    INNER JOIN escapeGame
      ON feedback.escape_id = escapeGame.id_escape;
  `;
  const [response] = await bdd.query(AllFeedbacksWithDetails);
  return response;
};


export const getFeedbackById = async (id_feedback) => {
  const FeedbackById = 'SELECT * FROM feedback WHERE id_feedback = ?';
  const [rows] = await bdd.query(FeedbackById, [id_feedback]);
  return rows[0] || null;
};


export const createFeedback = async ({
  rated,
  user_id,
  escape_id,
  rating,
  photo_feedback,
}) => {
  const AddFeedback = `
    INSERT INTO feedback
      (rated, user_id, escape_id, rating, photo_feedback)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [
    rated,            
    user_id,
    escape_id,
    rating,          
    photo_feedback,
  ];

  const [response] = await bdd.query(AddFeedback, params);
  return response;
};


export const updateFeedback = async (id_feedback, {
  rated,
  user_id,
  escape_id,
  rating,
  photo_feedback,
}) => {
  const FeedbackUpdated = `
    UPDATE feedback
    SET rated = ?, user_id = ?, escape_id = ?, rating = ?, photo_feedback = ?
    WHERE id_feedback = ?
  `;
  const params = [
    rated,
    user_id,
    escape_id,
    rating,
    photo_feedback,
    id_feedback,
  ];

  const [response] = await bdd.query(FeedbackUpdated, params);
  return response;
};


export const deleteFeedback = async (id_feedback) => {
  const FeedbackDeleted = 'DELETE FROM feedback WHERE id_feedback = ?';
  const [response] = await bdd.query(FeedbackDeleted, [id_feedback]);
  return response;
};

export default getAllFeedbacks;
