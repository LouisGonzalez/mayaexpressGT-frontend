import { Icon } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import MDBox from "components/MDBox";
import ReceivePackage from "./receive-package";

function PackagesInDestinationActions({ trip, idWarehouse }) {
  const [openReceive, setOpenReceive] = useState(false);

  const handleReceive = () => {
    setOpenReceive(!openReceive);
  };

  return (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      <ReceivePackage handleOpen={handleReceive} open={openReceive} trip={trip} idWarehouse={idWarehouse} />
      <MDBox display="flex" justifyContent="center">
        <MDBox>
          <MDButton variant="outlined" size="medium" color="error" onClick={handleReceive} fullWidth>
            <Icon>
              <span class="material-symbols-outlined">done</span>
            </Icon>
          </MDButton>
        </MDBox>
      </MDBox>
    </MDTypography>
  );
}

export default PackagesInDestinationActions;
