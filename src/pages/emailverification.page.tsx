import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { PageLayout } from "../components/page-layout";
import { InputAdornment, TextField } from "@mui/material";
import { Email } from "@mui/icons-material";
import { ErrorHandle } from "./signup.page";
import ToastService from "../components/toast/toast.component";
import AuthService from "../services/auth.service";

import { setAuth } from "../redux/authslice";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function EmailVerification() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    AuthService.verifyEmail(token!)
      .then((response) => {
        console.log("res: ", response);
        if (response.status == 200) {
          setIsVerified(true);
          setMessage("Your email is verified successfully!");

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshtoken", response.data.refreshtoken);
          localStorage.setItem("parentuser", "0");
          localStorage.setItem("roles", "all");
          dispatch(setAuth());

          const intervalId = setInterval(() => {
            console.log("seconds: ", seconds);

            setSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000);

          return () => {
            clearInterval(intervalId);
          };
        }
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.result);
        } else {
          setMessage("An error occured");
        }
      });
  }, []);

  useEffect(() => {
    if (seconds == 0) {
      navigate("/auth/signin");
    }
  }, [seconds]);

  return (
    <PageLayout>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="text-center text-xl font-bold mt-16 mb-12">{message}</div>
        {isVerified && (
          <div className="text-center text-xl font-bold mt-16 mb-12">
            Redirecting in {seconds}...
          </div>
        )}
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
        </div>
      </div>
    </PageLayout>
  );
}
