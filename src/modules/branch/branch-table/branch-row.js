import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/default-user-2.png";

import { useState } from "react";
import BranchService from "services/branch/branch.service";
import { useEffect } from "react";
import BranchActions from "./branch-actions";
import MDBadge from "components/MDBadge";

export default function BranchRow() {
  const [branches, setBranches] = useState();
  const [rows, setRows] = useState([]);

  const branchService = new BranchService();

  async function getAllBranches() {
    const branches2 = await branchService.getAll();
    console.log(branches2)
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

    const BranchDepartment = ({ department, region}) => (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {department}
          </MDTypography>
          <MDTypography variant="caption">{region}</MDTypography>
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
      branches.forEach((branch) => {
        rowsTemp.push({
          id: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Sucursal No. {branch.id}
            </MDTypography>
          ),
          address: <BranchAddress image={team2} address={branch.address} />,
          isEnable:
            branch.isEnable === true ? (
              <MDBox ml={-1}>
                <MDBadge badgeContent="enabled" color="success" variant="gradient" size="sm" />
              </MDBox>
            ) : (
              <MDBox ml={-1}>
                <MDBadge badgeContent="not enabled" color="error" variant="gradient" size="sm" />
              </MDBox>
            ),
          department: <BranchDepartment department={branch.department.name} region={branch.department.region} />,
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
      { Header: "Habilitada", accessor: "isEnable", align: "center" },
      { Header: "Departamento", accessor: "department", align: "center" },
      { Header: "Actions", accessor: "action", align: "center" },
    ],

    rows: rows,
  };
}
