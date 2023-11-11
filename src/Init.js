import createCache from "@emotion/cache";
import { useMaterialUIController } from "context";
import { useDataContextController } from "data-context/data-context";
import Login from "modules/login/login";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
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



    return (
      <>
        {/* <CacheProvider value={rtlCache}> */}
          <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
            <CssBaseline />

            {/* {authToken === "" ? <Login /> : <AdminHomepage />} */}
            <AdminHomepage />
          </ThemeProvider>
        {/* </CacheProvider> */}
      </>
    );

}