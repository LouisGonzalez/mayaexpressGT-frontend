import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";
import {
  useMaterialUIController,
} from "context";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import WorkerService from "services/worker/worker.service";
import MDSnackbar from "components/MDSnackbar";
import { useDataContextController } from "data-context/data-context";
import { setRefresh } from "data-context/data-context";

function EditWorker(props) {
  const { worker } = props;
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  const [nameChange, setNameChange] = useState(worker.name);
  const [lastNameChange, setLastNameChange] = useState(worker.lastName);
  const [usernameChange, setUsernameChange] = useState(worker.username);
  const [hoursChange, setHoursChange] = useState(worker.hoursPerDay);
  const workerService = new WorkerService();

  /* context */
  const [generalController, generalDispatch] = useDataContextController();
  const { refresh } = generalController;

  /* notifications */
  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);

  const editWorker = async () => {
    if (nameChange !== "" && lastNameChange !== "" && usernameChange !== "" && hoursChange !== "") {
      const update = await workerService.updateWorker(worker.id, {
        ...worker,
        name: nameChange,
        lastName: lastNameChange,
        username: usernameChange,
        hoursPerDay: hoursChange,
      });
      setRefresh(generalDispatch, !refresh);
      setGeneralMessage("Informacion actualizada con exito");
      toggleSnackbar()
      console.log(update);
      handleCloseConfigurator();
    } else {
      setGeneralMessage("Se tienen que llenar todos los campos");
      toggleSnackbar();
    }
  };

  const initialValues = {
    nameChange: worker.name,
    lastNameChange: worker.lastName,
    usernameChange: worker.username,
    hoursChange: worker.hoursPerDay,
  };

  const setInitialValues = () => {
    setNameChange(initialValues.nameChange);
    setLastNameChange(initialValues.lastNameChange);
    setUsernameChange(initialValues.usernameChange);
    setHoursChange(initialValues.hoursChange);
  };

  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    window.addEventListener("resize", handleDisabled);

    handleDisabled();

    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => {
    setInitialValues();
    props.handleEdit();
  };
  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator: props.openEdit }}>
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
          <MDTypography variant="h5">{worker.username}</MDTypography>
          <MDTypography variant="body2" color="text">
            Modifica la informacion del usuario
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
            value={nameChange}
            onChange={(e) => setNameChange(e.target.value)}
          />
        </MDBox>
        <MDBox mt={3} lineHeight={1}>
          <MDInput
            variant="outlined"
            size="small"
            fullWidth
            value={lastNameChange}
            onChange={(e) => setLastNameChange(e.target.value)}
          />
        </MDBox>
        <MDBox mt={3} lineHeight={1}>
          <MDInput
            variant="outlined"
            size="small"
            fullWidth
            value={usernameChange}
            onChange={(e) => setUsernameChange(e.target.value)}
          />
        </MDBox>
        <MDBox mt={3} lineHeight={1}>
          <MDInput
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            value={hoursChange}
            onChange={(e) => setHoursChange(e.target.value)}
          />
        </MDBox>
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
              onClick={editWorker}
            >
              Guardar cambios
            </MDButton>
          </MDBox>
          <MDBox>
            <MDButton
              variant="outlined"
              size="medium"
              color="error"
              onClick={handleCloseConfigurator}
              fullWidth
            >
              Cancelar
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default EditWorker;
