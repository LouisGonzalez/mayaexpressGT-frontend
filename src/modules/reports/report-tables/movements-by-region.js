import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/default-user-2.png";
import guatemala from "assets/images/guatemala.png";

import { useState } from "react";
import { useEffect } from "react";
import ReportService from "services/report/reports.service";

export default function MovementsByRegion({
  handleMetricsX, 
  handleMetricsY, 
  reportSelected,
  initialDate,
  endDate
}) {

  const [rows, setRows] = useState([]);
  const [report, setReport] = useState();

  const reportService = new ReportService();

  const getReport = async () => {
    console.log(reportSelected)
    if(reportSelected === "2"){
        console.log('asdfasdf')
      const report2 = await reportService.getMovementsByRegion({
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
      labels.push(reportRow.region);
      values.push(reportRow.shipments);
    });
    handleMetricsX(labels);
    handleMetricsY(values);
  };

  const Region = ({ region }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={guatemala} name={region} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {region}
        </MDTypography>
      </MDBox>
    </MDBox>
  );


  useEffect(() => {
    getReport();
  },[reportSelected])

  useEffect(() => {
    if (report !== undefined) {
      console.log(report);
      const rowsTemp = [];
        report.forEach((reportRow) => {
          rowsTemp.push({
            region: <Region region={reportRow.region} />,
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
      { Header: "Region", accessor: "region", width: "45%", align: "left" },
      { Header: "No. Envios", accessor: "shipments", align: "center" },
    ],

    rows: rows,
  };
}
