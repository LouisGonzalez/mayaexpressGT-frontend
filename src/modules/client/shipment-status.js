import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState } from "react";
import ClientService from "services/client/client.service";
import MDSnackbar from "components/MDSnackbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMaterialUIController } from "context";

export default function ShipmentStatus() {

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;    

  /* notifications */
  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);

  const [shipmentStatus, setShipmentStatus] = useState({});
  const { shipmentId } = useParams();
  const clientService = new ClientService();

  const getStatusShipment = async () => {
    const shipmentStatus2 = await clientService.getShipmentStatus(shipmentId);
    setShipmentStatus(shipmentStatus2);
    console.log(shipmentStatus2);
  }

  useEffect(() => {
    getStatusShipment();
  }, [])

  return (
    <PageLayout>
      <MDSnackbar
        color="info"
        icon="notifications"
        title="Notificacion"
        content={generalMessage}
        dateTime="Recientemente"
        open={show}
        close={toggleSnackbar}
      />
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
            <MDTypography variant="h4" fontWeight="medium" textTransform="capitalize">
              Ubicacion de la guia No. {shipmentId}
            </MDTypography>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                  ESTADO ACTUAL
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
          {shipmentStatus.warehouse !== undefined && (
            <>
              <MDBox mb={1} lineHeight={0}>
                <MDTypography variant="caption" color="text">
                  Departamento actual:&nbsp;&nbsp;&nbsp;
                  <MDTypography variant="caption" fontWeight="medium">
                    {shipmentStatus.warehouse.department.name}
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mb={1} lineHeight={0}>
                <MDTypography variant="caption" color="text">
                  Region:&nbsp;&nbsp;&nbsp;
                  <MDTypography variant="caption" fontWeight="medium">
                    {shipmentStatus.warehouse.department.region}
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mb={1} lineHeight={0}>
                <MDTypography variant="caption" color="text">
                  No. Bodega:&nbsp;&nbsp;&nbsp;
                  <MDTypography variant="caption" fontWeight="medium">
                    {shipmentStatus.warehouse.id}
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mb={1} lineHeight={0}>
                <MDTypography variant="caption" color="text">
                  Direccion:&nbsp;&nbsp;&nbsp;
                  <MDTypography variant="caption" fontWeight="medium">
                    {shipmentStatus.warehouse.address}
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mb={1} lineHeight={0}>
                <MDTypography variant="caption" color="text">
                  Estado pago:&nbsp;&nbsp;&nbsp;
                  <MDTypography variant="caption" fontWeight="medium">
                    {shipmentStatus.isPaid === true ? "CANCELADO" : "PAGO PENDIENTE"}
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mb={1} lineHeight={0}>
                <MDTypography variant="caption" color="text">
                  Total:&nbsp;&nbsp;&nbsp;
                  <MDTypography variant="caption" fontWeight="medium">
                    $.{shipmentStatus.total}.00
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mb={1} lineHeight={0}>
                <MDTypography variant="caption" color="text">
                  Fecha de actualizacion:&nbsp;&nbsp;&nbsp;
                  <MDTypography variant="caption" fontWeight="medium">
                    {shipmentStatus.date}
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mb={1} lineHeight={0}>
                <MDTypography variant="caption" color="text">
                  Status:&nbsp;&nbsp;&nbsp;
                  <MDTypography variant="caption" fontWeight="medium">
                    {shipmentStatus.status}
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </>
          )}
        </MDBox>
      </MDBox>
      {shipmentStatus.trips !== undefined && (
        <MDBox>
          {shipmentStatus.trips.map((trip) => (
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
              <MDBox mb={1} lineHeight={0}>
                <MDBox mb={1} lineHeight={0}>
                  <MDTypography variant="caption" color="text">
                    No. Viaje:&nbsp;&nbsp;&nbsp;
                    <MDTypography variant="caption" fontWeight="medium">
                      {trip.id}
                    </MDTypography>
                  </MDTypography>
                </MDBox>
                <MDBox mb={1} lineHeight={0}>
                  <MDTypography variant="caption" color="text">
                    No. Ruta:&nbsp;&nbsp;&nbsp;
                    <MDTypography variant="caption" fontWeight="medium">
                      {trip.route.id}
                    </MDTypography>
                  </MDTypography>
                </MDBox>
                <MDBox mb={1} lineHeight={0}>
                  <MDTypography variant="caption" color="text">
                    Bodega de origen:&nbsp;&nbsp;&nbsp;
                    <MDTypography variant="caption" fontWeight="medium">
                      {trip.route.homeWarehouse.id} - {trip.route.homeWarehouse.department.name}
                    </MDTypography>
                  </MDTypography>
                </MDBox>
                <MDBox mb={1} lineHeight={0}>
                  <MDTypography variant="caption" color="text">
                    Bodega de destino:&nbsp;&nbsp;&nbsp;
                    <MDTypography variant="caption" fontWeight="medium">
                      {trip.route.awayWarehouse.id} - {trip.route.awayWarehouse.department.name}
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          ))}
        </MDBox>
      )}

      <Footer />
    </PageLayout>
  );
}
