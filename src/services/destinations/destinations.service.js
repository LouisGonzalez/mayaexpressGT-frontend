import axios from "axios";

const API_URL = "http://localhost:3001/api";
const WORKER_PATH = "destinations";

class DestinationsService {

  getAll() {
    return axios.get(`${API_URL}/${WORKER_PATH}`).then((response) => {
      if (response.data) return response.data;
      console.log("No se recibio data");
    });
  }

}

export default DestinationsService;
