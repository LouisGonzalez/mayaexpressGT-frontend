import { useEffect } from "react";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import WarehouseService from "services/warehouse/warehouse.service";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import PackagesInDestinationActions from "./packages-in-destination-actions";
import { useDataContextController } from "data-context/data-context";

function PackagesInDestinationRow(props) {
  /* Specific */
  const [packages, setPackages] = useState();
  const [rows, setRows] = useState([]);
  const { warehouseId } = props;

  /* context */
  const [generalController, generalDispatch] = useDataContextController();
  const { refresh } = generalController;

  const warehouseService = new WarehouseService();
  const getPackages = async () => {
    const packages2 = await warehouseService.packagesInDestination(warehouseId);
    console.log(packages2, "  LOS PACKAGES");
    setPackages(packages2);
  };

  useEffect(() => {
    getPackages();
  }, [warehouseId, refresh]);

  useEffect(() => {
    if (packages !== undefined) {
      console.log(packages);
      const rowsTemp = [];
      packages.forEach((pack) => {
        rowsTemp.push({
          shipment: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Guia No. {pack.shipmentId}
            </MDTypography>
          ),
          status:
            pack.state === "READY" ? (
              <MDBox ml={-1}>
                <MDBadge badgeContent={pack.state} color="success" variant="gradient" size="sm" />
              </MDBox>
            ) : (
              <MDBox ml={-1}>
                <MDBadge badgeContent={pack.state} color="black" variant="gradient" size="sm" />
              </MDBox>
            ),
          date: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {pack.date}
            </MDTypography>
          ),
          actions: <PackagesInDestinationActions trip={pack} idWarehouse={warehouseId} />,
        });
      });
      setRows(rowsTemp);
    }
  }, [packages]);

  return {
    columns: [
      { Header: "No. Envio", accessor: "shipment", align: "left" },
      { Header: "Estado", accessor: "status", align: "center" },
      { Header: "Fecha", accessor: "date", align: "center" },
      { Header: "Actions", accessor: "actions", align: "left" },
    ],
    rows: rows,
  };
}

export default PackagesInDestinationRow;
