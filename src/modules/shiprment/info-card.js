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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import pattern from "assets/images/illustrations/pattern-tree.svg";

function InfoCard({ color, shippingInformation, total}) {
  

  return (
    <Card
      sx={({ palette: { gradients }, functions: { linearGradient }, boxShadows: { xl } }) => ({
        background: gradients[color]
          ? linearGradient(gradients[color].main, gradients[color].state)
          : linearGradient(gradients.dark.main, gradients.dark.state),
        boxShadow: xl,
        position: "relative",
      })}
    >
      <MDBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        opacity={0.2}
        sx={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
        }}
      />
      <MDBox position="relative" zIndex={2} p={2}>
        <MDBox color="white" p={1} lineHeight={0} display="inline-block">
          <Icon>description</Icon>&nbsp;&nbsp;Ficha de Envío
        </MDBox>
        <MDTypography variant="h5" color="white" fontWeight="medium" sx={{ mt: 3, mb: 5, pb: 1 }}>
          {shippingInformation.sendingBranch.label}&nbsp;&nbsp;&nbsp;{'🢂'}&nbsp;&nbsp;&nbsp;{shippingInformation.receiveBranch.label}
        </MDTypography>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox display="flex" alignItems="center">
            <MDBox mr={3} lineHeight={1}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Envia
              </MDTypography>
              <MDTypography
                variant="h6"
                color="white"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {shippingInformation.clientSendingName}
              </MDTypography>
            </MDBox>
            <MDBox mr={3} lineHeight={1}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Recibe
              </MDTypography>
              <MDTypography
                variant="h6"
                color="white"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {shippingInformation.clientReceiveName}
              </MDTypography>
            </MDBox>
            <MDBox mr={3} lineHeight={1}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Fecha de Envio
              </MDTypography>
              <MDTypography variant="h6" color="white" fontWeight="medium">
                {shippingInformation.sendDate}
              </MDTypography>
            </MDBox>
            <MDBox mr={3} lineHeight={1}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Total
              </MDTypography>
              <MDTypography variant="h6" color="white" fontWeight="medium">
                Q. {total}
              </MDTypography>
            </MDBox>
            <MDBox mr={3} lineHeight={1}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Dirección
              </MDTypography>
              <MDTypography variant="h6" color="white" fontWeight="medium">
                {shippingInformation.address}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of MasterCard
InfoCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the MasterCard
InfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
};

export default InfoCard;
