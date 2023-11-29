import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../pages/signin.page";
import Signup from "../pages/signup.page";
import Forgotpassword from "../pages/forgotpassword.page";
import Resetpassword from "../pages/resetpassword.page";
const AuthModule = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<Forgotpassword />} />
      <Route path="/resetpassword/:token" element={<Resetpassword />} />
    </Routes>
  );
};

export default AuthModule;
