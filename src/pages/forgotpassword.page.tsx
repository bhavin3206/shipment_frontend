import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { PageLayout } from "../components/page-layout";
import { InputAdornment, TextField } from "@mui/material";
import { Email } from "@mui/icons-material";
import { ErrorHandle } from "./signup.page";
import ToastService from "../components/toast/toast.component";
import AuthService from "../services/auth.service";
const validationSchema = Yup.object().shape({
  email: Yup.string().required("This field is required!"),
});

export default function Forgotpassword() {
  const initialValues = {
    email: "",
  };
  const handleResetPassword = (formValue: { email: string }) => {
    const { email } = formValue;
    AuthService.forgotPassword(email)
      .then((response) => {
        ToastService.showToast("success", response.data.result);
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
          Reset your password
        </div>
        <div className="relative  p-4 mt-0 mb-auto ml-auto mr-auto  bg-white rounded-2xl shadow-lg lg:max-w-xl">
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
              <p className="mt-8 text-lg font-sans text-center text-gray-700">
                Enter your user account's verified email address and we will
                send you a password reset link.
              </p>
              <label className="block mt-8 mb-2 text-base  text-gray-800">
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
                      size="medium"
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
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full px-4 py-4 tracking-wide text-xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1"
                >
                  <span>Send password reset email</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </PageLayout>
  );
}
