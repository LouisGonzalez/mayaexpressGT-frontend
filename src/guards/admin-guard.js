
import { useDataContextController } from "data-context/data-context";
import Login from "modules/login/login";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import React from "react";

const AdminRouteGuard = ({ children, ...rest }) => {

    const [generalController, generalDispatch] = useDataContextController();
    const { authToken, typeToken } = generalController;

    return authToken !== "" && typeToken === "EMPLOYEE" ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
}

export default AdminRouteGuard;