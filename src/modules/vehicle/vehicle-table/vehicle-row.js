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
import { useDataContextController } from "data-context/data-context";

export default function VehicleRow() {

  /* context */
  const [generalController, generalDispatch] = useDataContextController();
  const { refresh } = generalController;

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
  }, [refresh]);

  useEffect(() => {
    if (vehicles !== undefined) {
      console.log(vehicles);
      const rowsTemp = [];
      vehicles.forEach((vehicle) => {
        rowsTemp.push({
          id: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {vehicle.id}
            </MDTypography>
          ),
          vehicletype: <VehicleType vehicleType={vehicle.vehicleType} plate={vehicle.plate} />,
          branchId: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {vehicle.warehouse !== null ? "Sucursal No." + vehicle.warehouse.id : "SIN ASIGNAR"}
            </MDTypography>
          ),
          ubication: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {vehicle.warehouse !== null ? vehicle.warehouse.department.name : "SIN ASIGNAR"}
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
      { Header: "No. Sucursal", accessor: "branchId", align: "center" },
      { Header: "Ubicacion", accessor: "ubication", align: "left" },
      { Header: "Actions", accessor: "action", align: "center" },
    ],

    rows: rows,
  };
}
