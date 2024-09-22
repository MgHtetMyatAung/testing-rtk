import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouteConfigs } from "./route_config";
import LoginUserProvider from "../providers/LoginUserProvider";
import AuthProvider from "../providers/AuthProvider";
import { routeAccess } from "../constants/route_access";

export default function Router() {
  return (
    <Routes>
      {RouteConfigs.map(({ path, element, access_type }, index) => {
        let routeElement = element;

        // Apply protection based on access type
        if (access_type === routeAccess.private) {
          routeElement = <LoginUserProvider>{element}</LoginUserProvider>;
        } else if (access_type === routeAccess.auth) {
          routeElement = <AuthProvider>{element}</AuthProvider>;
        }

        return <Route key={index} path={path} element={routeElement} />;
      })}
    </Routes>
  );
}
