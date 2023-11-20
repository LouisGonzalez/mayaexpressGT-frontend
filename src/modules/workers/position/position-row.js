import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/default-user-2.png";

import { useState } from "react";
import { useEffect } from "react";
import PositionService from "services/positions/position.service";

export default function PositionRow() {
  const [rows, setRows] = useState([]);
  const [positions, setPositions] = useState();

  const positionService = new PositionService();

  const getPositions = async () => {
    const positions2 = await positionService.getAll();
    setPositions(positions2);
  }   

  const PositionName = ({ image, name }) => (
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
    getPositions()
  }, []);

  useEffect(() => {
    if (positions !== undefined) {
      console.log(positions);
      const rowsTemp = [];
      positions.forEach((position) => {
        rowsTemp.push({
          name: <PositionName image={team2} name={position.name} />,
          wage: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              ${position.wage.perHour}
            </MDTypography>
          ),
          description: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {position.description}
            </MDTypography>
          ),
        });
      });
      setRows(rowsTemp);
    }
  }, [positions]);

  return {
    columns: [
      { Header: "Nombre", accessor: "name", width: "45%", align: "left" },
      { Header: "Salario", accessor: "wage", align: "center" },
      { Header: "Descripcion", accessor: "description", align: "left" },
    ],

    rows: rows,
  };
}
