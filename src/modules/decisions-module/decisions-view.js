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
import VehiclesBalance from "./type-decisions/vehicles-balance";
import WorkersBalance from "./type-decisions/workers-balance";
import RegionsSend from "./type-decisions/regions-send";
import RegionsReceive from "./type-decisions/regions-receive";
import DestinationsSend from "./type-decisions/destinations-send";
import DestinationsReceive from "./type-decisions/destinations-receive";
import { useMaterialUIController } from "context";
import MDInput from "components/MDInput";
import { useDataContextController } from "data-context/data-context";
import { setRefresh } from "data-context/data-context";

export function DecisionsView() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  /* context */
  const [generalController, generalDispatch] = useDataContextController();
  const { refresh } = generalController;

  const [tableData, setTableData] = useState();
  const [reportSelected, setReportSelected] = useState("");
  const [startDate, setStartDate] = useState("2000-01-01");
  const [endDate, setEndDate] = useState("2030-01-01");

  // const report1 = MostUsedRoutes();
  // const report2 = MovementsByRegion();
  // const report3 = MostPopularDestinations();
  const report1 = RegionsSend({ startDate, endDate });
  const report2 = RegionsReceive({ startDate, endDate });
  const report3 = DestinationsSend({ startDate, endDate });
  const report4 = DestinationsReceive({ startDate, endDate });
  const report5 = WorkersBalance({ startDate, endDate });
  const report6 = VehiclesBalance({ startDate, endDate });

  const handleReportSelected = (event) => {
    setReportSelected(event.target.value);
  };

  const handleStartDate = (event) => {
    setStartDate(event.target.value);
    setRefresh(generalDispatch, !refresh);
  };

  const handleEndDate = (event) => {
    setEndDate(event.target.value);
    setRefresh(generalDispatch, !refresh)
  }

  const handleTable = () => {
    switch (reportSelected) {
      case "1":
        setTableData({
          titleReport: "Paquetes enviados por region",
          rows: report1.rows,
          columns: report1.columns,
        });
        break;
      case "2":
        setTableData({
          titleReport: "Paquetes recibidos por region",
          rows: report2.rows,
          columns: report2.columns,
        });

        break;
      case "3":
        setTableData({
          titleReport: "Paquetes enviados por departamento",
          rows: report3.rows,
          columns: report3.columns,
        });
        break;
      case "4":
        setTableData({
          titleReport: "Paquetes recibidos por region",
          rows: report4.rows,
          columns: report4.columns,
        });
        break;
      case "5":
        setTableData({
          titleReport: "Balance - empleados",
          rows: report5.rows,
          columns: report5.columns,
        });
        break;
      case "6":
        setTableData({
          titleReport: "Balance - vehiculos",
          rows: report6.rows,
          columns: report6.columns,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleTable();
  }, [reportSelected]);

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

              <MDInput
                variant="outlined"
                size="small"
                fullWidth
                type="date"
                value={startDate}
                onChange={handleStartDate}
              />
            </MDBox>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                &nbsp;Fecha final:&nbsp;&nbsp;&nbsp;
              </MDTypography>

              <MDInput
                variant="outlined"
                size="small"
                fullWidth
                type="date"
                value={endDate}
                onChange={handleEndDate}
              />
            </MDBox>

            <MDBox>
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
                    <em>Paquetes enviados por region</em>
                  </MenuItem>
                  <MenuItem value="2">
                    <em>Paquetes recibidos por region</em>
                  </MenuItem>
                  <MenuItem value="3">
                    <em>Paquetes enviados por departamento</em>
                  </MenuItem>
                  <MenuItem value="4">
                    <em>Paquetes recibidos por departamento</em>
                  </MenuItem>
                  <MenuItem value="5">
                    <em>Balance - empleados</em>
                  </MenuItem>
                  <MenuItem value="6">
                    <em>Balance - vehiculos</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>

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
