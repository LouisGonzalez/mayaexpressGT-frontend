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

function FormPackage({sendData, shipment, setSubtotal, setDescription, subtotal, setWeight, weight, description}) {
  
  const priceSubTotal = (inputValue) => {
    if (!isNaN(inputValue) && inputValue > 0) {
      // Realiza la operación y redondea a 2 decimales
      const result = (inputValue * shipment.costPerLb + shipment.sendingCost).toFixed(2);
      setWeight(inputValue);
      setSubtotal(result);
    } else {
      // En caso de que el valor ingresado no sea un número mayor a cero, puedes establecer el subtotal en 0 o lo que desees.
      setWeight(0);
      setSubtotal(0);
    }
  } 
  
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
            Información de Paquete
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
                <Grid container spacing={3}>
                    {/* Peso */}
                    <Grid item xs={12} xl={6}>
                        <MDInput type="Number" label="Peso (Lbs.)" value={weight} variant="standard" onChange={(e) => priceSubTotal(parseFloat(e.target.value))} fullWidth />
                    </Grid>
                    {/* Sub Total */}
                    <Grid item xs={12} lg={6}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} xl={4}>
                          <MDTypography variant="overline">Sub Total</MDTypography>  
                        </Grid>
                        <Grid item xs={12} xl={8}>
                          <MDInput disabled value={subtotal} type="Number" variant="standard" fullWidth />
                        </Grid>
                      </Grid>
                    </Grid>
                </Grid>
            </MDBox>
            <MDBox mb={2}>
                <Grid container spacing={3}>
                    {/* Direccion */}
                    <Grid item xs={12} xl={12}>
                        <MDInput label="Descripción" multiline rows={5} value={description} onChange={(e) => setDescription(e.target.value)} fullWidth/>
                    </Grid>
                </Grid>
            </MDBox>
            
            <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              color="info"
              onClick={() => sendData()}
              fullWidth
            >
              Agregar
            </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
  );
}

export default FormPackage;
