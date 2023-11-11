
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import MDButton from "components/MDButton";
import { useState } from "react";
import { Grid, Icon } from "@mui/material";
import EditVehicule from "./edit-vehicle";
import DeleteVehicule from "./delete-vehicle";
import EditVehicle from "./edit-vehicle";
import DeleteVehicle from "./delete-vehicle";
import VehicleToBranch from "./vehicle-to-branch";

export default function VehicleActions({ vehicle }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openOp1, setOpenOp1] = useState(false);

  const handleEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleDelete = () => {
    setOpenDelete(!openDelete);
  };

  const handleVehicleBranch = () => {
    setOpenOp1(!openOp1);
  }

  return (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      <EditVehicle handleEdit={handleEdit} openEdit={openEdit} vehicle={vehicle} />
      <DeleteVehicle handleDelete={handleDelete} openDelete={openDelete} vehicle={vehicle} />
      <VehicleToBranch handleEdit={handleVehicleBranch} openEdit={openOp1} vehicle={vehicle} />
      <MDBox display="flex" justifyContent="center">
        <MDBox>
          <MDButton
            variant="outlined"
            size="medium"
            color="success"
            onClick={handleVehicleBranch}
            fullWidth
          >
            <Icon>
              <span class="material-symbols-outlined">add</span>
            </Icon>
          </MDButton>
        </MDBox>
        <MDBox sx={{ mx: 1 }}>
          <MDButton variant="outlined" size="medium" color="black" onClick={handleEdit} fullWidth>
            <Icon>edit</Icon>
          </MDButton>
        </MDBox>
        <MDBox>
          <MDButton variant="outlined" size="medium" color="error" onClick={handleDelete} fullWidth>
            <Icon>delete</Icon>
          </MDButton>
        </MDBox>
      </MDBox>
    </MDTypography>
  );
}
