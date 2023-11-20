import axios from "axios";

const API_URL = "http://localhost:3001/api";
const WORKER_PATH = "decisions";

class DecisionsService {

  packagesRegionsSend(body) {
    return axios
      .post(`${API_URL}/${WORKER_PATH}/packages-regions-send`, {
        ...body,
      })
      .then((response) => {
        if (response.data) return response.data;
        console.log("No se recibio data");
      });
  }

  packagesDestinationsSend(body) {
    return axios.post(`${API_URL}/${WORKER_PATH}/packages-destinations-send`, {
        ...body
    }).then((response) => {
        if(response.data) return response.data;
        console.log("No se recibio data")
    })
  }

  packagesRegionsReceive(body) {
    return axios
      .post(`${API_URL}/${WORKER_PATH}/packages-regions-receive`, {
        ...body,
      })
      .then((response) => {
        if (response.data) return response.data;
        console.log("No se recibio data");
      });
  }

  packagesDestinationsReceive(body) {
    return axios
      .post(`${API_URL}/${WORKER_PATH}/packages-destinations-receive `, {
        ...body,
      })
      .then((response) => {
        if (response.data) return response.data;
        console.log("No se recibio data");
    });
  }

  balanceWorkers(body) {
    return axios
      .post(`${API_URL}/${WORKER_PATH}/balance-workers`, {
        ...body,
      })
      .then((response) => {
        if (response.data) return response.data;
        console.log("No se recibio data");
    });
  }

  balanceVehicles(body) {
    return axios
      .post(`${API_URL}/${WORKER_PATH}/balance-vehicles`, {
        ...body,
      })
      .then((response) => {
        if (response.data) return response.data;
        console.log("No se recibio data");
    });
  }

}

export default DecisionsService;
