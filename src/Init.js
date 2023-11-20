import createCache from "@emotion/cache";
import { useMaterialUIController } from "context";
import { useDataContextController } from "data-context/data-context";
import Login from "modules/login/login";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminHomepage from "views/admin/admin-homepage";
import rtlPlugin from "stylis-plugin-rtl";
import MDBox from "components/MDBox";
import { CssBaseline, Icon } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import themeRTL from "assets/theme/theme-rtl";
// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import GenerateQr from "modules/client/generate-qr";
import { Component } from "react";
// Material Dashboard 2 React routes
import routes from "./views/admin/routes";
import AdminRouteGuard from "guards/admin-guard";
import PackagesByWarehouse from "modules/warehouse/packages-by-warehouse/packages-by-warehouse-list";
import PackagesInDestination from "modules/warehouse/packages-in-destination/packages-in-destination";
import ShipmentStatus from "modules/client/shipment-status";


export default function Init(){

    // const [ authToken, setAuthToken ] = useState(false);
    const [ generalController, generalDispatch ] = useDataContextController();
    const [controller, dispatch] = useMaterialUIController();
    const {
        darkMode,
    } = controller;

    const {
        authToken
    } = generalController;
    const [rtlCache, setRtlCache] = useState(null);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });




    return (
      <>
        {/* <CacheProvider value={rtlCache}> */}
        <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
          <CssBaseline />
          <Routes>
            <Route
              path="/admin"
              element={
                <AdminRouteGuard>
                  <AdminHomepage />
                </AdminRouteGuard>
              }
            />

            <Route path="login" element={<Login />} />

            {getRoutes(routes)}
            <Route path="/dashboard" element={<Navigate to="/dashboard" />} />
            <Route
              exact
              path="/paquetes-bodega/:warehouseId"
              element={
                <AdminRouteGuard>
                  <PackagesByWarehouse />
                </AdminRouteGuard>
              }
              key="paquetes-bodega"
            />
            <Route
              exact
              path="/paquetes-entrega/:warehouseId"
              element={
                <AdminRouteGuard>
                  <PackagesInDestination />
                </AdminRouteGuard>
              }
              key="paquetes-entrega"
            />
            <Route exact path="/generar-qr" element={<GenerateQr />} key="generar-qr" />
            <Route exact path="/guias/estado-actual/:shipmentId" element={<ShipmentStatus />} key="estado-actual" />
          </Routes>
          <AdminHomepage />

          {/* {authToken === "" ? <Login /> : <AdminHomepage />} */}
          {/* <AdminHomepage /> */}
        </ThemeProvider>
        {/* </CacheProvider> */}
      </>
    );

}