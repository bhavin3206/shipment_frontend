import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { PageLayout } from "../components/page-layout";
import { ErrorHandle } from "./signup.page";
import ToastService from "../components/toast/toast.component";
import AuthService from "../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at lease 6 characters long")
    .required("Password is required!"),
  confirmpassword: Yup.string()
    .min(6, "Password must be at lease 6 characters long")
    .required("Password is required!"),
});

const initialValues = {
  password: "",
  confirmpassword: "",
};

export default function SetupInvitePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleResetPassword = async (formValue: {
    password: string;
    confirmpassword: string;
  }) => {
    const { password, confirmpassword } = formValue;

    if (password != confirmpassword) {
      ToastService.showToast("failed", "Password doesn't match");
      return;
    }

    AuthService.resetInvitePassword(token!, password)
      .then((response) => {
        ToastService.showToast("success", response.data.result);
        navigate("/auth/signin");
      })
      .catch((error) => {
        if (error.response) {
          ToastService.showToast("failed", error.response.data.result);
        } else {
          ToastService.showToast("failed", "An error occured");
        }
      });
  };

  return (
    <PageLayout>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <ToastService.MyToastContainer />
        <div className="text-center text-3xl font-bold mt-16 mb-12">
          Create new password
        </div>
        <div className="relative w-[460px] p-4 mt-0 mb-auto ml-auto mr-auto  bg-white rounded-2xl shadow-lg lg:max-w-xl">
          <div className="absolute -top-5 -left-56">
            <img src="/shape.png" alt="" />
          </div>
          <div className="absolute top-60 -left-20">
            <img src="/dots.png" alt="" />
          </div>
          <div className="absolute top-60 -right-80">
            <img src="/human.png" alt="" />
          </div>
          <div className="absolute top-5 -right-24">
            <img src="/stars.png" alt="" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleResetPassword}
          >
            <Form className="mt-2 mx-6">
              {/* <p className="mt-8 text-lg font-sans text-center text-gray-700">
                Enter your user account's verified email address and we will send you a password
                reset link.
              </p> */}
              <label className="block mt-8 mb-2 text-base  text-gray-800">
                Enter your new password
              </label>

              <Field name="password">
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
                      size="small"
                      type={showPassword ? "text" : "password"}
                      color="primary"
                      placeholder="password"
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
              <div className="h-[20px]" />
              <Field name="confirmpassword">
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
                      size="small"
                      type={showConfirmPassword ? "text" : "password"}
                      color="primary"
                      placeholder="confirm password"
                      className="block w-full px-4 py-2 mt-2 text-gray-800 -skew-x-6 bg-white border rounded-md focus:border-baseFocusColor focus:ring-baseFocusColor1 focus:outline-none focus:ring focus:ring-opacity-40"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowConfirmPassword}
                            >
                              {showConfirmPassword ? (
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

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full px-4 py-4 tracking-wide text-xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1"
                >
                  <span>Reset password</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </PageLayout>
  );
}
