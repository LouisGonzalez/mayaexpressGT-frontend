import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import { WorkersList } from "modules/workers/workers-table/workers-list";
import { DestinationsList } from "modules/destinations/destinations-table/destinations-list";
import { WarehouseList } from "modules/warehouse/warehouse-table/warehouse-list";
import { BranchList } from "modules/branch/branch-table/branch-list";
import { VehicleList } from "modules/vehicle/vehicle-table/vehicle-list";
import MDButton from "components/MDButton";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Empleados",
    key: "empleados",
    icon: (
      <Icon fontSize="small">
        <span class="material-symbols-outlined">person</span>
      </Icon>
    ),
    route: "/empleados",
    component: <WorkersList />,
  },
  {
    type: "collapse",
    name: "Vehiculos",
    key: "vehiculos",
    icon: (
      <Icon fontSize="small">
        <span class="material-symbols-outlined">directions_car</span>
      </Icon>
    ),
    route: "/vehiculos",
    component: <VehicleList/>,
  },
  {
    type: "collapse",
    name: "Sucursales",
    key: "sucursales",
    icon: (
      <Icon fontSize="small">
        <span class="material-symbols-outlined">store</span>
      </Icon>
    ),
    route: "/sucursales",
    component: <BranchList />,
  },
  {
    type: "collapse",
    name: "Bodegas",
    key: "bodegas",
    icon: (
      <Icon fontSize="small">
        <span class="material-symbols-outlined">warehouse</span>
      </Icon>
    ),
    route: "/bodegas",
    component: <WarehouseList />,
  },
  {
    type: "collapse",
    name: "Pagos",
    key: "pagos",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/pagos",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Tarifarios",
    key: "tarifarios",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/tarifarios",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Departamentos",
    key: "departamentos",
    icon: (
      <Icon fontSize="small">
        <span class="material-symbols-outlined">pin_drop</span>
      </Icon>
    ),
    route: "/departamentos",
    component: <DestinationsList />,
  },
  {
    type: "collapse",
    name: "Reportes",
    key: "reportes",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/reportes",
    component: <Profile />,
  },
];

export default routes;
