import axios from "axios";

const API_URL = "http://localhost:3001/api";
const WORKER_PATH = "employee";

class WorkerService {
  getAll() {
    return axios.get(`${API_URL}/${WORKER_PATH}`).then((response) => {
      if (response.data) return response.data;
      console.log("No se recibio data");
    });
  }

  getWorker(idWorker) {
    return axios.get(`${API_URL}/${WORKER_PATH}/${idWorker}`).then((response) => {
      if (response.data) return response.data;
      console.log("No se recibio data");
    });
  }

  createWorker(worker) {
    return axios
      .post(`${API_URL}/${WORKER_PATH}`, {
        ...worker,
      })
      .then((response) => {
        return response.data;
      });
  }

  updateWorker(idWorker, worker) {
    return axios
      .put(`${API_URL}/${WORKER_PATH}/${idWorker}`, {
        ...worker,
      })
      .then((response) => {
        return response.data;
      });
  }

  deleteWorker(idWorker) {
    return axios.delete(`${API_URL}/${WORKER_PATH}/${idWorker}`).then((response) => {
      return response.data;
    });
  }

  workerToBranch(body) {
    return axios
      .put(`${API_URL}/${WORKER_PATH}/add/worker-to-branch`, {
        ...body,
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default WorkerService;
