import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/default-user-2.png";

import { useState } from "react";
import BranchService from "services/branch/branch.service";
import { useEffect } from "react";
import BranchActions from "./branch-actions";

export default function BranchRow() {
  const [branches, setBranches] = useState();
  const [rows, setRows] = useState([]);

  const branchService = new BranchService();

  async function getAllBranches() {
    const branches2 = await branchService.getAll();
    setBranches(branches2);
  }

  const BranchAddress = ({ image, address }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={address} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {address}
        </MDTypography>
        {/* <MDTypography variant="caption">{email}</MDTypography> */}
      </MDBox>
    </MDBox>
  );

  useEffect(() => {
    getAllBranches();
  }, []);

  useEffect(() => {
    if (branches !== undefined) {
      console.log(branches);
      const rowsTemp = [];
      branches.content.forEach((branch) => {
        rowsTemp.push({
          id: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {branch.id}
            </MDTypography>
          ),
          address: <BranchAddress image={team2} address={branch.address} />,
          vehiculeday: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {branch.vehicule_day}
            </MDTypography>
          ),
          warehouseid: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {branch.warehouse_id}
            </MDTypography>
          ),
          action: <BranchActions branch={branch} />,
        });
      });
      setRows(rowsTemp);
    }
  }, [branches]);

  return {
    columns: [
      { Header: "Id", accessor: "id", align: "left" },
      { Header: "Direccion", accessor: "address", width: "45%", align: "left" },
      { Header: "Vehiculo", accessor: "vehiculeday", align: "left" },
      { Header: "No. Bodega", accessor: "warehouseid", align: "center" },
      { Header: "Actions", accessor: "action", align: "center" },
    ],

    rows: rows,
  };
}
