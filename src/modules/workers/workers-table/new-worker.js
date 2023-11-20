import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";
import { useMaterialUIController } from "context";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import WorkerService from "services/worker/worker.service";
import MDSnackbar from "components/MDSnackbar";
import { setRefresh } from "data-context/data-context";
import { useDataContextController } from "data-context/data-context";

function CreateWorker(props) {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  const [nameChange, setNameChange] = useState("");
  const [lastNameChange, setLastNameChange] = useState("");
  const [usernameChange, setUsernameChange] = useState("");
  const [hoursChange, setHoursChange] = useState("");
  const [password, setPassword] = useState("");
  const workerService = new WorkerService();

  /* context */
  const [generalController, generalDispatch] = useDataContextController();
  const { refresh } = generalController;
  
  /* notifications */
  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);

  const initialValues = {
    nameChange: "",
    lastNameChange: "",
    usernameChange: "",
    hoursChange: "",
    password: ""
  };

  const setInitialValues = () => {
    setNameChange(initialValues.nameChange);
    setLastNameChange(initialValues.lastNameChange);
    setUsernameChange(initialValues.usernameChange);
    setHoursChange(initialValues.hoursChange);
    setPassword(initialValues.password);
  };

  const createWorker = async () => {
    if (nameChange !== "" && lastNameChange !== "" && usernameChange !== "" && hoursChange !== "") {
      await workerService.createWorker({
        name: nameChange,
        lastName: lastNameChange,
        username: usernameChange,
        hoursPerDay: hoursChange,
        password: password,
        role: "EMPLOYEE",
        isEnable: true
      });
      setRefresh(generalDispatch, !refresh);
      setGeneralMessage("Empleado creado con exito");
      toggleSnackbar();
      handleCloseConfigurator();
    } else {
      setGeneralMessage("Se tienen que llenar todos los campos");
      toggleSnackbar();
    }
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
          <MDTypography variant="body2" color="text">
            Crea un nuevo empleado
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
            label="nombres"
            size="small"
            fullWidth
            value={nameChange}
            onChange={(e) => setNameChange(e.target.value)}
          />
        </MDBox>
        <MDBox mt={3} lineHeight={1}>
          <MDInput
            variant="outlined"
            label="apellidos"
            size="small"
            fullWidth
            value={lastNameChange}
            onChange={(e) => setLastNameChange(e.target.value)}
          />
        </MDBox>
        <MDBox mt={3} lineHeight={1}>
          <MDInput
            variant="outlined"
            label="username"
            size="small"
            fullWidth
            value={usernameChange}
            onChange={(e) => setUsernameChange(e.target.value)}
          />
        </MDBox>
        <MDBox mt={3} lineHeight={1}>
          <MDInput
            variant="outlined"
            label={"Horas por dia"}
            size="small"
            fullWidth
            type="number"
            value={hoursChange}
            onChange={(e) => setHoursChange(e.target.value)}
          />
        </MDBox>
        <MDBox mt={3} lineHeight={1}>
          <MDInput
            variant="outlined"
            label={"password"}
            size="small"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              onClick={createWorker}
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

export default CreateWorker;
