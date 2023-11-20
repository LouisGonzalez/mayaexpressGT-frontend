/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

import mapasrutas from "assets/images/mapa-rutas.png";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import ReportService from "services/report/reports.service";
import { useState } from "react";
import { useEffect } from "react";
import MDAvatar from "components/MDAvatar";
import BranchService from "services/branch/branch.service";
import WarehouseService from "services/warehouse/warehouse.service";
import DestinationsService from "services/destinations/destinations.service";
import WorkerService from "services/worker/worker.service";
import VehicleService from "services/vehicle/vehicle.service";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  /* Destinations */
  const [reportDestinations, setReportDestinations] = useState();
  const [metricsX1, setMetricsX1] = useState([]);
  const [metricsY1, setMetricsY1] = useState([]);

  /* Regions */
  const [reportRegions, setReportRegions] = useState();
  const [metricsX2, setMetricsX2] = useState([]);
  const [metricsY2, setMetricsY2] = useState([]);

  /* Metadata */
  const [totalBranches, setTotalBranches] = useState(0);
  const [totalDestinations, setTotalDestinations] = useState(0);
  const [totalWarehouses, setTotalWarehouses] = useState(0);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);

  const [date1, setDate1] = useState("2000-01-01");
  const [date2, setDate2] = useState("2030-01-01");

  /* Services */
  const reportService = new ReportService();
  const branchService = new BranchService();
  const warehouseService = new WarehouseService();
  const destinationsService = new DestinationsService();
  const workerService = new WorkerService();
  const vehiclesService = new VehicleService();

  const handleMetric = (setMetric, value) => {
    setMetric(value);
  };  

  /************* METADATA ****************/

  const getBranches = async () => {
    const branches = await branchService.getAll();
    setTotalBranches(branches.length);
  }

  const getWarehouses = async () => {
    const warehouses = await warehouseService.getAll();
    setTotalWarehouses(warehouses.length)
  }

  const getDestinations = async () => {
    const destinations = await destinationsService.getAll();
    setTotalDestinations(destinations.length)
  }

  const getWorkers = async () => { 
    const workers = await workerService.getAll();
    setTotalWorkers(workers.content.length)
  }

  const getVehicles = async () => {
    const vehicles = await vehiclesService.getAll();
    setTotalVehicles(vehicles.length);
  }

  /******* DESTINATIONS REPORT **********/

  const getReportDestinations = async () => {
    const report2 = await reportService.getMostPopularDestinations({
      startDate: date1,
      endDate: date2,
    });
    cleanDataDestinations(report2);
    setReportDestinations(report2);
  };

  const reportChartDestinations = {
    labels: metricsX1,
    datasets: { label: "Sales", data: metricsY1 },
  };

  const cleanDataDestinations = (report) => {
    const labels = [];
    const values = [];
    report.forEach((reportRow) => {
      labels.push(reportRow.department);
      values.push(reportRow.shipments);
    });
    handleMetric(setMetricsX1, labels);
    handleMetric(setMetricsY1, values);
  };

  /******* REGIONS REPORT **********/

  const getReportRegions = async () => {
    const report2 = await reportService.getMovementsByRegion({
      startDate: date1,
      endDate: date2,
    });
    cleanDataRegions(report2);
    setReportRegions(report2);
  };

  const reportChartRegions = {
    labels: metricsX2,
    datasets: { label: "Sales", data: metricsY2 },
  };

  const cleanDataRegions = (report) => {
    const labels = [];
    const values = [];
    report.forEach((reportRow) => {
      labels.push(reportRow.region);
      values.push(reportRow.shipments);
    });
    handleMetric(setMetricsX2, labels);
    handleMetric(setMetricsY2, values);
  };

  useEffect(() => {
    getReportDestinations();
    getReportRegions();
  }, [date1, date2]);

  useEffect(() => {
    getBranches();
    getWorkers();
    getDestinations();
    getVehicles();
    getWarehouses();
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="storefront"
                title="Sucursales"
                count={totalBranches}
                percentage={{
                  color: "success",
                  amount: "TOTAL -",
                  label: "Numero de sucursales",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="local_shipping"
                title="Vehiculos"
                count={totalVehicles}
                percentage={{
                  color: "success",
                  amount: "TOTAL -",
                  label: "Numero de vehiculos",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Bodegas"
                count={totalWarehouses}
                percentage={{
                  color: "success",
                  amount: "TOTAL -",
                  label: "Numero de bodegas",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person"
                title="Empleados"
                count={totalWorkers}
                percentage={{
                  color: "success",
                  amount: "TOTAL -",
                  label: "Numero de empleados",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Departamentos mas populares"
                  description="Vista No. 1"
                  date="Actualizado recientemente"
                  chart={reportChartDestinations}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Regiones mas populares"
                  description="Vista No. 1"
                  date="Actualizado recientemente"
                  chart={reportChartRegions}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Departamentos mas populares"
                  description={<>Vista No. 2</>}
                  date="Actualizado recientemente"
                  chart={reportChartDestinations}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Regiones mas populares"
                  description={<>Vista No. 2</>}
                  date="Actualizado recientemente"
                  chart={reportChartRegions}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <img alt src={mapasrutas} />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
