import bdd from "../config/bdd.js";

export const createSupport = async ({
  user_id,
  booking_id = null,
  subject,
  message,
  status = "open",
}) => {
  const sql = `
    INSERT INTO support (user_id, booking_id, subject, message, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [user_id, booking_id, subject, message, status];
  const [result] = await bdd.query(sql, params);
  return result; // result.insertId
};

export const getAllSupport = async () => {
  const sql = `
    SELECT
      s.id_support,
      s.user_id,
      s.booking_id,
      s.subject,
      s.message,
      s.status,
      s.created_at
    FROM support AS s
    ORDER BY s.created_at DESC
  `;
  const [rows] = await bdd.query(sql);
  return rows;
};

export const getSupportById = async (id_support) => {
  const sql = `
    SELECT
      s.id_support,
      s.user_id,
      s.booking_id,
      s.subject,
      s.message,
      s.status,
      s.created_at
    FROM support AS s
    WHERE s.id_support = ?
  `;
  const [rows] = await bdd.query(sql, [id_support]);
  return rows[0] || null;
};

export const updateSupport = async (id_support, { subject, message, status }) => {
  const sql = `
    UPDATE support
    SET subject = ?, message = ?, status = ?
    WHERE id_support = ?
  `;
  const params = [subject, message, status, id_support];
  const [result] = await bdd.query(sql, params);
  return result;
};

export const deleteSupport = async (id_support) => {
  const sql = `
    DELETE FROM support
    WHERE id_support = ?
  `;
  const [result] = await bdd.query(sql, [id_support]);
  return result;
};

export default {
  createSupport,
  getAllSupport,
  getSupportById,
  updateSupport,
  deleteSupport,
};
