import axios from "axios"; 


function RegisterUser(login, password, lastname, firstname, email, adress, postal_code, city) {
    
    return axios.post("http://localhost:3000/api/addUser", {
            login,
      password,
      lastname,
      firstname,
      email,
      adress,
      postal_code,
      city,
    })
}

export default {RegisterUser};