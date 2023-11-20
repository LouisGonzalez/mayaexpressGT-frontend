import { useState } from "react";

// react-router-dom components
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import LoginLayout from "./login-layout";
import AuthService from "services/authorization/auth.service";
import { useDataContextController } from "data-context/data-context";
import { setAuthToken } from "data-context/data-context";
import GenerateQr from "modules/client/generate-qr";
import Link from "@mui/material/Link";
import { setTypeToken } from "data-context/data-context";
import MDSnackbar from "components/MDSnackbar";
import { setLayout } from "context";
import { useMaterialUIController } from "context";
import { Link as LinkRouter } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authService = new AuthService();
  const [generalController, generalDispatch] = useDataContextController();
  const [onLogin, setOnLogin] = useState(true);
  const [controller, dispatch] = useMaterialUIController();

  /* notifications */
  const [show, setShow] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");
  const toggleSnackbar = () => setShow(!show);

  /* router */
  const navigate = useNavigate();
  const location = useLocation();

  const { authToken } = generalController;

  const signIn = async () => {
    const data = await authService.login(username, password);
    console.log(data)
    if (data.message) {
      setGeneralMessage("El usuario o contraseña no coinciden")
      toggleSnackbar()
    } else {
      setAuthToken(generalDispatch, data.accessToken);
      setTypeToken(generalDispatch, data.role);
      if(data.role === 'EMPLOYEE'){
        navigate("/admin")
        setLayout(dispatch, 'dashboard')
        //window.location.reload()
      }
    }
  };

  return (
    <>
      <MDSnackbar
        color="info"
        icon="notifications"
        title="Notificacion"
        content={generalMessage}
        dateTime="Recientemente"
        open={show}
        close={toggleSnackbar}
      />
      <LoginLayout image={bgImage}>
        {/* <Routes>
          <Route exact path="/cliente/generar-qr" element={<GenerateQr />} key="generar-qr" />
        </Routes> */}

        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              MayaExpress-GT
            </MDTypography>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
              <Grid item xs={2}>
                <MDTypography
                  component={MuiLink}
                  href="https://www.facebook.com/brgg13"
                  variant="body1"
                  color="white"
                >
                  <FacebookIcon color="inherit" />
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography
                  component={MuiLink}
                  href="https://github.com/LouisGonzalez/mayaexpressGT-frontend"
                  variant="body1"
                  color="white"
                >
                  <GitHubIcon color="inherit" />
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                  <GoogleIcon color="inherit" />
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Username"
                  fullWidth
                  onChange={(e) => setUsername(e.target.value)}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={signIn}>
                  sign in
                </MDButton>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <LinkRouter
                  to={{ pathname: `/generar-qr` } }
                >
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                  >
                    Vista cliente
                  </MDButton>
                </LinkRouter>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </LoginLayout>
    </>
  );
}

export default Login;
