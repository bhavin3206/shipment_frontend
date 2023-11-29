import { PropsWithChildren, useEffect, useState } from "react";

import { Button, Divider, TextField, Typography } from "@mui/material";
import paymentService from "../../../../services/payment.service";
import ToastService from "../../../toast/toast.component";
export interface AddUserInformation {
  username: string;
  fullName: string;
  email: string;
}

const PaymentComponent: React.FC<PropsWithChildren<{}>> = ({}) => {
  const [count, setCount] = useState(0);
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [cancel_date, setCancelDate] = useState("");
  useEffect(() => {
    paymentService
      .getSubscriptions()
      .then((data) => {
        if (data.data.result == "success") {
          setCount(data.data.count);
          setStartDate(data.data.start_date);
          setEndDate(data.data.end_date);
          setCancelDate(data.data.cancel_date);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const cancelSubscriptionClick = () => {
    paymentService.cancelSubscription(cancel_date).then((response) => {
      if (response.status == 200) {
        var today = new Date();
        var year = today.getFullYear();
        var month = (today.getMonth() + 1).toString().padStart(2, "0");
        var day = today.getDate().toString().padStart(2, "0");
        var date = year + "-" + month + "-" + day;
        if (cancel_date) setCancelDate("");
        else setCancelDate(date);
        ToastService.showToast(
          "success",
          cancel_date ? "Reactivate" : "Subscription Cancelled!"
        );
      }
    });
  };
  const manageClick = (count: number) => {
    paymentService
      .createCheckoutSession(count)
      .then((response) => {
        if (response.status == 200) {
          if (response.data.result == "changed") {
            setCount(response.data.count);
            ToastService.showToast("success", "Subscription Changed!");
          } else {
            window.location.href = response.data.result;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <ToastService.MyToastContainer />
      <div className="w-full">
        <div className=" mt-2 mb-4">
          <Typography variant="h5" className="text-left mb-2 pb-2" gutterBottom>
            Payment & Subscription
          </Typography>
          <Divider />

          <Typography className="text-left pt-2 text-[#828181]" gutterBottom>
            Please upgrade to premium plan to add more users
          </Typography>
          <Typography className="text-left pt-2 text-[#828181]" gutterBottom>
            You can add {count * 5} users now. To add more users, please upgrade
            your subscription plan.
          </Typography>
          <div className="flex">
            <div
              className={`flex flex-col w-80 h-96 ml-4 px-4 border bg-gray-50 items-center justify-center text-center ${
                count === 1 ? "border-4 border-blue-300" : "border"
              }`}
            >
              <img
                src="/ups.svg"
                alt="ups"
                style={{ height: "50px", width: "50px" }}
                className="h-8 mb-4 mt-4"
              />
              <div className="mb-4">Basic</div>
              <div className="mb-4">$9.99/Month</div>
              <div className="mb-8">
                {cancel_date && count === 1 ? (
                  "Cancelled At: " + cancel_date
                ) : count === 1 ? (
                  "End At: " + end_date
                ) : (
                  <>&nbsp;</>
                )}
              </div>
              <button
                type="submit"
                className="w-full h-[42px] text-center align-middle mb-8 px-4 py-4 tracking-wide text-2xl  text-white transition-colors duration-200 transform bg-blue-400 rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-500 flex items-center justify-center"
                onClick={() => {
                  if (count == 1) cancelSubscriptionClick();
                  else manageClick(1);
                }}
              >
                <span className="text-white text-base">
                  {count === 1
                    ? cancel_date
                      ? "Reactivate"
                      : "Cancel"
                    : "Buy now"}
                </span>
              </button>
              <div className="w-full mb-12 text-left">Add up 5 users</div>
            </div>
            <div
              className={`flex flex-col w-80 h-96 ml-4 px-4 border bg-gray-50 items-center justify-center text-center ${
                count === 2 ? "border-4 border-blue-300" : "border"
              }`}
            >
              <img
                src="/ups.svg"
                alt="ups"
                style={{ height: "50px", width: "50px" }}
                className="h-8 mb-4 mt-4"
              />
              <div className="mb-4">Advanced</div>
              <div className="mb-4">$19.99/Month</div>
              <div className="mb-8">
                {cancel_date && count === 2 ? (
                  "Cancelled At: " + cancel_date
                ) : count === 2 ? (
                  "End At: " + end_date
                ) : (
                  <>&nbsp;</>
                )}
              </div>
              <button
                type="submit"
                className="w-full h-[42px] text-center align-middle mb-8 px-4 py-4 tracking-wide text-2xl  text-white transition-colors duration-200 transform bg-blue-400 rounded-md hover:bg-blue-300 focus:outline-none focus:bg-blue-500 flex items-center justify-center"
                onClick={() => {
                  if (count == 2) cancelSubscriptionClick();
                  else manageClick(2);
                }}
              >
                <span className="text-white text-base">
                  {count === 2
                    ? cancel_date
                      ? "Reactivate"
                      : "Cancel"
                    : "Buy now"}
                </span>
              </button>
              <div className="w-full mb-12 text-left">Add up 10 users</div>
            </div>
          </div>
          {/* <div className="flex mt-2">
          {!cancel_date ? (
            <div className="flex">
              <button
                type="submit"
                className="w-[120px] h-[42px] text-center align-middle ml-4 px-4 py-4 tracking-wide text-2xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 flex items-center justify-center"
                onClick={manageClick}
              >
                <span className="text-white text-base">Manage</span>
              </button>
            </div>
          ) : null}
          
          <button
            type="submit"
            className="w-[120px] h-[42px] text-center align-middle ml-4 px-4 py-4 tracking-wide text-2xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 flex items-center justify-center"
            onClick={cancelSubscriptionClick}
          >
            <span className="text-white text-base">
              {cancel_date ? "Reactivate" : "Cancel"}
            </span>
          </button>
          
        </div>
        <div className="text-[#828181] mt-2">
          {cancel_date ? "Cancelled At:" : "End Date:"}
          {cancel_date ? cancel_date : end_date}
        </div> */}
        </div>
      </div>
    </>
  );
};

export default PaymentComponent;
