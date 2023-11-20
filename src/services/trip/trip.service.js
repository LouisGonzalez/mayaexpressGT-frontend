import axios from "axios";

const API_URL = "http://localhost:3001/api";
const WORKER_PATH = "trip";

class TripService {

  getShipmentsByTrip(idTrip) {
    return axios.get(`${API_URL}/${WORKER_PATH}/shipments/${idTrip}`).then((response) => {
      if (response.data) return response.data;
      console.log("No se recibio data");
      return {
        message: "No se recibio data",
      };
    });
  }

}

export default TripService;
