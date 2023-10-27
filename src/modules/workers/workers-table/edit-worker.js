import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";
import {
  useMaterialUIController,
} from "context";
import MDInput from "components/MDInput";

function EditWorker(props) {
  const [controller, dispatch] = useMaterialUIController();
  const {
    darkMode,
  } = controller;
  const [disabled, setDisabled] = useState(false);

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  // const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
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
          <MDTypography variant="h5">Edit worker</MDTypography>
          <MDTypography variant="body2" color="text">
            Aqui ira el nombre del empleado
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
          <MDInput variant="outlined" label="Type here..." size="small" fullWidth></MDInput>
        </MDBox>

        <MDBox mt={3} lineHeight={1}>
          <MDInput variant="outlined" label="Type here..." size="small" fullWidth></MDInput>
        </MDBox>

        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}
        >
          <MDInput variant="outlined" label="Type here..." size="small"></MDInput>
        </MDBox>
        <Divider />
        <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <MDInput variant="outlined" label="Type hedsafdasre..." size="small"></MDInput>
        </MDBox>
        <Divider />
        <MDBox mt={3} mb={2}></MDBox>
        <MDBox display="flex" justifyContent="center">
          <MDInput variant="outlined" label="Type here..." size="small"></MDInput>
        </MDBox>
        <MDBox mt={2} textAlign="center">
          <MDBox display="flex" justifyContent="center">
            <MDInput variant="outlined" label="Type here..." size="small"></MDInput>
          </MDBox>
        </MDBox>
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default EditWorker;
