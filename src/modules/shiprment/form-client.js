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
import BranchService from "services/branch/branch.service";
import { useEffect } from "react";

function FormClient({sendData, destinations}) {
  const [clientSendingName, setClientSendingName] = useState(null);
  const [clientReceiveName, setClientReceiveName] = useState(null);
  const [address, setAddress] = useState(null);

  const [receiveBranch, setReceiveBranch] = useState(null);
  const [sendingBranch, setSendingBranch] = useState(null);
  
  const [sendDate, setSendDate] = useState(null);

  const [receiveBranches, setReceiveBranches] = useState([]);
  const [sendingBranches, setSendingBranches] = useState([]);

  const [startBranch, setStartBranch] = useState(0);
  const [endBranch, setEndBranch] = useState(0);

  const branchService = new BranchService();

  const getStartBranch = async () => {
    const branches2 = await branchService.branchesByDestination(sendingBranch.year);
    setSendingBranches(branches2);
  }
  
  const getEndBranch = async () => {
    const endBranch2 = await branchService.branchesByDestination(receiveBranch.year);
    setReceiveBranches(endBranch2);
  }

  useEffect(() => {
    if(sendingBranch !== null) getStartBranch();
    if(receiveBranch !== null) getEndBranch();
  }, [receiveBranch, sendingBranch])

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
                <MDInput
                  type="text"
                  label="Envia"
                  variant="standard"
                  onChange={(e) => setClientSendingName(e.target.value)}
                  fullWidth
                />
              </Grid>

              {/* Cliente Recibe */}
              <Grid item xs={12} lg={6}>
                <MDInput
                  type="text"
                  label="Recibe"
                  variant="standard"
                  onChange={(e) => setClientReceiveName(e.target.value)}
                  fullWidth
                />
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
                  id="combo-box-demo12"
                  options={destinations}
                  onChange={(event, newValue) => setReceiveBranch(newValue)}
                  renderInput={(params) => <TextField {...params} label="Destino" />}
                />
              </Grid>
            </Grid>
          </MDBox>

          <MDBox mb={2}>
            <Grid container spacing={3}>
              {/* Origen */}
              <Grid item xs={12} xl={6}>
                {sendingBranch !== null && (
                  <MDBox>
                    <FormControl
                      sx={{
                        m: 1,
                        "& .MuiInputBase-root": {
                          height: 40,
                        },
                      }}
                      fullWidth
                    >
                      <InputLabel id="label-sucursales-activas">Sucursales origen</InputLabel>
                      <Select
                        labelId="label-sucursales-activas"
                        id="select-sucursales-activas"
                        label="Sucursales"
                        value={startBranch}
                        onChange={(e) => setStartBranch(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {sendingBranches.map((branch) => (
                          <MenuItem value={branch.id}>Sucursal No. {branch.id}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>
                )}
              </Grid>
              {/* Destino */}
              <Grid item xs={12} xl={6}>
                {receiveBranch !== null && (
                <MDBox>
                  <FormControl
                    sx={{
                      m: 1,
                      "& .MuiInputBase-root": {
                        height: 40,
                      },
                    }}
                    fullWidth
                  >
                    <InputLabel id="label-sucursales-activas">Sucursales destino</InputLabel>
                    <Select
                      labelId="label-sucursales-activas"
                      id="select-sucursales-activas"
                      label="Sucursales"
                      value={endBranch}
                      onChange={(e) => setEndBranch(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {receiveBranches.map((branch) => (
                        <MenuItem value={branch.id}>Sucursal No. {branch.id}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MDBox>
                )}
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mb={2}>
            <Grid container spacing={3}>
              {/* Fecha */}
              <Grid item xs={12} xl={6}>
                <MDInput
                  type="datetime-local"
                  label="Fecha"
                  onChange={(e) => setSendDate(e.target.value)}
                  fullWidth
                />
              </Grid>

              {/* Direccion */}
              <Grid item xs={12} xl={6}>
                <MDInput
                  type="text"
                  label="Dirección"
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </MDBox>

          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              color="info"
              onClick={() => {
                sendData(
                  startBranch,
                  endBranch,
                  clientSendingName,
                  clientReceiveName,
                  address,
                  sendDate,
                  receiveBranch.year,
                  sendingBranch.year
                );
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
