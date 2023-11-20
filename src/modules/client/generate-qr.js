import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState } from "react";
import ClientService from "services/client/client.service";
import MDSnackbar from "components/MDSnackbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { useMaterialUIController } from "context";

export default function GenerateQr({
    onLogin
}) {

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;    


  const [shipmentNumber, setShipmentNumber] = useState();
  const [qrCode, setQrCode] = useState("");
  const clientService = new ClientService();

  /* notifications */
  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);

  const getQr = async () => {
    console.log(shipmentNumber,   ' el number')
    if (shipmentNumber !== undefined && shipmentNumber !== 0 && shipmentNumber !== "") {
      const qrImage = await clientService.getQr(shipmentNumber);
      if(qrImage !== undefined) {
        setQrCode(qrImage);
      } else {
        setQrCode("");
        setGeneralMessage("El numero de guia ingresado no existe");
        toggleSnackbar();
      }
    } else {
        setQrCode("");
        setGeneralMessage("Debe llenar el campo solicitado con un numero de guia");
        toggleSnackbar();
    }
  };

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
            <MDTypography variant="h3">Generar codigo QR</MDTypography>
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" color="text">
                <MDTypography variant="h4" fontWeight="medium" textTransform="capitalize">
                  Ingrese numero de guia&nbsp;&nbsp;&nbsp;
                  <MDInput
                    variant="outlined"
                    size="small"
                    type="number"
                    value={shipmentNumber !== undefined ? shipmentNumber : 0}
                    onChange={(e) => setShipmentNumber(e.target.value)}
                  />
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox mt={3}>
            <MDBox borderRadius="lg" >
              <MDButton color="info" onClick={getQr}>
                Generar codigo QR
              </MDButton>
            </MDBox>
          </MDBox>
          <MDBox mt={2}>
            {qrCode !== "" && <img alt src={`data:image/png;base64,${qrCode}`} />}
          </MDBox>
        </MDBox>
      </MDBox>
      <Footer />
    </PageLayout>
  );
}
