import Tables from "layouts/tables";
import Billing from "layouts/billing";
// @mui icons
import Icon from "@mui/material/Icon";
import { WorkersList } from "modules/workers/workers-table/workers-list";
import { DestinationsList } from "modules/destinations/destinations-table/destinations-list";
import { WarehouseList } from "modules/warehouse/warehouse-table/warehouse-list";
import { BranchList } from "modules/branch/branch-table/branch-list";
import { VehicleList } from "modules/vehicle/vehicle-table/vehicle-list";
import MDButton from "components/MDButton";
import { PriceList } from "modules/price/price-list";
import Shipment from "modules/shiprment";
import { Reports } from "modules/reports/general-list";
import { DecisionsView } from "modules/decisions-module/decisions-view";
import AdminRouteGuard from "guards/admin-guard";
import { PositionList } from "modules/workers/position/position-list";
import Dashboard from "modules/dashboard/dashboard";
import { CostList } from "modules/costs/costs-table/cost-list";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <AdminRouteGuard>
        <Dashboard />
      </AdminRouteGuard>
    ),
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
    component: (
      <AdminRouteGuard>
        <WorkersList />
      </AdminRouteGuard>
    ),
  },
  {
    type: "collapse",
    name: "Puestos",
    key: "puestos",
    icon: (
      <Icon fontSize="small">
        <span class="material-symbols-outlined">work</span>{" "}
      </Icon>
    ),
    route: "/puestos",
    component: (
      <AdminRouteGuard>
        <PositionList />
      </AdminRouteGuard>
    ),
  },
  {
    type: "collapse",
    name: "Costos",
    key: "costos",
    icon: (
      <Icon fontSize="small">
        <span class="material-symbols-outlined">attach_money</span>{" "}
      </Icon>
    ),
    route: "/costos",
    component: (
      <AdminRouteGuard>
        <CostList />
      </AdminRouteGuard>
    ),
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
    component: (
      <AdminRouteGuard>
        <VehicleList />
      </AdminRouteGuard>
    ),
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
    component: (
      <AdminRouteGuard>
        <BranchList />
      </AdminRouteGuard>
    ),
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
    component: (
      <AdminRouteGuard>
        <WarehouseList />
      </AdminRouteGuard>
    ),
  },
  {
    type: "collapse",
    name: "Envio",
    key: "envio",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/envio",
    component: (
      <AdminRouteGuard>
        <Shipment />
      </AdminRouteGuard>
    ),
  },
  {
    type: "collapse",
    name: "Tarifarios",
    key: "tarifarios",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/tarifarios",
    component: (
      <AdminRouteGuard>
        <PriceList />
      </AdminRouteGuard>
    ),
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
    component: (
      <AdminRouteGuard>
        <DestinationsList />
      </AdminRouteGuard>
    ),
  },
  {
    type: "collapse",
    name: "Reportes",
    key: "reportes",
    icon: (
      <Icon fontSize="small">
        <span class="material-symbols-outlined">description</span>
      </Icon>
    ),
    route: "/reportes",
    component: (
      <AdminRouteGuard>
        <Reports />
      </AdminRouteGuard>
    ),
  },
  {
    type: "collapse",
    name: "Modulo decisional",
    key: "modulo-decisional",
    icon: (
      <Icon fontSize="small">
        <span class="material-symbols-outlined">gavel</span>
      </Icon>
    ),
    route: "/modulo-decisional",
    component: (
      <AdminRouteGuard>
        <DecisionsView />
      </AdminRouteGuard>
    ),
  },
];

export default routes;
