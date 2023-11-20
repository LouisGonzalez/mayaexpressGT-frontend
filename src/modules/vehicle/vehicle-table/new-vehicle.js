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
import VehicleService from "services/vehicle/vehicle.service";
import { useDataContextController } from "data-context/data-context";
import { setRefresh } from "data-context/data-context";

function NewVehicle(props) {
  /* general */
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  /* context */
  const [generalController, generalDispatch] = useDataContextController();
  const { refresh } = generalController;

  /* specific */
  const [plate, setPlate] = useState("");
  const [typeVehicle, setTypeVehicle] = useState("");
  const [branchSelected, setBranchSelected] = useState(0);
  const [branches, setBranches] = useState();
  const [maxWeight, setMaxWeight] = useState(0);

  /* services */
  const branchService = new BranchService();
  const warehouseService = new WarehouseService();
  const vehicleService = new VehicleService();

  /* notifications */
  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);

  const initialValues = {
    plate: "",
    typeVehicle: "",
    maxWeight: 0,
  };

  const setInitialValues = () => {
    setPlate(initialValues.plate);
    setTypeVehicle(initialValues.typeVehicle);
    setMaxWeight(initialValues.maxWeight);
  };

  const handleBranchSelected = (event) => {
    setBranchSelected(event.target.value);
  };

  const createVehicle = async () => {
    if (plate !== "" && typeVehicle !== "" && branchSelected !== 0 && maxWeight !== 0) {
      const creation = await vehicleService.create({
        plate: plate,
        vehicleType: typeVehicle,
        warehouseId: branchSelected,
        maxWeight: maxWeight,
      });
      setRefresh(generalDispatch, !refresh);
      setGeneralMessage("Vehiculo creado con exito");
      toggleSnackbar();
      handleCloseConfigurator();
    } else {
      setGeneralMessage("Tiene que llenar todos los campos");
      toggleSnackbar();
      handleCloseConfigurator();
    }
  };

  const getBranches = async () => {
    const branches2 = await branchService.getAll();
    setBranches(branches2);
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
    getBranches();
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
            Crea una nuevo vehiculo
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
            label="Placa"
            size="small"
            fullWidth
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
          />
        </MDBox>
        <MDBox mt={3}>
          <MDInput
            variant="outlined"
            label="Tipo de vehiculo"
            size="small"
            fullWidth
            value={typeVehicle}
            onChange={(e) => setTypeVehicle(e.target.value)}
          />
        </MDBox>

        <MDBox mt={3}>
          {branches !== undefined && (
            <FormControl
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              fullWidth
            >
              <InputLabel id="label-bodegas-activas">No. Sucursal</InputLabel>
              <Select
                labelId="label-bodegas-activas"
                id="select-sucursales-activas"
                label="Sucursales"
                value={branchSelected}
                onChange={(e) => handleBranchSelected(e)}
              >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                {branches.map((branch) => (
                  <MenuItem value={branch.id}>Sucursal No. {branch.id}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </MDBox>

        <MDBox mt={3} lineHeight={1}>
          <MDInput
            variant="outlined"
            label="Peso maximo"
            size="small"
            fullWidth
            type="number"
            value={maxWeight === 0 ? "" : maxWeight}
            onChange={(e) => setMaxWeight(e.target.value)}
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
              onClick={createVehicle}
              fullWidth
            >
              Crear vehiculo
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

export default NewVehicle;
