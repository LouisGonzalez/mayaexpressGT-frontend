import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useState } from "react";
import { Grid, Icon } from "@mui/material";
import EditPrice from "./edit-price";

export default function PriceActions({ price, setRefresh}) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleEdit = () => {
    setOpenEdit(!openEdit);
  };

  return (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      <EditPrice handleEdit={handleEdit} openEdit={openEdit} price={price} setRefresh={setRefresh}/>
      <MDBox display="flex" justifyContent="center">
        <MDBox sx={{ mx: 1 }}>
          <MDButton variant="outlined" size="medium" color="black" onClick={handleEdit} fullWidth>
            <Icon>edit</Icon>
          </MDButton>
        </MDBox>
      </MDBox>
    </MDTypography>
  );
}
