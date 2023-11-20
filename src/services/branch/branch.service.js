import axios from "axios";

const API_URL = "http://localhost:3001/api";
const WORKER_PATH = "branch";

class BranchService {
  getAll() {
    return axios.get(`${API_URL}/${WORKER_PATH}`).then((response) => {
      if (response.data) return response.data;
      console.log("No se recibio data");
    });
  }

  get(idBranch) {
    return axios.get(`${API_URL}/${WORKER_PATH}/${idBranch}`).then((response) => {
      if (response.data) return response.data;
      console.log("No se recibio data");
    });
  }

  create(branch) {
    return axios
      .post(`${API_URL}/${WORKER_PATH}`, {
        ...branch,
      })
      .then((response) => {
        return response.data;
      });
  }

  update(idBranch, branch) {
    return axios
      .put(`${API_URL}/${WORKER_PATH}/${idBranch}`, {
        ...branch,
      })
      .then((response) => {
        return response.data;
      });
  }

  del(idBranch) {
    return axios.delete(`${API_URL}/${WORKER_PATH}/${idBranch}`).then((response) => {
      return response.data;
    });
  }

  getSpentTypes() {
    return axios.get(`${API_URL}/${WORKER_PATH}/spents/get-all`).then((response) => {
      return response.data;
    })
  }

  createSpent(spent) {
    return axios.post(`${API_URL}/${WORKER_PATH}/spents/new-spent`, {
      ...spent
    }).then((response) => {
      return response.data
    })
  }

  branchesByDestination(idDestination) {
    return axios.get(`${API_URL}/${WORKER_PATH}/branches-by-department/${idDestination}`).then((response) => {
      return response.data
    }) 
  }

}

export default BranchService;
