import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import priceImage from "assets/images/tarifario.png";
import { useState } from "react";
import PriceService from "services/price/price.service";
import { useEffect } from "react";
import PriceActions from "./price-actions"

export default function PriceRow() {
  const [prices, setPrice] = useState();
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const priceService = new PriceService();

  async function getAllPrice() {
    const prices = await priceService.getAll();
    setPrice(prices);
  }

  const PriceOrigin = ({ image, origin }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={origin} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {origin}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  useEffect(() => {
    getAllPrice();
  }, [refresh]);

  useEffect(() => {
    if (prices !== undefined) {
      const rowsTemp = [];
      prices.forEach((price) => {
        rowsTemp.push({
          origin: <PriceOrigin image={priceImage} origin={price.origen.name} />,
          destination:(
            <MDTypography display="block" variant="button" fontWeight="medium">
              {price.destination.name}
            </MDTypography>
          ),
          sendingCost: (
            <MDTypography display="block" variant="button" fontWeight="medium">
              {price.sendingCost}
            </MDTypography>
          ),
          costPerLb: (
            <MDTypography display="block" variant="button" fontWeight="medium">
              {price.costPerLb}
            </MDTypography>
          ),
          action: <PriceActions price={price} setRefresh={setRefresh} />,
        });
      });
      setRows(rowsTemp);
    }
  }, [prices]);

  return {
    columns: [
      { Header: "Origen", accessor: "origin", width: "45%", align: "left" },
      { Header: "Destino", accessor: "destination", align: "left" },
      { Header: "Costo de Envío (Q)", accessor: "sendingCost", align: "center" },
      { Header: "Costo por Libra (Q)", accessor: "costPerLb", align: "center" },
      { Header: "Accion", accessor: "action", align: "center" },
    ],
    rows: rows,
  };
}
