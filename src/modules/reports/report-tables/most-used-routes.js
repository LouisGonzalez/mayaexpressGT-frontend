import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/default-user-2.png";

import { useState } from "react";
import BranchService from "services/branch/branch.service";
import { useEffect } from "react";

export default function MostUsedRoutes({ handleMetricsX, handleMetricsY}) {
  const [branches, setBranches] = useState();
  const [rows, setRows] = useState([]);


  const Destination = ({ image, destination }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={address} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {destination}
        </MDTypography>
        {/* <MDTypography variant="caption">{email}</MDTypography> */}
      </MDBox>
    </MDBox>
  );

  const RenderWarehouse = ({ branch }) => (
    <>
      {branch.warehouse !== null ? (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Bodega No. {branch.warehouse.id}
        </MDTypography>
      ) : (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          N/A
        </MDTypography>
      )}
    </>
  );

  useEffect(() => {
    if (branches !== undefined) {
      console.log(branches);
      const rowsTemp = [];
      //   branches.forEach((branch) => {
      //     rowsTemp.push({
      //       id: (
      //         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //           Sucursal No. {branch.id}
      //         </MDTypography>
      //       ),
      //       address: <Destination image={team2} destination={branch.address} />,
      //       vehicleday: (
      //         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //           {branch.vehicleDay}
      //         </MDTypography>
      //       ),
      //       warehouseid: (
      //         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //           <RenderWarehouse branch={branch} />
      //         </MDTypography>
      //       ),
      //       action: <BranchActions branch={branch} />,
      //     });
      //   });
      //   setRows(rowsTemp);
    }
  }, [branches]);

  return {
    columns: [
      { Header: "Value 1", accessor: "value1", align: "left" },
      { Header: "Rutas", accessor: "routes", width: "45%", align: "left" },
    ],

    rows: rows,
  };
}
