import { useEffect } from "react";
import PackagesByBranchActions from "./packages-by-warehouse-actions";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import WarehouseService from "services/warehouse/warehouse.service";
import PackagesByWarehouseActions from "./packages-by-warehouse-actions";

function PackageByWarehouseRow(props) {

  /* Specific */
  const [packages, setPackages] = useState();
  const [rows, setRows] = useState([]);
  const { warehouseId } = props;

  const warehouseService = new WarehouseService();

  const getPackages = async () => {
    const packages2 = await warehouseService.packagesByWarehouse(warehouseId);
    console.log(packages2, '  LOS PACKAGES')
    setPackages(packages2);
  }

  useEffect(() => {
    getPackages();
  }, [warehouseId])

  useEffect(() => {
    if(packages !== undefined){
        console.log(packages)
        const rowsTemp = [];
        packages.content.forEach((pack) => {
            rowsTemp.push({
              package: (
                <MDTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  Guia No. {pack.idShipment}
                </MDTypography>
              ),
              actions: <PackagesByWarehouseActions pack={pack}/>
            });
        })
        setRows(rowsTemp)
    }
  }, [packages])

  return {
    columns: [
      { Header: "Paquete", accessor: "package", width: "45%", align: "left" },
      { Header: "Actions", accessor: "actions", align: "left" }
    ],
    rows: rows
  };

}

export default PackageByWarehouseRow;