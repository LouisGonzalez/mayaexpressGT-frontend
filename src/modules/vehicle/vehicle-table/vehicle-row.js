import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/default-user-2.png";
import vehicle from "assets/images/carritocarga.jpg";

import { useState } from "react";
import VehicleService from "services/vehicle/vehicle.service";
import { useEffect } from "react";
import VehicleActions from "./vehicle-actions";

export default function VehicleRow() {
  const [vehicles, setVehicles] = useState();
  const [rows, setRows] = useState([]);

  const vehicleService = new VehicleService();

  async function getAllVehicles() {
    const vehicles2 = await vehicleService.getAll();
    setVehicles(vehicles2);
  }

  const VehicleType = ({ vehicleType, plate }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={vehicle} name={vehicleType} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {vehicleType}
        </MDTypography>
        <MDTypography variant="caption">{plate}</MDTypography>
      </MDBox>
    </MDBox>
  );

  useEffect(() => {
    getAllVehicles();
  }, []);

  useEffect(() => {
    if (vehicles !== undefined) {
      console.log(vehicles);
      const rowsTemp = [];
      vehicles.content.forEach((vehicle) => {
        rowsTemp.push({
          id: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {vehicle.id}
            </MDTypography>
          ),
          vehicletype: <VehicleType vehicleType={vehicle.vehicleType} plate={vehicle.plate} />,
          maxweight: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {vehicle.max_weight}
            </MDTypography>
          ),
          shipmentid: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {vehicle.shipment_id}
            </MDTypography>
          ),
          action: <VehicleActions vehicle={vehicle} />,
        });
      });
      setRows(rowsTemp);
    }
  }, [vehicles]);

  return {
    columns: [
      { Header: "Id", accessor: "id", align: "left" },
      { Header: "Especificaciones", accessor: "vehicletype", width: "45%", align: "left" },
      { Header: "Peso maximo", accessor: "maxweight", align: "left" },
      { Header: "Id. envio", accessor: "shipmentid", align: "center" },
      { Header: "Actions", accessor: "action", align: "center" },
    ],

    rows: rows,
  };
}
