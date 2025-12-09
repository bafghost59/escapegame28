import axios from "axios";

function fetchPageAdmin() {
    return axios.get("http://localhost:3000/api/bookings/details");
}

export default {fetchPageAdmin};    