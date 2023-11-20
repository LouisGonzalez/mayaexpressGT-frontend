import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";
import { useMaterialUIController } from "context";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BranchService from "services/branch/branch.service";
import WarehouseService from "services/warehouse/warehouse.service";
import MDSnackbar from "components/MDSnackbar";
import TripService from "services/trip/trip.service";
import { useDataContextController } from "data-context/data-context";
import { setRefresh } from "data-context/data-context";

function TripDeparture(props) {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  const warehouseService = new WarehouseService();
  const tripService = new TripService();

  const { trip, idWarehouse } = props;
  const [date, setDate] = useState();
  const [shipments, setShipments] = useState();
  const [shipmentText, setShipmentText] = useState("");

  /* context */
  const [generalController, generalDispatch] = useDataContextController();
  const { refresh } = generalController;

  const initialValues = {
    date: undefined,
  };

  const setInitialValues = () => {
    setDate(initialValues.date);
  };

  const getShipmentsByTrip = async () => {
    const shipments2 = await tripService.getShipmentsByTrip(trip.tripId);
    console.log(shipments2);
    showShipments(shipments2.shipments);
    setShipments(shipments2.shipments);
  };

  const showShipments = (shipments) => {
    let shipmentText2 = "";
    shipments.forEach((shipment) => {
      shipmentText2 += shipment + "\n";
    });
    setShipmentText(shipmentText2);
  };

  const goTripDeparture = async () => {
    if (date !== undefined && shipments !== undefined) {
      await warehouseService.tripDeparture({
        warehouseId: idWarehouse,
        tripId: trip.tripId,
        date: date,
        shipmentId: shipments,
      });
      setRefresh(generalDispatch, !refresh)
      setGeneralMessage("Viaje generado con exito");
      toggleSnackbar();
    } else {
      setGeneralMessage("Tiene que llenar todos los campos");
      toggleSnackbar();
    }
  };

  /* notifications */
  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);

  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    window.addEventListener("resize", handleDisabled);

    handleDisabled();

    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  useEffect(() => {
    if (props.open === true) {
      getShipmentsByTrip();
    }
  }, [props.open]);

  const handleCloseConfigurator = () => {
    setInitialValues();
    props.handleOpen();
  };

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator: props.open }}>
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
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Confirmacion del viaje</MDTypography>
          <MDTypography variant="body2" color="text">
            ...
          </MDTypography>
        </MDBox>
        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>
      <Divider />
      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDInput
            variant="outlined"
            size="small"
            fullWidth
            type="datetime-local"
            value={date !== undefined ? date : ""}
            onChange={(e) => setDate(e.target.value)}
          />
        </MDBox>
        {shipments !== undefined && (
          <MDBox mt={3}>
            <MDBox>
              <MDBox alignItems="left">Guias en viaje</MDBox>
            </MDBox>
            <MDInput
              variant="outlined"
              size="small"
              fullWidth
              type="text"
              multiline
              rows={shipments.length}
              value={shipmentText}
            />
          </MDBox>
        )}
      </MDBox>
      <Divider />
      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox display="flex" justifyContent="center">
          <MDBox sx={{ mx: 1 }}>
            <MDButton
              variant="outlined"
              size="medium"
              color="success"
              fullWidth
              onClick={goTripDeparture}
            >
              SI
            </MDButton>
          </MDBox>
          <MDBox>
            <MDButton
              variant="outlined"
              size="medium"
              color="error"
              fullWidth
              onClick={handleCloseConfigurator}
            >
              NO
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default TripDeparture;
