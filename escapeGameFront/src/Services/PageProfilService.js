import axios from "axios"; 


function getAllBookingsById(id_account) {
    
    return axios.get(`http://localhost:3000/api/bookingsByAccountId/${id_account}`);
}


function getAllInfoByUser(id_account) {
    
    return axios.get(`http://localhost:3000/api/infoUserById/${id_account}`);
}

function updateUser (id_account, formProfil) {
    return axios.put(`http://localhost:3000/api/updateUser/${id_account}`, formProfil)
}

function updateBooking (bookingId, data) {
  return axios.put(`http://localhost:3000/api/bookings/${bookingId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    }
  });

}

function deleteBooking(bookingId) {
  return axios.delete(`http://localhost:3000/api/bookings/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });
}

function confirmPayment(bookingId) {
  const token = localStorage.getItem("token") || "";
  return axios.patch(
    `http://localhost:3000/api/bookings/${bookingId}/confirm-payment`,
    {}, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export default { getAllBookingsById, getAllInfoByUser, updateUser, updateBooking, deleteBooking, confirmPayment};
