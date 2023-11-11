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

function DeleteBranch(props) {
  const { branch } = props;
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const [disabled, setDisabled] = useState(false);
  const branchService = new BranchService();

  const deleteBranch = async () => {
    const del = await branchService.del(branch.id);
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

  const handleCloseConfigurator = () => props.handleDelete();

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator: props.openDelete }}>
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
              onClick={deleteBranch}
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

export default DeleteBranch;
