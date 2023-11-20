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
import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select } from "@mui/material";
import WarehouseService from "services/warehouse/warehouse.service";
import MDSnackbar from "components/MDSnackbar";
import DestinationsService from "services/destinations/destinations.service";
import { useDataContextController } from "data-context/data-context";
import { setRefresh } from "data-context/data-context";

function CreateWarehouse(props) {
  /* general */
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  /* specific */
  const [addressChange, setAddressChange] = useState("");
  const [weightChange, setWeightChange] = useState("");
  const [metersChange, setMetersChange] = useState("");
  const [isBranch, setIsBranch] = useState(false);
  const [departments, setDepartments] = useState();
  const [departmentSelected, setDepartmentSelected] = useState();

  /* services */
  const warehouseService = new WarehouseService();
  const departmentService = new DestinationsService();

  /* context */
  const [generalController, generalDispatch] = useDataContextController();
  const { refresh } = generalController;

  /* notifications */
  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);

  const initialValues = {
    addressChange: "",
    weightChange: "",
    metersChange: "",
    isBranch: false,
  };

  const setInitialValues = () => {
    setAddressChange(initialValues.addressChange);
    setWeightChange(initialValues.weightChange);
    setMetersChange(initialValues.metersChange);
  };

  const getDepartments = async () => {
    const departments2 = await departmentService.getAll();
    setDepartments(departments2);
  };

  const handleDepartment = (event) => {
    setDepartmentSelected(event.target.value);
  };

  const createWarehouse = async () => {
    if (
      addressChange !== "" &&
      weightChange !== "" &&
      metersChange !== "" &&
      departmentSelected !== undefined
    ) {
      await warehouseService.create({
        squareMeters: metersChange,
        address: addressChange,
        maxWeightLbs: weightChange,
        isEnable: true,
        isBranch: isBranch,
        department: {
          id: departmentSelected,
        },
      });
      setRefresh(generalDispatch, !refresh)
      setGeneralMessage("Bodega creada con exito");
      toggleSnackbar();
      handleCloseConfigurator();
    } else {
      //PONER AQUI UN NOTIFICATION DE LA PLANTILLA
      setGeneralMessage("Se tienen que llenar todos los campos");
      toggleSnackbar();
    }
  };

  const handleIsBranch = () => {
    setIsBranch(!isBranch);
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
    getDepartments();
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
            Crea una nueva bodega
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
          <MDInput
            variant="outlined"
            label="Metros cuadrados"
            size="small"
            fullWidth
            value={metersChange}
            onChange={(e) => setMetersChange(e.target.value)}
          />
        </MDBox>
        <MDBox mt={3}>
          <MDInput
            variant="outlined"
            label="Peso maximo(Lbs)"
            size="small"
            fullWidth
            value={weightChange}
            onChange={(e) => setWeightChange(e.target.value)}
          />
        </MDBox>

        {departments !== undefined && (
          <MDBox mt={2}>
            <FormControl
              sx={{
                m: 1,
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              fullWidth
            >
              <InputLabel id="label-departments">Departamentos</InputLabel>
              <Select
                labelId="label-departments-activas"
                id="select-departments-activas"
                label="Departamentos"
                value={departmentSelected}
                onChange={handleDepartment}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {departments.map((department) => (
                  <MenuItem value={department.id}>{department.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </MDBox>
        )}

        <MDBox mt={2}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox value={isBranch} onChange={handleIsBranch} />}
              label="Crear sucursal?"
            />
          </FormGroup>
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
              onClick={createWarehouse}
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

export default CreateWarehouse;
