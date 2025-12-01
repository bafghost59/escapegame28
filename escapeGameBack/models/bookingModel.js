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
  const bookingById = 'SELECT * FROM booking WHERE id_booking = ?';
  const [rows] = await bdd.query(bookingById, [id_booking]);
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
