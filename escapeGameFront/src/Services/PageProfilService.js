import axios from "axios"; 


function getAllBookingsById(id_account) {
    
    return axios.get(`http://localhost:3000/api/bookingsByAccountId/${id_account}`);
}

export default { getAllBookingsById };