import React from "react";
import { Route, Routes } from "react-router-dom";
import Orders from "../pages/orders.page";
import Onboard from "../pages/onboard.page";
import MainLayout from "./MainLayout";
import Profile from "../pages/profile.page";
import SettingsPage from "../pages/settings.page";
import Product from "../pages/products.page";
import UpsUserManagement from "../components/pagecontents/settings/upsUsers/upsUser.component";
import PackageManagement from "../components/pagecontents/settings/package/upsPackage.component";
import FromLocations from "../components/pagecontents/settings/fromLocations/locations.component";
import InternationalSettings from "../components/pagecontents/settings/international/internationalsettings.component";
import PaymentComponent from "../components/pagecontents/settings/payment/payment.component";
import UserManagement from "../components/pagecontents/settings/users/usermanagement.component";

const ApplicationModule = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<SettingsPage />}>
          <Route path="onboard" element={<Onboard />} />
          <Route path="product" element={<Product />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="upsuser" element={<UpsUserManagement />} />
          <Route path="package" element={<PackageManagement />} />
          <Route path="fromlocation" element={<FromLocations />} />
          <Route path="international" element={<InternationalSettings />} />
          <Route path="payment" element={<PaymentComponent />} />
        </Route>
      </Routes>
    </MainLayout>
  );
};

export default ApplicationModule;
