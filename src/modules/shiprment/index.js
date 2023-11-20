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

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import { useState } from "react";
import FormClient from "./form-client";
import FormPackage from "./form-package";
import InfoCard from "./info-card";
import DestinationsService from "services/destinations/destinations.service";
import { useEffect } from "react";
import DataTable from "examples/Tables/DataTable";
import PriceService from "services/price/price.service";
import MDButton from "components/MDButton";
import { Checkbox, FormControlLabel, FormGroup, Icon } from "@mui/material";
import MDAlert from "components/MDAlert";
import { CheckBox } from "@mui/icons-material";
import MDSnackbar from "components/MDSnackbar";

function Shipment() {
  const information = {
    sendingBranch: { label: "", year: 0 },
    receiveBranch: { label: "", year: 0 },
    clientSendingName: "",
    clientReceiveName: "",
    address: "",
    sendDate: "",
    total: "",
  };
  const destinationServices = new DestinationsService();
  const shipmentService = new PriceService();

  const [destinations, setDestinations] = useState([]);
  const [shippingInformation, setShippingInformation] = useState(information);
  const [showFormPackage, setShowFormPackage] = useState(false);
  const [weight, setWeight] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState("");
  const tempDestinations = [];
  const [shipment, setShipment] = useState({});
  const [listPackage, setListPackage] = useState([]);
  const [alert, setAlert] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  /* notifications */
  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);

  const columns = [
    { Header: "Peso", accessor: "weightLbs", width: "15%" },
    { Header: "Subtotal", accessor: "subTotal", width: "15%" },
    { Header: "Descripción", accessor: "description" },
  ];

  const handleIsPaid = () => {
    setIsPaid(!isPaid);
  };

  async function getAllDestinations() {
    const destinations = await destinationServices.getAll();
    destinations.forEach((destination) => {
      tempDestinations.push({
        label: destination.name,
        year: destination.id,
      });
    });
    setDestinations(tempDestinations);
  }

  async function getShipment(idOrigin, idDestination) {
    const shipment = await shipmentService.getPrice(idOrigin, idDestination);
    setShipment(shipment);
    setSubtotal(shipment.sendingCost);
  }

  useEffect(() => {
    getAllDestinations();
  }, []);

  const formClient = (
    sendingBranch,
    receiveBranch,
    clientSendingName,
    clientReceiveName,
    address,
    sendDate,
    idDepartmentOrigin,
    idDepartmenDestiny
  ) => {
    if (
      sendingBranch !== null &&
      receiveBranch !== null &&
      clientReceiveName !== null &&
      clientSendingName !== null &&
      address !== null &&
      sendDate !== null
    ) {
      // Actualiza las propiedades de 'information'
      information.address = address;
      information.receiveBranch = receiveBranch;
      information.clientReceiveName = clientReceiveName;
      information.sendingBranch = sendingBranch;
      information.clientSendingName = clientSendingName;
      information.sendDate = sendDate;
      // Establece 'total' en 0
      setTotal(0);

      // Realiza la acción para obtener el envío
      getShipment(idDepartmentOrigin, idDepartmenDestiny);

      // Actualiza el estado 'setShippingInformation' con los nuevos datos en 'information'
      setShippingInformation({ ...information });

      // Muestra el formulario de paquetes
      setShowFormPackage(true);
    }
  };

  const formPackage = () => {
    const newPackage = {
      weightLbs: weight,
      subTotal: subtotal,
      description: description,
    };

    setTotal((parseFloat(total) + parseFloat(subtotal)).toFixed(2));

    // Actualiza la lista de paquetes utilizando el estado
    setListPackage([...listPackage, newPackage]);

    // Limpia los valores de entrada o realiza otras tareas según sea necesario
    setWeight(0);
    setSubtotal(0);
    setDescription("");
  };

  const formShipment = async () => {
    const newShipment = {
      branchId: shippingInformation.sendingBranch,
      ...shippingInformation,
      total: total,
      receiveBranchId: shippingInformation.receiveBranch,
      isPaid: isPaid,
      packages: listPackage,
    };
    const update = await shipmentService.sendShipping(newShipment);
    if (update.message) {
      if (update.message === "No se encontro ruta posible") {
        setGeneralMessage(update.message);
        toggleSnackbar()
      }
    }
    // Lógica luego de reenviar
    setAlert(true); // Muestra la alerta
    setTotal(0);
    setShippingInformation(information);
    setShowFormPackage(false);
    setListPackage([]);
  };

  return (
    <DashboardLayout>
      <MDSnackbar
        color="info"
        icon="notifications"
        title="Notificacion"
        content={generalMessage}
        dateTime="Recientemente"
        open={show}
        close={toggleSnackbar}
      />

      <DashboardNavbar />
      <MDBox>
        <MDBox mb={5}>
          {alert ? (
            <MDAlert color="success" dismissible onClose={() => setAlert(false)}>
              Envío Generado
            </MDAlert>
          ) : null}
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} xl={5}>
              <InfoCard shippingInformation={shippingInformation} total={total} />
              {showFormPackage ? (
                <>
                  <MDBox mt={2}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox value={isPaid} onChange={handleIsPaid} />}
                        label="Pago inmediato?"
                      />
                    </FormGroup>
                  </MDBox>
                  <MDBox mt={2}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      onClick={() => formShipment()}
                      fullWidth
                    >
                      <Icon>send</Icon>&nbsp; Enviar
                    </MDButton>
                  </MDBox>
                </>
              ) : null}
            </Grid>

            {/* Primer Formulario */}
            <Grid item xs={12} lg={7}>
              {!showFormPackage ? (
                <FormClient sendData={formClient} destinations={destinations} />
              ) : (
                <FormPackage
                  sendData={formPackage}
                  shipment={shipment}
                  setSubtotal={setSubtotal}
                  setDescription={setDescription}
                  subtotal={subtotal}
                  setWeight={setWeight}
                  description={description}
                  weight={weight}
                />
              )}
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DataTable
                table={{
                  columns: columns,
                  rows: listPackage,
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Shipment;
