import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "./provider/auth/authenticated-route";
import ApplicationModule from "./layout/ApplicationModule";
import UnauthenticatedRoute from "./provider/auth/unauthenticated-route";
import AuthModule from "./layout/AuthModule";

const Pages = () => {
  return (
    <Routes>
      <Route
        path="application/*"
        element={<AuthenticatedRoute redirect="/auth/signin" />}
      >
        <Route element={<ApplicationModule />} path="*" />
      </Route>
      <Route
        path="auth/*"
        element={<UnauthenticatedRoute redirect="/application/orders" />}
      >
        <Route element={<AuthModule />} path="*" />
      </Route>
      <Route path="*" element={<Navigate to="/auth/home" />} />
    </Routes>
  );
};

export default Pages;
