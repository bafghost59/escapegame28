import bdd from '../config/bdd.js';


export const getAllBookings = async () => {
  const infoBookings = `
    SELECT id_booking, date_booking, hours_selected, status, user_id, escape_id
    FROM booking;
  `;
  const [response] = await bdd.query(infoBookings);
  return response;
};

export const getAllBookingsWithDetails = async () => {
  const infoBookingForAdmin = `
    SELECT
      booking.id_booking,
      booking.date_booking,
      booking.hours_selected,
      booking.status,
      users.lastname,
      users.firstname,
      users.email,
      escapeGame.title     AS escape_title,
      escapeGame.location  AS escape_location
    FROM booking
    INNER JOIN users
      ON booking.user_id = users.id_user
    INNER JOIN escapeGame
      ON booking.escape_id = escapeGame.id_escape;
  `;
  const [response] = await bdd.query(infoBookingForAdmin);
  return response;
};


export const getBookingById = async (id_booking) => {
  const sql = `
    SELECT
      b.id_booking,
      b.date_booking,
      b.hours_selected,
      b.status,

      u.lastname,
      u.firstname,
      u.email,
      u.adress,
      u.postal_code,
      u.city,

      e.title       AS escape_title,
      e.location    AS escape_location,
      e.price_escape,

      p.total_payment,
      p.date_payment,
      p.mode_payment
    FROM booking AS b
    INNER JOIN users AS u
      ON b.user_id = u.id_user
    INNER JOIN escapeGame AS e
      ON b.escape_id = e.id_escape
    LEFT JOIN payment AS p
      ON p.booking_id = b.id_booking
    WHERE b.id_booking = ?;
  `;

  const [rows] = await bdd.query(sql, [id_booking]);
  return rows[0] || null;
};


export const createBooking = async ({
  date_booking,
  hours_selected,
  status = 'en attente',
  user_id,
  escape_id,
}) => {
  const bookingCreated = `
    INSERT INTO booking (date_booking, hours_selected, status, user_id, escape_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [
    date_booking,
    hours_selected,
    status,
    user_id,
    escape_id,
  ];

  const [response] = await bdd.query(bookingCreated, params);
  return response;              
};

export const updateBookingStatusById = async (id_booking) => {
  const bookingStatusUpdated = `UPDATE booking SET status = 'confirmé' WHERE id_booking = ?`;

  const [response] = await bdd.query(bookingStatusUpdated, [id_booking])
  return response;
}


export const updateBooking = async (id_booking, {
  date_booking,
  hours_selected,
  status,
  user_id,
  escape_id,
}) => {
  const updatedBooking = `
    UPDATE booking
    SET date_booking = ?, hours_selected = ?, status = ?, user_id = ?, escape_id = ?
    WHERE id_booking = ?
  `;
  const params = [
    date_booking,
    hours_selected,
    status,
    user_id,
    escape_id,
    id_booking,
  ];

  const [response] = await bdd.query(updatedBooking, params);
  return response;
};


export const deleteBooking = async (id_booking) => {
  const deletedBooking = 'DELETE FROM booking WHERE id_booking = ?';
  const [result] = await bdd.query(deletedBooking, [id_booking]);
  return result;
};

export default getAllBookings;

export const checkAvailability = async (hours_selected, escape_id) => {
  const sql = `
    SELECT id_booking
    FROM booking
    WHERE hours_selected = ?
    AND escape_id = ?
    AND status != 'annulé'
    LIMIT 1
  `;
  const [rows] = await bdd.query(sql, [hours_selected, escape_id]);
  return rows.length > 0;
};

export const getBookedSlotsForEscapeAndDate = async (escape_id, date_booking) => {
  const sql = `
    SELECT DATE_FORMAT(hours_selected, '%H:%i') AS time_slot
    FROM booking
    WHERE escape_id = ?
      AND DATE(hours_selected) = ?
      AND status != 'annulǸ'
  `;
  const [rows] = await bdd.query(sql, [escape_id, date_booking]);
  // on renvoie un tableau du type ["10:00", "14:00", ...]
  return rows.map((row) => row.time_slot);
};


export const getBookingsByUserId = async (id_account) => {
  const sql = `
SELECT
  booking.*,
  escapeGame.title,
  escapeGame.location,
  escapeGame.price_escape,
  escapeGame.photo_escape
FROM booking
INNER JOIN users
  ON booking.user_id = users.id_user
INNER JOIN escapeGame
  ON booking.escape_id = escapeGame.id_escape
WHERE users.account_id = ?
ORDER BY booking.hours_selected ASC;
`;
  const [rows] = await bdd.query(sql, [id_account]);
  return rows;
};
