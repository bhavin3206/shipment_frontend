import React, { useContext, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import ToastService from "../components/toast/toast.component";
import AuthService from "../services/auth.service";
import { Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import {
  Email,
  PersonOutline,
  PhoneAndroidOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { PageLayout } from "../components/page-layout";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authslice";
const validationSchema = Yup.object().shape({
  userName: Yup.string().matches(/^[a-zA-Z0-9_@.-]{3,30}$/, 'Username can cantain only letters (uppercase and lowercase), numbers, underscores, and hyphens, without spaces.').required("Username must be filled!"),
  fullName: Yup.string().required("Fullname must be filled!"),
  email: Yup.string().email().required("Email field is required!"),
  phone: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Phonenumber is invalid').required("Phonenumber is required!"),
  password: Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,"Password requires at least 1 lowercase letter,1 uppercase,1 number,1 special character and minimum 8 character long.")
    .required("Password is required!"),
});

export default function Signup() {
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleAcceptTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Set a cookie with the "rememberMe" value that expires in 30 days
    const isChecked = event.target.checked;
    setAcceptTerms(isChecked);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();
  const handleSignup = async (formValue: {
    userName: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const { userName, fullName, email, phone, password } = formValue;
    const usertype = "owner";
    const parentuser = "0";
    const roles = "all";
    const active = true;
    AuthService.signup(
      userName,
      fullName,
      email,
      phone,
      password,
      usertype,
      parentuser,
      roles,
      active
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          ToastService.showToast("success", response.data.result);
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
    userName: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
  };

  return (
    <PageLayout>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <ToastService.MyToastContainer />
        <div className="text-center text-3xl font-bold mt-8 mb-12">
          Welcome to Ship<span className="text-baseColor">Verse</span>
        </div>
        <div className="relative w-[560px] h-100 p-4 mt-0 mb-auto ml-auto mr-auto  bg-white rounded-2xl shadow-lg lg:max-w-xl">
          <div className="absolute -top-5 -left-56">
            <img src="/shape.png" alt="" />
          </div>
          <div className="absolute top-[600px] -left-20">
            <img src="/dots.png" alt="" />
          </div>
          <div className="absolute top-[500px] -right-80">
            <img src="/human.png" alt="" />
          </div>
          <div className="absolute top-5 -right-24">
            <img src="/stars.png" alt="" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            <Form className="m-2 mx-6">
              <p className="mt-4 text-lg font-sans text-center text-gray-700">
                Already have an account?{" "}
                <a
                  href="signin"
                  className="font-sans underline text-lg text-baseColor hover:underline"
                >
                  Sign In
                </a>
              </p>
              <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                <div className="font-sans absolute text-base bg-white">
                  or Sign Up With Email
                </div>
              </div>
              <p className="mt-6 text-lg font-sans text-center text-gray-700"></p>{" "}
              <div className="flex flex-col justify-between gap-y-4">
                <div>
                  <label className="block mb-2 text-base  text-gray-800">
                    Enter full name
                  </label>
                  <Field name="fullName" className="mt-8">
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
                          type="text"
                          color="primary"
                          placeholder="Callen S."
                          className="block w-full px-4 py-2 mt-8 text-gray-800 transform -skew-x-6 bg-white border rounded-md focus:border-baseFocusColor focus:ring-baseFocusColor1 focus:outline-none focus:ring focus:ring-opacity-40"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <PersonOutline />
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
                <div>
                  <label className="block mb-2 text-base  text-gray-800">
                    Enter your email address
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
                          size="small"
                          type="email"
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
                </div>
                <div>
                  <label className="block mb-2 text-base  text-gray-800">
                    Enter your mobile number
                  </label>
                  <Field name="phone" className="mt-8">
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
                          type="text"
                          color="primary"
                          placeholder="+1 987 654 3215"
                          className="block w-full px-4 py-2 mt-8 text-gray-800 transform -skew-x-6 bg-white border rounded-md focus:border-baseFocusColor focus:ring-baseFocusColor1 focus:outline-none focus:ring focus:ring-opacity-40"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <PhoneAndroidOutlined />
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
                <div>
                  <label className="block mb-2 text-base  text-gray-800">
                    Enter user name
                  </label>
                  <Field name="userName" className="mt-8">
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
                          type="text"
                          color="primary"
                          placeholder="Callen"
                          className="block w-full px-4 py-2 mt-8 text-gray-800 transform -skew-x-6 bg-white border rounded-md focus:border-baseFocusColor focus:ring-baseFocusColor1 focus:outline-none focus:ring focus:ring-opacity-40"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <PersonOutline />
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
                <div>
                  <label className="block mb-2 text-base  text-gray-800">
                    Enter your password
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
                          placeholder="Enter the password"
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
              </div>
              <div className="flex mt-8 items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="default-checkbox"
                    value=""
                    className="w-4 h-4 text-baseColor bg-gray-100 border-gray-300 rounded focus:ring-baseFocusColor1"
                    onChange={handleAcceptTerms}
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900">
                    I accept the terms of{" "}
                    <span className="text-baseColor">The Service</span> &{" "}
                    <span className="text-baseColor">Privacy Policy</span>.
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 disabled:bg-baseDisabled"
                  disabled={!acceptTerms}
                >
                  <span>SignUp Now</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </PageLayout>
  );
}

export const ErrorHandle = ({
  touched,
  error,
}: {
  touched: boolean;
  error: string;
}) => {
  return touched && error ? (
    <div className="error text-red-600 text-sm">*{error}</div>
  ) : (
    <div className="error text-red-600 h-2"></div>
  );
};
