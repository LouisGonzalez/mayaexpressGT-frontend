import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/default-user-2.png";

import { useState } from "react";
import { useEffect } from "react";
import CostService from "services/costs/cost.service";

export default function CostRow() {
  const [rows, setRows] = useState([]);
  const [costs, setCosts] = useState();

  const costService = new CostService();

  const getCosts = async () => {
    const costs2 = await costService.getAll();
    console.log(costs2)
    setCosts(costs2);
  };

  const CostName = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  useEffect(() => {
    getCosts();
  }, []);

  useEffect(() => {
    if (costs !== undefined) {
      console.log(costs);
      const rowsTemp = [];
      costs.content.forEach((cost) => {
        rowsTemp.push({
          name: <CostName image={team2} name={cost.name} />,
          description: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {cost.description}
            </MDTypography>
          ),
          isPermanent: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {cost.isPermanent === true ? "SI" : "NO"}
            </MDTypography>
          ),
        });
      });
      setRows(rowsTemp);
    }
  }, [costs]);

  return {
    columns: [
      { Header: "Nombre", accessor: "name", width: "30%", align: "left" },
      { Header: "Descripcion", accessor: "description", align: "left" },
      { Header: "Es gasto fijo", accessor: "isPermanent", align: "left" },
    ],

    rows: rows,
  };
}
