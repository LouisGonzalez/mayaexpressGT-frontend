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

import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import AdminHomepage from "views/admin/admin-homepage";
import OperatorHomepage from "views/operator/operator-homepage";
import WorkerHomepage from "views/worker/worker-homepage";
import Login from "modules/login/login";
// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { DataContextControllerProvider } from "data-context/data-context";
import Init from "Init";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <DataContextControllerProvider>
        {/* <Login/> */}
        {/* <AdminHomepage /> */}

        <Init/> 

        {/* <App/> */}
      </DataContextControllerProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
