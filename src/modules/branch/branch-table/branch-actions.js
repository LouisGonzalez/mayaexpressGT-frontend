import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import MDButton from "components/MDButton";
import { useState } from "react";
import { Grid, Icon } from "@mui/material";
import EditBranch from "./edit-branch";
import DeleteBranch from "./delete-branch";
import NewSpentBranch from "./new-spent-branch";

export default function BranchActions({ branch }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSpent, setOpenSpent] = useState(false);

  const handleSpent = () => {
    setOpenSpent(!openSpent)
  }

  const handleEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleDelete = () => {
    setOpenDelete(!openDelete);
  };

  return (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      <EditBranch handleEdit={handleEdit} openEdit={openEdit} branch={branch} />
      <DeleteBranch handleDelete={handleDelete} openDelete={openDelete} branch={branch} />
      <NewSpentBranch handleOpen={handleSpent} open={openSpent} branch={branch}/>
      <MDBox display="flex" justifyContent="center">
        <MDBox>
          <MDButton
            variant="outlined"
            size="medium"
            color="black"
            onClick={handleSpent}
            fullWidth
          >
            <Icon>
              <span class="material-symbols-outlined">money_off</span>
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
