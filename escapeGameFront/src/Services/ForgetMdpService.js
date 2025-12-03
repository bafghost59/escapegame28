import axios from "axios"; 


function resetPassword(login, email) {
    
    return axios.post("http://localhost:3000/api/accountByLogin", {
        login,
        email
    });
}

export default { resetPassword };
