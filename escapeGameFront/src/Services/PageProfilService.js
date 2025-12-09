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


export default { getAllBookingsById, getAllInfoByUser, updateUser};
