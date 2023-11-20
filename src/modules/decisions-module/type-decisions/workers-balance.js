import MDTypography from "components/MDTypography";

// Images
import team2 from "assets/images/default-user-2.png";

import { useState } from "react";
import { useEffect } from "react";
import DecisionsService from "services/decisions/decisions.service";

export default function WorkersBalance({ startDate, endDate }) {
  const [rows, setRows] = useState([]);
  const [report, setReport] = useState();

  const decisionService = new DecisionsService();

  const getReport = async () => {
    const report2 = await decisionService.balanceWorkers({
      startDate,
      endDate,
    });
    setReport(report2);
  };

  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      getReport();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (report !== undefined) {
      console.log(report);
      const rowsTemp = [];
      report.forEach((reportRow) => {
        rowsTemp.push({
          branchid: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Sucursal No. {reportRow.warehouse.id}
            </MDTypography>
          ),
          address: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {reportRow.warehouse.address}
            </MDTypography>
          ),
          department: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {reportRow.warehouse.department.name}
            </MDTypography>
          ),
          maxWeightLbs: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {reportRow.warehouse.maxWeightLbs}
            </MDTypography>
          ),
          workers: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {reportRow.employees}
            </MDTypography>
          ),
        });
      });
      setRows(rowsTemp);
    }
  }, [report]);

  return {
    columns: [
      { Header: "No. Sucursal", accessor: "branchid", align: "left" },
      { Header: "Direccion", accessor: "address", width: "30%", align: "left" },
      { Header: "Departament", accessor: "department", align: "left" },
      { Header: "Peso maximo", accessor: "maxWeightLbs", align: "left" },
      { Header: "No. Empleados sugeridos", accessor: "workers", align: "left" },
    ],
    rows: rows,
  };
}
