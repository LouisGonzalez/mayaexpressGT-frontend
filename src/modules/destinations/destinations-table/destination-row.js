import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/default-user-2.png";
import guatemala from "assets/images/guatemala.png";

// Data
import DestinationsService from "services/destinations/destinations.service"

import { useState } from "react";
import { useEffect } from "react";

export default function DestinationRow() {
  const [destinations, setDestinations] = useState();
  const [rows, setRows] = useState([]);
  const destinationsService = new DestinationsService();

  async function getAllDestinations() {
    const destinations = await destinationsService.getAll();
    setDestinations(destinations);
  }

  const DestinationName = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Region = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  useEffect(() => {
    getAllDestinations();
  }, []);

  useEffect(() => {
    if (destinations !== undefined) {
      console.log(destinations);
      const rowsTemp = [];
      destinations.content.forEach((destination) => {
        rowsTemp.push({
          name: <DestinationName image={guatemala} name={destination.name} />,
          region: <Region title={destination.region} description="Organization" />,
        });
      });
      setRows(rowsTemp);
    }
  }, [destinations]);

  return {
    columns: [
      { Header: "Nombre", accessor: "name", width: "45%", align: "left" },
      { Header: "Region", accessor: "region", align: "left" },
    ],
    rows: rows,
  };
}
