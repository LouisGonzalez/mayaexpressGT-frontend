import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";
import { useMaterialUIController } from "context";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import VehicleService from "services/vehicle/vehicle.service";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import BranchService from "services/branch/branch.service";
import { SelectChangeEvent } from '@mui/material/Select';
import MDSnackbar from "components/MDSnackbar";
function VehicleToBranch(props) {
  /* general */
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  /* specific */
  const { vehicle } = props;
  const [branches, setBranches] = useState();
  const [branchSelected, setBranchSelected] = useState('');

  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);

  /* services */
  const vehicleService = new VehicleService();
  const branchService = new BranchService();

  const initialState = {
    branchSelected: ''
  }

  const getBranchList = async () => {
    const branches2 = await branchService.getAll();
    setBranches(branches2);
  }

  const addVehicleToBranch = async () => {
    if (branchSelected !== "") {
      const update = await vehicleService.vehicleToBranch({
        vehicleId: vehicle.id,
        branchId: branchSelected
      });
      console.log(update)
      setGeneralMessage(update.message);
      toggleSnackbar();
      handleCloseConfigurator();
    } else {
      setGeneralMessage("Se tiene que elegir una sucursal");
      toggleSnackbar();
    }
  };

  const handleBranchSelect = (event) => {
    console.log(event.target.value)
    setBranchSelected(event.target.value)
  }

  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    window.addEventListener("resize", handleDisabled);

    handleDisabled();

    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  useEffect(() => {
    getBranchList();
  }, [])

  const handleCloseConfigurator = () => {
    setBranchSelected(initialState.branchSelected)
    props.handleEdit();
  }
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
          <MDTypography variant="body2" color="text">
            Asigna el vehiculo con id {vehicle.id}
            <br />a una sucursal
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
        {branches !== undefined && (
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
              <InputLabel id="label-sucursales-activas">Sucursales</InputLabel>
              <Select
                labelId="label-sucursales-activas"
                id="select-sucursales-activas"
                label="Sucursales"
                value={branchSelected}
                onChange={handleBranchSelect}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {branches.content.map((branch) => (
                  <MenuItem value={branch.id}>{branch.address}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
              onClick={addVehicleToBranch}
            >
              Asignar
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

export default VehicleToBranch;
