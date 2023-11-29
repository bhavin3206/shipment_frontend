import axios from "axios";
import { shopifyConfig } from "../constant/config";

const getCode = async (shopifyDomain: string) => {
  const scopes =
    "write_orders,read_customers,read_assigned_fulfillment_orders,write_assigned_fulfillment_orders,read_fulfillments,write_fulfillments,read_merchant_managed_fulfillment_orders,write_merchant_managed_fulfillment_orders,read_third_party_fulfillment_orders,write_third_party_fulfillment_orders";
  if (!shopifyDomain.includes("myshopify.com"))
    shopifyDomain = shopifyDomain + ".myshopify.com";
  const url = `https://${shopifyDomain}/admin/oauth/authorize?client_id=${shopifyConfig.shopify_client_id}&scope=${scopes}&redirect_uri=${shopifyConfig.shopify_redirect_uri}`;
  window.location.href = url;
};
const getAccessToken = async (code: string, shop: string) => {
  const headers = { Authorization: localStorage.getItem("token") };
  if (!shop.includes("myshopify.com")) shop = shop + ".myshopify.com";
  console.log(shop);
  const shopify_token_endpoint = `https://${shop}/admin/oauth/access_token`;
  try {
    const response = await axios.post(
      shopifyConfig.API_URL + "getToken",
      {
        code,
        shop,
        shopify_token_endpoint,
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
const getShopifyStores = async () => {
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      shopifyConfig.API_URL + "getShopifyStores",
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
const updateToShipment = async (
  orders: string[],
  text: string,
  storeName: string
) => {
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      shopifyConfig.API_URL + "update2shipment",
      {
        orders,
        text,
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
const markAsShipped = async (
  orders: string[],
  storeName: string,
  carrier: string,
  tracking_number: string,
  tracking_url: string
) => {
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      shopifyConfig.API_URL + "markasshipped",
      {
        orders,
        storeName,
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
const getorders = async (
  orderStates: string[],
  destination: string,
  storeName: string
) => {
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      shopifyConfig.API_URL + "getshopifyorders",
      {
        orderStates,
        destination,
        storeName: storeName,
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
const removeStore = async (storeName: string) => {
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      shopifyConfig.API_URL + "removestore",
      {
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
export default {
  getCode,
  getAccessToken,
  getShopifyStores,
  getorders,
  updateToShipment,
  markAsShipped,
  removeStore,
};
