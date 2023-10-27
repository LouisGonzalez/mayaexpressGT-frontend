import Dashboard from "layouts/dashboard";

import Icon from "@mui/material/Icon";
import { WorkersList } from "modules/workers/workers-table/workers-list";
import SignUp from "layouts/authentication/sign-up";

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
    name: "Registrar paquetes",
    key: "registrarpaquetes",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/registrar-paquetes",
    component: <Dashboard />,
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
