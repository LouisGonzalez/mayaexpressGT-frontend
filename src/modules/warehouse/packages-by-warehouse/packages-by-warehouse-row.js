import { useEffect } from "react";
import PackagesByBranchActions from "./packages-by-warehouse-actions";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import WarehouseService from "services/warehouse/warehouse.service";
import PackagesByWarehouseActions from "./packages-by-warehouse-actions";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import { useDataContextController } from "data-context/data-context";

function PackageByWarehouseRow(props) {
  /* Specific */
  const [trips, setTrips] = useState();
  const [rows, setRows] = useState([]);
  const { warehouseId } = props;

  /* context */
  const [generalController, generalDispatch] = useDataContextController();
  const { refresh } = generalController;

  const warehouseService = new WarehouseService();

  const getTrips = async () => {
    const trips2 = await warehouseService.tripsByWarehouse(warehouseId);
    console.log(trips2, "  LOS VIAJES");
    setTrips(trips2);
  };

  useEffect(() => {
    getTrips();
  }, [warehouseId, refresh]);

  useEffect(() => {
    if (trips !== undefined) {
      console.log(trips);
      const rowsTemp = [];
      trips.forEach((trip) => {
        rowsTemp.push({
          trip: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {trip.tripId}
            </MDTypography>
          ),
          vehicle: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {trip.vehicleId}
            </MDTypography>
          ),
          currentWeight: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {trip.currentWeight}
            </MDTypography>
          ),
          warehouse: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {trip.warehouseToOrFrom.id}
            </MDTypography>
          ),
          date: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {trip.date}
            </MDTypography>
          ),
          isDeparture:
            trip.isDeparture === true ? (
              <MDBox ml={-1}>
                <MDBadge
                  badgeContent="LISTO PARA TRASLADO"
                  color="success"
                  variant="gradient"
                  size="sm"
                />
              </MDBox>
            ) : (
              <MDBox ml={-1}>
                <MDBadge badgeContent="EN CAMINO" color="error" variant="gradient" size="sm" />
              </MDBox>
            ),
          actions: <PackagesByWarehouseActions trip={trip} idWarehouse={warehouseId} />,
        });
      });
      setRows(rowsTemp);
    }
  }, [trips]);

  return {
    columns: [
      { Header: "No. Viaje", accessor: "trip", align: "center" },
      { Header: "Vehiculo", accessor: "vehicle", align: "center" },
      { Header: "Peso actual", accessor: "currentWeight", align: "center" },
      { Header: "Bodega origen/destino", accessor: "warehouse", align: "center" },
      { Header: "Fecha", accessor: "date", align: "center" },
      { Header: "Estado", accessor: "isDeparture", align: "center" },
      { Header: "Actions", accessor: "actions", align: "center" },
    ],
    rows: rows,
  };
}

export default PackageByWarehouseRow;