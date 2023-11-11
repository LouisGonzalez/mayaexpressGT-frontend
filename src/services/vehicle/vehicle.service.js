import axios from "axios";

const API_URL = "http://localhost:3001/api";
const WORKER_PATH = "vehicle";

class VehicleService {

  getAll() {
    return axios.get(`${API_URL}/${WORKER_PATH}`).then((response) => {
      if (response.data) return response.data;
      console.log("No se recibio data");
      return {
        message: "No se recibio data"
      }
    });
  }

  get(idVehicle) {
    return axios.get(`${API_URL}/${WORKER_PATH}/${idBranch}`).then((response) => {
      if (response.data) return response.data;
      console.log("No se recibio data");
      return {
        message: "No se recibio data"
      }
    });
  }

  create(vehicle) {
    return axios
      .post(`${API_URL}/${WORKER_PATH}`, {
        ...vehicle,
      })
      .then((response) => {
        return response.data;
      });
  }

  update(idVehicle, vehicle) {
    return axios
      .put(`${API_URL}/${WORKER_PATH}/${idVehicle}`, {
        ...vehicle,
      })
      .then((response) => {
        return response.data;
      });
  }

  del(idVehicle) {
    return axios.delete(`${API_URL}/${WORKER_PATH}/${idVehicle}`).then((response) => {
      return response.data;
    });
  }

  vehicleToBranch(body) {
    return axios.put(`${API_URL}/${WORKER_PATH}/add/vehicle-to-branch`, {
        ...body
    }).then((response) => {
        return response.data
    })
  }


}

export default VehicleService;
