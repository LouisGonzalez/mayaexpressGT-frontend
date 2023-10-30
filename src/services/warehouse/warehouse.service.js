import axios from "axios";

const API_URL = "http://localhost:3001/api";
const WORKER_PATH = "warehouse";

class WorkerService {
  getAll() {
    return axios.get(`${API_URL}/${WORKER_PATH}`).then((response) => {
      if (response.data) return response.data;
      console.log("No se recibio data");
    });
  }

  get(idWarehouse) {
    return axios.get(`${API_URL}/${WORKER_PATH}/${idWarehouse}`).then((response) => {
      if (response.data) return response.data;
      console.log("No se recibio data");
    });
  }

  create(warehouse) {
    return axios
      .post(`${API_URL}/${WORKER_PATH}`, {
        ...warehouse,
      })
      .then((response) => {
        return response.data;
      });
  }

  update(idWarehouse, warehouse) {
    return axios
      .put(`${API_URL}/${WORKER_PATH}/${idWarehouse}`, {
        ...warehouse,
      })
      .then((response) => {
        return response.data;
      });
  }

  del(idWarehouse) {
    return axios.delete(`${API_URL}/${WORKER_PATH}/${idWarehouse}`).then((response) => {
      return response.data;
    });
  }
}

export default WorkerService;
