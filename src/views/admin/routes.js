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
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/empleados",
    component: <WorkersList />,
  },
  {
    type: "collapse",
    name: "Sucursales",
    key: "sucursales",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/sucursales",
    component: <Tables />,
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
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/departamentos",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Reportes",
    key: "reportes",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/reportes",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
