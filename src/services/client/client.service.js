import axios from "axios";

const API_URL = "http://localhost:3001/api";
const WORKER_PATH = "client";

class ClientService {

  getQr(idShipment) {
    return axios.get(`${API_URL}/${WORKER_PATH}/qr/${idShipment}`).then((response) => {
      if (response.data) return response.data;
      console.log("No se recibio data");
    });
  }

  getShipmentStatus(idShipment) {
    return axios.get(`${API_URL}/${WORKER_PATH}/shipment-status/${idShipment}`).then((response) => {
      if(response.data) return response.data
      console.log("No se recibio data");
    })
  }

}

export default ClientService;
