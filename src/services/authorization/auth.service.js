import axios from "axios";

const API_URL = "http://localhost:3001/api";
const WORKER_PATH = "auth";

class AuthService {

    login(username, password){
        return axios
            .post(`${API_URL}/${WORKER_PATH}/sign-in`, {
                username,
                password
            })
            .then(response => (
                response.data           
            ))
    }

    logout(){
        localStorage.removeItem("user");
        //Aqui hay que quitar el token del context
    }


    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default AuthService;