import { Icon } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import RemovePackageWarehouse from "./remove-package-warehouse";
import MDBox from "components/MDBox";

function PackagesByWarehouseActions({pack, idWarehouse}) {
  const [openEditor, setOpenEditor] = useState(false);

  const handleEditor = () => {
    setOpenEditor(!openEditor);
  };


  return (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      {/* <EditBranch handleEdit={handleEdit} openEdit={openEdit} branch={branch} /> */}
      <RemovePackageWarehouse pack={pack} idWarehouse={idWarehouse} handleOpen={handleEditor} open={openEditor} />
      <MDBox display="flex" justifyContent="center">
        <MDBox>
          <MDButton variant="outlined" size="medium" color="error" onClick={handleEditor} fullWidth>
            <Icon>
              <span class="material-symbols-outlined">local_shipping</span>
            </Icon>
          </MDButton>
        </MDBox>
      </MDBox>
    </MDTypography>
  );    
}

export default PackagesByWarehouseActions;