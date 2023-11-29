import axios from "axios";
import { bigcommerceConfig } from "../constant/config";
import authService from "./auth.service";
const getorders = async (
  orderStates: string[],
  destination: string,
  storeName: string
) => {
  await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      bigcommerceConfig.API_URL + "getbigcommerceorders",
      {
        orderStates,
        destination,
        storeName,
      },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const bigcommerceLogin = async () => {
  // await authService.is_jwt_expired();
  const url = "https://login.bigcommerce.com";
  window.open(url, "_blank");
};
const saveUserId = async (code: string, store_hash: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      bigcommerceConfig.API_URL + "saveUserId",
      {
        code,
        store_hash,
      },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const isBigAuth = async () => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      bigcommerceConfig.API_URL + "isAuth",
      {},
      { headers }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const disconnect = async (storeHash: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      bigcommerceConfig.API_URL + "disconnect",
      { storeHash },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const updateToShipment = async (orders: string[], status_id: number) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      bigcommerceConfig.API_URL + "update2shipment",
      {
        orders,
        status_id,
      },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const markAsShipped = async (
  orders: string[],
  carrier: string,
  tracking_number: string,
  tracking_url: string
) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      bigcommerceConfig.API_URL + "markasshipped",
      {
        orders,
        carrier,
        tracking_number,
        tracking_url,
      },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const getBigCommerceStores = async () => {
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      bigcommerceConfig.API_URL + "getBigCommerceStores",
      {},
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const getProducts = async () => {
  await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      bigcommerceConfig.API_URL + "getProducts",
      {},
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const removeStore = async (storeName: string) => {
  bigcommerceLogin();
};
export default {
  bigcommerceLogin,
  saveUserId,
  getorders,
  isBigAuth,
  disconnect,
  updateToShipment,
  markAsShipped,
  getBigCommerceStores,
  getProducts,
  removeStore,
};
