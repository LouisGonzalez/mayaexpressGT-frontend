import MDTypography from "components/MDTypography";

// Images
import team2 from "assets/images/default-user-2.png";

import { useState } from "react";
import { useEffect } from "react";
import DecisionsService from "services/decisions/decisions.service";

export default function DestinationsReceive({ startDate, endDate }) {
  const [rows, setRows] = useState([]);
  const [report, setReport] = useState();

  const decisionService = new DecisionsService();

  const getReport = async () => {
    const report2 = await decisionService.packagesDestinationsReceive({
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
          department: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {reportRow.department}
            </MDTypography>
          ),
          packages: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {reportRow.packages}
            </MDTypography>
          ),
        });
      });
      setRows(rowsTemp);
    }
  }, [report]);

  return {
    columns: [
      { Header: "Departamento", accessor: "department", width: "45%", align: "left" },
      { Header: "Paquetes", accessor: "packages", align: "left" },
    ],
    rows: rows,
  };
}
