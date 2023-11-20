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
import WarehouseService from "services/warehouse/warehouse.service";
import MDSnackbar from "components/MDSnackbar";

function CreateBranch(props) {
  /* general */
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  /* specific */
  const [addressChange, setAddressChange] = useState("");
  const [vehicleDay, setVehicle] = useState("");
  const [warehouses, setWarehouses] = useState();
  const [warehouseSelected, setWarehouseSelected] = useState();

  /* services */
  const branchService = new BranchService();
  const warehouseService = new WarehouseService();

  /* notifications */
  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);

  const createBranch = async () => {
    if (addressChange !== "" && vehicleDay !== "" && warehouseSelected !== undefined) {
      await branchService.create({
        address: addressChange,
        vehicleDay: vehicleDay,
        warehouse: warehouseSelected,
      });
      setGeneralMessage("Sucursal creada un exito");
      toggleSnackbar();
      handleCloseConfigurator();
    } else {
      setGeneralMessage("Se tienen que llenar todos los campos");
      toggleSnackbar();
    }
  };

  const initialValues = {
    addressChange: "",
    vehicleDay: "",
    warehouseId: ""
  }

  const setInitialValues = () => {
    setAddressChange(initialValues.addressChange);
    setVehicle(initialValues.vehicleDay);
    setWarehouseSelected(initialValues.warehouseId)
  }

  const getWarehouses = async () => {
    const warehouses2 = await warehouseService.getAll();
    setWarehouses(warehouses2);
  };

  const handleWarehouseSelected = (event) => {
    setWarehouseSelected(event.target.value);
  };

  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    window.addEventListener("resize", handleDisabled);

    handleDisabled();

    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  useEffect(() => {
    getWarehouses();
  }, []);

  const handleCloseConfigurator = () =>{
    setInitialValues();
    props.handleOpen();
  } 
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
            value={addressChange}
            onChange={(e) => setAddressChange(e.target.value)}
          />
        </MDBox>

        <MDBox mt={3}>
          {warehouses !== undefined && (
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
                value={warehouseSelected}
                onChange={handleWarehouseSelected}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {warehouses.content.map((warehouse) => (
                  <MenuItem value={warehouse.id}>Bodega No. {warehouse.id}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </MDBox>

        <MDBox mt={3} lineHeight={1}>
          <MDInput
            variant="outlined"
            label="Dia vehiculo"
            size="small"
            fullWidth
            value={vehicleDay}
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
