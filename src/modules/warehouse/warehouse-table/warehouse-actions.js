import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/default-user-2.png";

import MDButton from "components/MDButton";
import { useState } from "react";
import { Grid, Icon } from "@mui/material";
import DeleteWarehouse from "./delete-warehouse";
import EditWarehouse from "./edit-warehouse";

export default function WarehouseActions({ warehouse }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleDelete = () => {
    setOpenDelete(!openDelete);
  };

  return (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      <EditWarehouse handleEdit={handleEdit} openEdit={openEdit} warehouse={warehouse} />
      <DeleteWarehouse handleDelete={handleDelete} openDelete={openDelete} warehouse={warehouse} />
      <MDBox display="flex" justifyContent="center">
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
