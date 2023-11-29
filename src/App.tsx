import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "./provider/auth/authenticated-route";
import ApplicationModule from "./layout/ApplicationModule";
import UnauthenticatedRoute from "./provider/auth/unauthenticated-route";
import AuthModule from "./layout/AuthModule";
import EmailVerification from "./pages/emailverification.page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuth, setUnAuth } from "./redux/authslice";
import SetupInvitePassword from "./pages/setupinvitepassword.page";
import { RootState } from "./redux/store";
import LandingPage from "./pages/landing.page";
import TermsOfUsePage from "./pages/termsofuse.page";
import PrivacyPolicyPage from "./pages/privacypolicy.page";
import Home from "./pages/home.page";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null && token != "") {
      dispatch(setAuth());
    } else dispatch(setUnAuth());
  }, []);

  return (
    <>
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
        <Route path="/home" element={<Home />} />
        {/* <Route path="/termsofuse" element={<TermsOfUsePage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicyPage />} /> */}
        <Route path="*" element={<Navigate to="/auth/signin" />} />
        <Route path="/verify/:token" element={<EmailVerification />} />
        <Route path="/setupPassword/:token" element={<SetupInvitePassword />} />
      </Routes>
    </>
  );
}
