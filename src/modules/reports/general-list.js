import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import MostUsedRoutes from "./report-tables/most-used-routes";
import MovementsByRegion from "./report-tables/movements-by-region";
import MostPopularDestinations from "./report-tables/most-popular-destinations";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import MDInput from "components/MDInput";
import { useMaterialUIController } from "context";


export function Reports() {

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;    


  const [ tableData, setTableData ] = useState();
  const [reportSelected, setReportSelected] = useState("");
  const [titleReport, setTitleReport] = useState("");
  const [metricsX, setMetricsX] = useState([]);
  const [metricsY, setMetricsY] = useState([]);

  const [initialDate, setInitialDate] = useState('2000-01-01');
  const [endDate, setEndDate] = useState('2030-01-01');

  const handleMetricsX = (newMetrics) => {
    setMetricsX(newMetrics);
  };

  const handleMetricsY = (newMetrics) => {
    setMetricsY(newMetrics);
  };

  const reportChart = {
    labels: metricsX,
    datasets: { label: "Sales", data: metricsY},
  };


  const report1 = MostUsedRoutes({
    handleMetricsX,
    handleMetricsY,
    reportSelected
  });
  const report2 = MovementsByRegion({
    handleMetricsX,
    handleMetricsY,
    reportSelected,
    initialDate,
    endDate
  });
  const report3 = MostPopularDestinations({
    handleMetricsX,
    handleMetricsY,
    reportSelected,
    initialDate,
    endDate
  });

  const handleReportSelected = (event) => {
    setReportSelected(event.target.value)
  }
 
  const handleTable = () => {
    switch (reportSelected) {
        case "1":
            setTableData({
                titleReport: "Rutas mas usadas",
                rows: report1.rows,
                columns: report1.columns
            })
            break;
        case "2":
            setTableData({
              titleReport: "Movimientos por region",
              rows: report2.rows,
              columns: report2.columns,
            });

            break;
        case "3":
            setTableData({
              titleReport: "Departamentos mas populares",
              rows: report3.rows,
              columns: report3.columns,
            });
            break;
        default:
            break;
    }
  }

  useEffect(() => {
    handleTable();
  }, [reportSelected])


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor={darkMode ? "transparent" : "grey-100"}
        borderRadius="lg"
        p={3}
        mb={1}
        mt={2}
      >
        <MDBox width="100%" display="flex" flexDirection="column">
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            mb={2}
          >
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                &nbsp;Fecha inicial:&nbsp;&nbsp;&nbsp;
              </MDTypography>

              <MDInput variant="outlined" size="small" fullWidth type="date" value={initialDate} onChange={(e) => setInitialDate(e.target.value)}/>
            </MDBox>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                &nbsp;Fecha final:&nbsp;&nbsp;&nbsp;
              </MDTypography>

              <MDInput variant="outlined" size="small" fullWidth type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
            </MDBox>
            <MDBox mb={1} lineHeight={0}>
              <FormControl
                sx={{
                  m: 1,
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
                fullWidth
              >
                <InputLabel id="label-sucursales-activas">Listado de reportes</InputLabel>
                <Select
                  labelId="label-sucursales-activas"
                  id="select-sucursales-activas"
                  label="Listado de reportes0"
                  value={reportSelected}
                  onChange={handleReportSelected}
                >
                  <MenuItem value="1">
                    <em>Rutas mas usadas</em>
                  </MenuItem>
                  <MenuItem value="2">
                    <em>Movimientos por region</em>
                  </MenuItem>
                  <MenuItem value="3">
                    <em>Departamentos mas populares</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
      {tableData !== undefined && (
        <Grid container rowSpacing={5}>
          <Grid item xs={12}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="Departamentos mas populares"
                description="Listado de los departamentos mas populares"
                date="Actualizado recientemente"
                chart={reportChart}
              />
            </MDBox>
          </Grid>
        </Grid>
      )}

      {tableData !== undefined && (
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    {tableData.titleReport}
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: tableData.columns, rows: tableData.rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      )}

      <Footer />
    </DashboardLayout>
  );
}
