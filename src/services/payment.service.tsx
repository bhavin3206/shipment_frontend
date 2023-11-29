import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/payment/";

const createCheckoutSession = (count: number) => {
  const headers = { Authorization: localStorage.getItem("token") };
  return axios.post(
    API_URL + "create_checkout_session",
    {
      count,
    },
    { headers }
  );
};
const cancelSubscription = (cancel_date: string) => {
  const headers = { Authorization: localStorage.getItem("token") };
  return axios.post(
    API_URL + "cancel_subscription",
    { isCancel: cancel_date ? false : true },
    { headers }
  );
};
const getSubscriptions = () => {
  const headers = { Authorization: localStorage.getItem("token") };
  return axios.post(API_URL + "get_subscriptions", {}, { headers });
};
export default {
  createCheckoutSession,
  getSubscriptions,
  cancelSubscription,
};
