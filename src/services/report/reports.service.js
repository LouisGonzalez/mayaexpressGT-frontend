import axios from "axios";

const API_URL = "http://localhost:3001/api";
const REPORT_PATH = "reports";

class ReportService {
  
  getMovementsByRegion(body) {
    return axios
      .post(`${API_URL}/${REPORT_PATH}/movements-by-region`, {
        ...body,
      })
      .then((response) => {
        return response.data;
      });
  }

  getMostPopularDestinations(body) {
    return axios.post(`${API_URL}/${REPORT_PATH}/popular-destinations`, {
      ...body
    })
    .then((response) => {
      return response.data
    })
  }
} 

export default ReportService;
