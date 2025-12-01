import bdd from '../config/bdd.js';


export const getAllPayments = async () => {
  const AllPayments = `
    SELECT
      id_payment,
      total_payment,
      date_payment,
      mode_payment,
      booking_id
    FROM payment;
  `;
  const [response] = await bdd.query(AllPayments);
  return response;
};

export const getAllPaymentsWithBooking = async () => {
  const AllPaymentsWithBooking = `
    SELECT
      payment.id_payment,
      payment.total_payment,
      payment.date_payment,
      payment.mode_payment,
      payment.booking_id,
      booking.date_booking,
      booking.hours_selected,
      booking.status
    FROM payment
    INNER JOIN booking
      ON payment.booking_id = booking.id_booking;
  `;
  const [response] = await bdd.query(AllPaymentsWithBooking);
  return response;
};


export const getPaymentById = async (id_payment) => {
  const PaymentById = 'SELECT * FROM payment WHERE id_payment = ?';
  const [rows] = await bdd.query(PaymentById, [id_payment]);
  return rows[0] || null;
};


export const createPayment = async ({
  total_payment,
  date_payment,
  mode_payment,
  booking_id,
}) => {
  const AddPayment = `
    INSERT INTO payment
      (total_payment, date_payment, mode_payment, booking_id)
    VALUES (?, ?, ?, ?)
  `;
  const params = [
    total_payment,
    date_payment,
    mode_payment,
    booking_id,
  ];

  const [response] = await bdd.query(AddPayment, params);
  return response;
};


export const updatePayment = async (id_payment, {
  total_payment,
  date_payment,
  mode_payment,
  booking_id,
}) => {
  const PaymentUpdated = `
    UPDATE payment
    SET total_payment = ?, date_payment = ?, mode_payment = ?, booking_id = ?
    WHERE id_payment = ?
  `;
  const params = [
    total_payment,
    date_payment,
    mode_payment,
    booking_id,
    id_payment,
  ];

  const [response] = await bdd.query(PaymentUpdated, params);
  return response;
};


export const deletePayment = async (id_payment) => {
  const PaymentDeleted = 'DELETE FROM payment WHERE id_payment = ?';
  const [response] = await bdd.query(PaymentDeleted, [id_payment]);
  return response;
};

export default getAllPayments;

