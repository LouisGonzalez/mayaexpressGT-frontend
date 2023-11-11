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
import BranchService from "services/branch/branch.service";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function CreateBranch(props) {
    /* general */
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  /* specific */
  const [addressChange, setAddressChange] = useState("");
  const [vehicleDay, setVehicle] = useState("");
  const [warehouseId, setWarehouseId] = useState("");

  /* services */
  const branchService = new BranchService();

  const createBranch = async () => {
    if (addressChange !== "" && vehicleDay !== "" && warehouseId !== "") {
      const update = await branchService.create({
        address: addressChange,
        vehicleDay: vehicleDay,
        warehouse: warehouseId
      });
      console.log(update);
      handleCloseConfigurator();
    } else {
      //PONER AQUI UN NOTIFICATION DE LA PLANTILLA
      console.log("Se tienen que llenar todos los campos");
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

  const handleCloseConfigurator = () => props.handleOpen();

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator: props.open }}>
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
            Crea una nueva sucursal
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
            label="Direccion"
            size="small"
            fullWidth
            onChange={(e) => setAddressChange(e.target.value)}
          />
        </MDBox>

        <MDBox mt={3}>
          <FormControl
            sx={{
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
            fullWidth
          >
            <InputLabel id="label-bodegas-activas">No. Bodega</InputLabel>
            <Select
              labelId="label-bodegas-activas"
              id="select-bodegas-activas"
              label="Bodegas"
              // value={branchSelected}
              // onChange={handleBranchSelect}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {/* {branches.content.map((branch) => (
                <MenuItem value={branch.id}>{branch.address}</MenuItem>
              ))} */}
            </Select>
          </FormControl>
        </MDBox>

        <MDBox mt={3} lineHeight={1}>
          <MDInput
            variant="outlined"
            label="Dia vehiculo"
            size="small"
            fullWidth
            onChange={(e) => setVehicle(e.target.value)}
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
              onClick={createBranch}
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

export default CreateBranch;
