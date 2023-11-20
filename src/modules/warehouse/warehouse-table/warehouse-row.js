import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/default-user-2.png";
import direccionImagen from "assets/images/direccion-imagen.png";

import { useState } from "react";
import WarehouseService from "services/warehouse/warehouse.service";
import { useEffect } from "react";
import WarehouseActions from "./warehouse-actions"
import { useMaterialUIController } from "context";
import { useDataContextController } from "data-context/data-context";

export default function WarehouseRow() {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  /* context */
  const [generalController, generalDispatch] = useDataContextController();
  const { refresh } = generalController;

  const [warehouses, setWarehouses] = useState();
  const [rows, setRows] = useState([]);

  const warehouseService = new WarehouseService();

  async function getAllWarehouses() {
    const warehouses = await warehouseService.getAll();
    setWarehouses(warehouses);
  }

  const WarehouseDirection = ({ image, direction }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={direction} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {direction}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  useEffect(() => {
    getAllWarehouses();
  }, [refresh]);

  useEffect(() => {
    if (warehouses !== undefined) {
      console.log(warehouses);
      const rowsTemp = [];
      warehouses.forEach((warehouse) => {
        rowsTemp.push({
          id: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Bodega no. {warehouse.id}
            </MDTypography>
          ),
          address: <WarehouseDirection image={direccionImagen} direction={warehouse.address} />,
          department: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {warehouse.department.name}
            </MDTypography>
          ),
          isEnable:
            warehouse.isEnable === true ? (
              <MDBox ml={-1}>
                <MDBadge badgeContent="enabled" color="success" variant="gradient" size="sm" />
              </MDBox>
            ) : (
              <MDBox ml={-1}>
                <MDBadge badgeContent="not enabled" color="error" variant="gradient" size="sm" />
              </MDBox>
            ),
          maxWeightLbs: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {warehouse.maxWeightLbs}
            </MDTypography>
          ),
          squareMeters: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {warehouse.squareMeters}
            </MDTypography>
          ),
          action: <WarehouseActions warehouse={warehouse} />,
        });
      });
      setRows(rowsTemp);
    }
  }, [warehouses]);

  return {
    columns: [
      { Header: "Id", accessor: "id", align: "left" },
      { Header: "Direccion", accessor: "address", width: "45%", align: "left" },
      { Header: "Departamento", accessor: "department", align: "center" },
      { Header: "Habilitada", accessor: "isEnable", align: "left" },
      { Header: "Peso max. (Kg)", accessor: "maxWeightLbs", align: "center" },
      { Header: "Metros cuadrados", accessor: "squareMeters", align: "center" },
      { Header: "Accion", accessor: "action", align: "center" },
    ],
    rows: rows,
  };
}
