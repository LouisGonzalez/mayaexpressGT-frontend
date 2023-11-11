import axios from "axios";

const API_URL = "http://localhost:3001/api";
const PRICE_PATH = "price";

class PriceService {
  getAll() {
    return axios.get(`${API_URL}/${PRICE_PATH}`).then((response) => {
      if (response.data) {
        return response.data;
      };
      console.log("No se recibio data");
    });
  }

  update(idPrice, price) {
    return axios
    .put(`${API_URL}/${PRICE_PATH}/${idPrice}`, {
      ...price,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error al actualizar el precio:", error);
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    });

  }

  getPrice(idOrigin, idDestination) {
    return axios
    .get(`${API_URL}/${PRICE_PATH}/${idOrigin}/${idDestination}`).then((response) => {
      if (response.data) return response.data;
      console.error("No se recibio data");
    });
  }

  sendShipping(shipment) {
    return axios
    .post(`${API_URL}/${PRICE_PATH}/send`, shipment)
    .then(response => {
      return response.data;
    });
  }
}

export default PriceService;
