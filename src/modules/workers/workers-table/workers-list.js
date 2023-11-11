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

// Data
import WorkerRow from "modules/workers/workers-table/worker-row";
import MDButton from "components/MDButton";
import { useState } from "react";
import CreateWorker from "./new-worker";

export function WorkersList() {
  const { columns, rows } = WorkerRow();
  const [ openNewWorker, setOpenNewWorker ] = useState(false);

  const handleOpenNewWorker = () => {
    setOpenNewWorker(!openNewWorker);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox borderRadius="lg" opacity={1} p={2}>
        <MDButton onClick={handleOpenNewWorker}>Nuevo empleado</MDButton>
      </MDBox>
      <CreateWorker open={openNewWorker} handleOpen={handleOpenNewWorker} />
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
                  Listado de empleados
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
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
      <Footer />
    </DashboardLayout>
  );
}