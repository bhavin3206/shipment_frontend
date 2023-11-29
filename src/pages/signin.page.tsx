import React, { useContext, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import ToastService from "../components/toast/toast.component";
import AuthService from "../services/auth.service";
import { Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { PageLayout } from "../components/page-layout";
import { ErrorHandle } from "./signup.page";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setSubscriptionCount } from "../redux/authslice";
const validationSchema = Yup.object().shape({
  email: Yup.string().required("This field is required!"),
  password: Yup.string()
    .min(6, "Password must be at lease 6 characters long")
    .required("Password is required!"),
});

export default function Signin() {
  // Initialize Firebase
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    setRememberMe(isChecked);

    // Set a cookie with the "rememberMe" value that expires in 30 days
    if (isChecked) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 30);
      document.cookie = `rememberMe=${isChecked}; expires=${expires.toUTCString()}; path=/`;
    } else {
      // Remove the "rememberMe" cookie if the checkbox is unchecked
      document.cookie =
        "rememberMe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (formValue: {
    email: string;
    password: string;
  }) => {
    const { email, password } = formValue;
    AuthService.login(email, password)
      .then((response) => {
        console.log("Response:", response);
        if (response.status == 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshtoken", response.data.refreshtoken);
          localStorage.setItem("parentuser", response.data.parentuser);
          localStorage.setItem("roles", response.data.roles);
          dispatch(setSubscriptionCount(response.data.subcount));
          // localStorage.setItem("roles", response.data.count);
          dispatch(setAuth());

          if (response.data.redirect_onbard === false) {
            window.location.href = "/application/settings/onboard";
          } else {
            window.location.href = "/dashboard";
          }


        } else {
          ToastService.showToast("failed", response.data.result);
        }
      })
      .catch((error) => {
        if (error.response) {
          ToastService.showToast("failed", error.response.data.result);
        } else {
          ToastService.showToast("failed", "An error occured");
        }
      });
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <PageLayout>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <ToastService.MyToastContainer />
        <div className="text-center text-3xl font-bold mt-16 mb-12">
          Welcome to Ship<span className="text-baseColor">Verse</span>
        </div>
        <div className="relative lg:w-[560px] sm:w-[320px] md:w-[470px] lg:h-[570px] sm:h-[320px] md:h-[480px] p-4 mt-0 mb-auto ml-auto mr-auto  bg-white rounded-2xl shadow-lg lg:max-w-xl">
          <div className="absolute -top-5 -left-56">
            <img src="/shape.png" alt="" />
          </div>
          <div className="absolute top-96 -left-20">
            <img src="/dots.png" alt="" />
          </div>
          <div className="absolute top-80 -right-80">
            <img src="/human.png" alt="" />
          </div>
          <div className="absolute top-5 -right-24">
            <img src="/stars.png" alt="" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form className="mt-2 mx-6">
              <p className="mt-8 text-lg font-sans text-center text-gray-700">
                Don't have an account?{" "}
                <a
                  href="signup"
                  className="font-sans underline text-lg text-baseColor hover:underline"
                >
                  Create a free account
                </a>
              </p>
              <div className="relative flex items-center justify-center w-full mt-8 border border-t">
                <div className="font-sans absolute text-base bg-white">
                  or Sign In With Email / Username
                </div>
              </div>
              <p className="mt-8 text-lg font-sans text-center text-gray-700"></p>{" "}
              <label className="block mt-8 mb-2 text-base  text-gray-800">
                Enter your email address or username
              </label>
              <Field name="email" className="mt-8">
                {({
                  field,
                  form: { touched, errors },
                }: {
                  field: any;
                  form: { touched: any; errors: any };
                }) => (
                  <>
                    <TextField
                      {...field}
                      size="medium"
                      type="text"
                      color="primary"
                      placeholder="test@shipverse.com"
                      className="block w-full px-4 py-2 mt-8 text-gray-800 transform -skew-x-6 bg-white border rounded-md focus:border-baseFocusColor focus:ring-baseFocusColor1 focus:outline-none focus:ring focus:ring-opacity-40"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorHandle
                      touched={touched[field.name]}
                      error={errors[field.name]}
                    />
                  </>
                )}
              </Field>
              <div className="mt-8">
                <label className="block mb-2 text-base  text-gray-800">
                  Enter your password
                </label>
                <Field name="password" className="mt-8">
                  {({
                    field,
                    form: { touched, errors },
                  }: {
                    field: any;
                    form: { touched: any; errors: any };
                  }) => (
                    <>
                      <TextField
                        {...field}
                        size="medium"
                        type={showPassword ? "text" : "password"}
                        color="primary"
                        placeholder="min. 6 characters"
                        className="block w-full px-4 py-2 mt-2 text-gray-800 -skew-x-6 bg-white border rounded-md focus:border-baseFocusColor focus:ring-baseFocusColor1 focus:outline-none focus:ring focus:ring-opacity-40"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword}>
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ErrorHandle
                        touched={touched[field.name]}
                        error={errors[field.name]}
                      />
                    </>
                  )}
                </Field>
              </div>
              <div className="flex mt-8 items-center justify-between">
                <div className="flex items-center">
                  {/* <Checkbox
                    id="default-checkbox"
                    value=""
                    className="w-4 h-4 text-baseColor bg-gray-100 border-gray-300 rounded focus:ring-baseFocusColor1"
                    onChange={handleRememberMeChange}
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900">
                    Remember me
                  </label> */}
                </div>

                <a
                  href="forgotpassword"
                  className="text-sm text-right text-baseColor hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full px-4 py-4 tracking-wide text-xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1"
                >
                  <span>Login Here</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </PageLayout>
  );
}
