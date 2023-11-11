import { useState, useEffect, useRef } from "react";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";
import { useMaterialUIController } from "context";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import PriceService from "services/price/price.service";

function EditPrice({price, openEdit, handleEdit, setRefresh}) {
  const [controller, dispatch] = useMaterialUIController();
  const [disabled, setDisabled] = useState(false);
  const { darkMode } = controller;
  const [sendingCostChange, setSendingCostChange] = useState(price.sendingCost);
  const [costPerLbChange, setCostPerLbChange] = useState(price.costPerLb);
  const priceService = new PriceService();

  const editPrice = async () => {
    if (sendingCostChange !== "" && costPerLbChange !== "") {
       const update = await priceService.update(price.id, {
        ...price,
        sendingCost: sendingCostChange,
        costPerLb: costPerLbChange,
       });

      // Limpiar los campos después de la actualización
      price.sendingCost = update.sendingCost
      price.costPerLb = update.costPerLb
      handleCloseConfigurator();
      setRefresh(v => !v);
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

  const handleCloseConfigurator = () => handleEdit();

  const Departament = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left" mb={2}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator: openEdit }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Tarifario</MDTypography>
          <MDTypography variant="body2" color="text">
            Información de la tarifa
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
        <Departament title="Origen" description={price.origen.name} />
        <Departament title="Destino" description={price.destination.name} />
        <MDBox>
          <MDInput
            variant="outlined"
            label={price.sendingCost}
            size="small"
            fullWidth
            type="number"
            id="sendingCost"
            value={sendingCostChange}
            onChange={(e) => setSendingCostChange(e.target.value)}/>
        </MDBox>
        <MDBox mt={3} lineHeight={1}>
          <MDInput
            variant="outlined"
            label={price.costPerLb}
            size="small"
            fullWidth
            type="number"
            id="costPerLb"
            value={costPerLbChange}
            onChange={(e) => setCostPerLbChange(e.target.value)}/>
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
              onClick={editPrice}
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

export default EditPrice;
