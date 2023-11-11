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
import WarehouseService from "services/warehouse/warehouse.service";

function RemovePackageWarehouse(props) {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);

  const warehouseService = new WarehouseService();
  const { pack, idWarehouse} = props;
  
  const removePackage = async () => {
    const del = await warehouseService.removePackage(pack.idPackage, idWarehouse);
    //poner aqui un efecto de notificacion
    console.log(del);
    handleCloseConfigurator();
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
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator: props.open}}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">¿Desea continuar?</MDTypography>
          <MDTypography variant="body2" color="text">
            ...
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
        <MDBox display="flex" justifyContent="center">
          <MDBox sx={{ mx: 1 }}>
            <MDButton
              variant="outlined"
              size="medium"
              color="success"
              fullWidth
              onClick={removePackage}
            >
              SI
            </MDButton>
          </MDBox>
          <MDBox>
            <MDButton
              variant="outlined"
              size="medium"
              color="error"
              fullWidth
              onClick={handleCloseConfigurator}
            >
              NO
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default RemovePackageWarehouse;
