import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/default-user-2.png";
import guatemala from "assets/images/guatemala.png";

import { useState } from "react";
import { useEffect } from "react";
import ReportService from "services/report/reports.service";

export default function MostPopularDestinations({
  handleMetricsX, 
  handleMetricsY, 
  reportSelected,
  initialDate,
  endDate
}) {
  const [rows, setRows] = useState([]);
  const [report, setReport] = useState();

  /* services */
  const reportService = new ReportService();

  const getReport = async () => {
    if(reportSelected === "3"){
      const report2 = await reportService.getMostPopularDestinations({
        startDate: initialDate,
        endDate: endDate,
      });
      cleanData(report2);
      setReport(report2);
    }
  }

  const cleanData = (report) => {
    const labels = [];
    const values = [];
    report.forEach((reportRow) => {
        labels.push(reportRow.department)
        values.push(reportRow.shipments)
    })
    handleMetricsX(labels);
    handleMetricsY(values);
  }

  const Department = ({ department }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={guatemala} name={department} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {department}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  useEffect(() => {
    getReport();
  }, [reportSelected])

  useEffect(() => {
    if (report !== undefined) {
      console.log(report);
      const rowsTemp = [];
      report.forEach((reportRow) => {
        rowsTemp.push({
          department: <Department department={reportRow.department} />,
          shipments: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {reportRow.shipments}
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
      { Header: "No. Envios", accessor: "shipments", align: "center" },
    ],

    rows: rows,
  };
}
