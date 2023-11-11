/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

function FormClient({sendData, destinations}) {
  const [clientSendingName, setClientSendingName] = useState(null);
  const [clientReceiveName, setClientReceiveName] = useState(null);
  const [address, setAddress] = useState(null);
  const [receiveBranch, setReceiveBranch] = useState(null);
  const [sendingBranch, setSendingBranch] = useState(null);
  const [sendDate, setSendDate] = useState(null);

  return (
    <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Información de Envio
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
                <Grid container spacing={3}>
                    {/* Cliente Envia */}
                    <Grid item xs={12} xl={6}>
                        <MDInput type="text" label="Envia" variant="standard" onChange={(e) => setClientSendingName(e.target.value)} fullWidth />
                    </Grid>

                    {/* Cliente Recibe */}
                    <Grid item xs={12} lg={6}>
                        <MDInput type="text" label="Recibe" variant="standard" onChange={(e) => setClientReceiveName(e.target.value)} fullWidth />
                    </Grid>
                </Grid>
            </MDBox>
            <MDBox mb={2}>
                <Grid container spacing={3}>
                    {/* Origen */}
                    <Grid item xs={12} xl={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={destinations}
                            onChange={(event, newValue) => setSendingBranch(newValue)}
                            renderInput={(params) => <TextField {...params} label="Origen" />}
                            />
                    </Grid>
                    {/* Destino */}
                    <Grid item xs={12} xl={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={destinations}
                            onChange={(event, newValue) => setReceiveBranch(newValue)}
                            renderInput={(params) => <TextField {...params} label="Destino" />}
                            />
                    </Grid>
                </Grid>
            </MDBox>
            <MDBox mb={2}>
                <Grid container spacing={3}>
                     {/* Fecha */}
                    <Grid item xs={12} xl={6}>
                      <MDInput type="datetime-local" label="Fecha" onChange={(e) => setSendDate(e.target.value)} fullWidth />
                    </Grid>

                    {/* Direccion */}
                    <Grid item xs={12} xl={6}>
                        <MDInput type="text" label="Dirección" onChange={(e) => setAddress(e.target.value)} fullWidth/>
                    </Grid>
                </Grid>
            </MDBox>
            
            <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              color="info"
              onClick={() => {
                sendData(sendingBranch, receiveBranch, clientSendingName, clientReceiveName, address, sendDate);
              }}
              fullWidth
            >
              Registrar
            </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
  );
}

export default FormClient;
