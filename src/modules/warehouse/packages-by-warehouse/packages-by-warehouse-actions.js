import { Icon } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import TripDeparture from "./trip-departure";
import { useState } from "react";
import TripEntrance from "./trip-entrance";

function PackagesByWarehouseActions({trip, idWarehouse}) {
  const [openDeparture, setOpenDeparture] = useState(false);
  const [openEntrance, setOpenEntrance] = useState(false);

  const handleOpenDeparture = () => {
    setOpenDeparture(!openDeparture);
  }

  const handleOpenEntrance = () => {
    setOpenEntrance(!openEntrance);
  }

  return (
    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      <TripDeparture open={openDeparture} handleOpen={handleOpenDeparture} trip={trip} idWarehouse={idWarehouse}/>
      <TripEntrance open={openEntrance} handleOpen={handleOpenEntrance} trip={trip} idWarehouse={idWarehouse}/>
      {trip.isDeparture === true ? (
        <MDBox display="flex" justifyContent="center">
          <MDBox>
            <MDButton variant="outlined" size="medium" color="success" fullWidth onClick={handleOpenDeparture}>
              <Icon>
                <span class="material-symbols-outlined">swipe_up</span>
              </Icon>
            </MDButton>
          </MDBox>
        </MDBox>
      ) : (
        <MDBox display="flex" justifyContent="center">
          <MDBox>
            <MDButton variant="outlined" size="medium" color="info" fullWidth onClick={handleOpenEntrance}>
              <Icon>
                <span class="material-symbols-outlined">swipe_down</span>
              </Icon>
            </MDButton>
          </MDBox>
        </MDBox>
      )}
    </MDTypography>
  );    
}

export default PackagesByWarehouseActions;