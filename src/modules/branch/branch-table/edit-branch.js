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

function EditBranch(props) {
  const { branch } = props;
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  const branchService = new BranchService();

  const editBranch = async () => {
    // if (nameChange !== "" && lastNameChange !== "" && usernameChange !== "" && hoursChange !== "") {
    //   const update = await workerService.updateWorker(worker.id, {
    //     ...worker,
    //     name: nameChange,
    //     lastName: lastNameChange,
    //     username: usernameChange,
    //     hoursPerDay: hoursChange,
    //   });
    //   console.log(update);
      handleCloseConfigurator();
    // } else {
    //   //PONER AQUI UN NOTIFICATION DE LA PLANTILLA
    //   console.log("Se tienen que llenar todos los campos");
    // }
  };

  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    window.addEventListener("resize", handleDisabled);

    handleDisabled();

    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => props.handleEdit();

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator: props.openEdit }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">asdfasfsda</MDTypography>
          <MDTypography variant="body2" color="text">
            Modifica la informacion de la sucursal
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
            // label={worker.name}
            size="small"
            fullWidth
            onChange={(e) => setNameChange(e.target.value)}
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
              onClick={editBranch}
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

export default EditBranch;
