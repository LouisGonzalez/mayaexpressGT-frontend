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
import MDSnackbar from "components/MDSnackbar";

const initialState = {
  date: "",
  description: "",
  spentSelected: ""
}

function NewSpentBranch(props) {
  /* general */
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  /* specific */
  const [spents, setSpents] = useState();
  const [spentSelected, setSpentSelected] = useState("");
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const { branch } = props;

  /* notifications */
  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);


  /* services */
  const branchService = new BranchService();

  const newSpentOnBranch = async () => {
    if(description !== "" && date !== "" && spentSelected !== "" ){
      const createSpent = await branchService.createSpent({
        warehouse: {
          id: branch.id,
        },
        date: date,
        description: description,
        costType: {
          id: spentSelected,
        },
      });
      //PONER AQUI UN NOTIFICATION DE LA PLANTILLA
      console.log(`Nuevo gasto agregado con exito a la sucursal no.`);
      setGeneralMessage(`Nuevo gasto agregado con exito a la sucursal no. ${branch.id}`);
      toggleSnackbar();
      restartValues();
    } else {
      setGeneralMessage("Se tienen que llenar todos los campos");
      toggleSnackbar();
    }
  }

  const getSpentTypes = async () => {
    const spents2 = await branchService.getSpentTypes();
    setSpents(spents2);
  }

  const handleSpentSelected = async (event) => {
    setSpentSelected(event.target.value)
  }

  useEffect(() => {
    getSpentTypes()
  }, [])

  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    window.addEventListener("resize", handleDisabled);

    handleDisabled();

    return () => window.removeEventListener("resize", handleDisabled);
  }, []);


  const restartValues = () => {
    setDate(initialState.date);
    setDescription(initialState.description);
    setSpentSelected(initialState.spentSelected);
  }

  const handleCloseConfigurator = () => {
    restartValues();
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
            Ingreso de un nuevo gasto
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
            label="Fecha"
            size="small"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
        </MDBox>
        {spents !== undefined && (
          <MDBox mt={1}>
            <FormControl
              sx={{
                m: 1,
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              fullWidth
            >
              <InputLabel id="label-gastos">Tipos de gasto</InputLabel>
              <Select
                id="select-label-gastos"
                label="Tipos de gasto"
                value={spentSelected}
                onChange={handleSpentSelected}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {spents.content.map((spent) => (
                  <MenuItem value={spent.id}>{spent.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </MDBox>
        )}

        <MDBox mt={1} lineHeight={1}>
          <MDInput
            variant="outlined"
            label="Descripcion"
            size="small"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              onClick={newSpentOnBranch}
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

export default NewSpentBranch;
