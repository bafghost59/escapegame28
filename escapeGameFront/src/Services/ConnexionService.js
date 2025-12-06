import axios from "axios"; 


function ConnexionUser(login, password) {
    
    return axios.post("http://localhost:3000/api/login", {
        login,
        password
    })


}

export default {ConnexionUser};