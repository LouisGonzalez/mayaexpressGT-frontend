import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/default-user-2.png";

import MDButton from "components/MDButton";
import { useState } from "react";
import EditWorker from "./edit-worker";
import { Grid, Icon } from "@mui/material";
import DeleteWorker from "./delete-worker";
import WorkerService from "services/worker/worker.service";
import { useEffect } from "react";
import WorkerActions from "./worker-actions";
import { useDataContextController } from "data-context/data-context";

export default function WorkerRow() {

  /* context */
  const [generalController, generalDispatch] = useDataContextController();
  const { refresh } = generalController;

  const [ workers, setWorkers ] = useState();
  const [ rows, setRows ] = useState([]);

  const workerService = new WorkerService();

  async function getAllUsers(){
    const users = await workerService.getAll();
    setWorkers(users);
  }

  const WorkerName = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Role = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );


  useEffect(() => {
    getAllUsers();
  }, [refresh])
  
  useEffect(() => {
    if(workers !== undefined){
      console.log(workers)
      const rowsTemp = [];
      workers.content.forEach((worker) => {
        const workerName = worker.name + " " + worker.lastName;
        const workerEmail = worker.name+"."+worker.lastName+"@org.com"
        rowsTemp.push({
          name: <WorkerName image={team2} name={workerName} email={workerEmail} />,
          role: <Role title={worker.role} description="Organization" />,
          username: (
            <MDBox ml={-1}>
              <MDBadge badgeContent={worker.username} color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          hoursperday: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {worker.hoursPerDay}
            </MDTypography>
          ),
          position: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {worker.position}
            </MDTypography>
          ),
          branchId: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {worker.warehouse === null ? 'SIN ASIGNAR' : "Sucursal No." + worker.warehouse.id}
            </MDTypography>
          ),
          action: <WorkerActions worker={worker} />,
        });
      })
      setRows(rowsTemp);

    }
  }, [workers])

  return {
    columns: [
      { Header: "Nombre", accessor: "name", width: "30%", align: "left" },
      { Header: "Rol", accessor: "role", align: "left" },
      { Header: "Horas por dia", accessor: "hoursperday", align: "center" },
      { Header: "Username", accessor: "username", align: "center" },
      { Header: "Posicion", accessor: "position", align: "center" },
      { Header: "No. Sucursal", accessor: "branchId", align: "center" },
      { Header: "Accion", accessor: "action", align: "center" },
    ],

    rows: rows,
  };
}
