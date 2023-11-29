import axios from "axios";
import { upsConfig } from "../constant/config";
import { ShipperLocation } from "../components/pagecontents/shipperlocation-no-need.component";
import { UpsPackageData } from "../components/pagecontents/settings/package/upsPackage.component";
import { FromLocationData } from "../components/pagecontents/settings/fromLocations/dialog/dialog.component";
import {
  InternationalDataType,
  TaxData,
} from "../components/pagecontents/settings/international/internationalsettings.component";
import { ShipmentData } from "../components/pagecontents/orders/ship/ship.component";
const validate = async () => {
  // await authService.is_jwt_expired();
  try {
    const ups_validate_endpoint = upsConfig.ups_validate_endpoint;
    const ups_redirect_uri = upsConfig.ups_redirect_uri;
    const response = await axios.post(upsConfig.API_URL + "validate", {
      ups_validate_endpoint,
      ups_redirect_uri,
    });

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const getCode = async (url: string, type: string) => {
  window.location.href = `${url}?client_id=${upsConfig.ups_client_id}&redirect_uri=${upsConfig.ups_redirect_uri}&type=${type}&response_type=code&scope=read"`;
};
const getToken = async (code: string, accountNumber: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  const ups_token_endpoint = upsConfig.ups_token_endpoint;
  const ups_redirect_uri = upsConfig.ups_redirect_uri;
  try {
    const response = await axios.post(
      upsConfig.API_URL + "getToken",
      {
        code,
        accountNumber,
        ups_token_endpoint,
        ups_redirect_uri,
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
const refreshToken = async (accountNumber: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  const ups_refreshtoken_endpoint = upsConfig.ups_refreshtoken_endpoint;
  try {
    const response = await axios.post(
      upsConfig.API_URL + "refreshToken",
      {
        ups_refreshtoken_endpoint,
        accountNumber,
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
const isUpsAuth = async (accountNumber: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "isUPSAuth",
      { accountNumber },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const disconnect = async () => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "disconnect",
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
const getRateServices = async (
  shipmentData: ShipmentData,
  accountNumber: string
) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const ups_rate_endpoint = upsConfig.ups_rate_endpoint;
    const response = await axios.post(
      upsConfig.API_URL + "getRateServices",
      {
        shipmentData,
        accountNumber,
        ups_rate_endpoint,
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
const getOrderRates = async (
  shipmentData: ShipmentData,
  accountNumber: string,
  serviceCodes: string[],
  weight: number,
  confirmation: string
) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const ups_rate_endpoint = upsConfig.ups_rate_endpoint;
    const response = await axios.post(
      upsConfig.API_URL + "getOrderRates",
      {
        shipmentData,
        accountNumber,
        serviceCodes,
        weight,
        confirmation,
        ups_rate_endpoint,
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
const getOrderRate = async (
  shipmentData: ShipmentData,
  accountNumber: string
) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const ups_rate_endpoint = upsConfig.ups_rate_endpoint;
    const response = await axios.post(
      upsConfig.API_URL + "getOrderRate",
      {
        shipmentData,
        accountNumber,
        ups_rate_endpoint,
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
const createLabel = async (
  order: string,
  shipmentData: ShipmentData,
  accountNumber: string
) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const ups_shipment_endpoint = upsConfig.ups_shipment_endpoint;
    const response = await axios.post(
      upsConfig.API_URL + "createLabel",
      {
        order,
        shipmentData,
        accountNumber,
        ups_shipment_endpoint,
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
const getLabel = async (order: string, accountNumber: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const ups_shipment_endpoint = upsConfig.ups_shipment_endpoint;
    const response = await axios.post(
      upsConfig.API_URL + "getLabel",
      {
        order,
        accountNumber,
        ups_shipment_endpoint,
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
const getInvoice = async (order: string, accountNumber: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const ups_shipment_endpoint = upsConfig.ups_shipment_endpoint;
    const response = await axios.post(
      upsConfig.API_URL + "getInvoice",
      {
        order,
        accountNumber,
        ups_shipment_endpoint,
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
const getLabelRecovery = async (order: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const ups_shipment_endpoint = upsConfig.ups_shipment_endpoint;
    const response = await axios.post(
      upsConfig.API_URL + "labelRecovery",
      {
        order,
        ups_shipment_endpoint,
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

const addUser = async (shipperLocation: ShipperLocation) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "addUser",
      { shipperLocation },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const getUsers = async () => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "getUsers",
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
const removeUser = async (shipperno: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "removeUser",
      { shipperno },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const addPackage = async (packageData: UpsPackageData) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "addPackage",
      { packageData },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const updatePackage = async (packageData: UpsPackageData) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "updatePackage",
      { packageData },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const getPackages = async () => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "getPackages",
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
const removePackage = async (packageName: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "removePackage",
      { packageName },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const makeDefaultUser = async (fullName: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "makeDefaultUser",
      { fullName },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const addFromLocation = async (fromLocation: FromLocationData | undefined) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "addFromLocation",
      {
        fromLocation,
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
const updateFromLocation = async (fromLocation: FromLocationData) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "updateFromLocation",
      {
        fromLocation,
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
const checkAddressValidation = async (
  shipLocation: string[],
  accountNumber: string
) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "checkAddressValidation",
      {
        ups_addressValidation_endpoint:
          upsConfig.ups_addressValidation_endpoint,
        street: shipLocation[0],
        city: shipLocation[1],
        countryCode: shipLocation[2],
        stateCode: shipLocation[3],
        postalCode: shipLocation[4],
        recipient: shipLocation[5],
        accountNumber,
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
const deleteFromLocation = async (id: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "deleteFromLocation",
      {
        id,
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
const getFromLocations = async () => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "getFromLocations",
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
const addTax = async (taxData: TaxData) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "addTax",
      { taxData },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const deleteTax = async (nickname: string) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "deleteTax",
      { nickname },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const getTaxes = async () => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "getTaxes",
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
const saveInternationalSettings = async (
  internationalData: InternationalDataType
) => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "saveInternationalSettings",
      { internationalData },
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const getInternationalSettings = async () => {
  // await authService.is_jwt_expired();
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      upsConfig.API_URL + "getInternationalSettings",
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
const getAddress = async (address: string) => {
  const apiKey = upsConfig.addressApiKey;
  try {
    const response = await axios.post(
      upsConfig.API_URL + "getAddress",
      { address, apiKey },
      {}
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const addressValidation = async (address: string) => {
  const apiKey = upsConfig.addressApiKey;
  try {
    const response = await axios.post(
      upsConfig.API_URL + "addressValidation",
      { address, apiKey },
      {}
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
  validate,
  getToken,
  disconnect,
  isUpsAuth,
  createLabel,
  getOrderRate,
  getOrderRates,
  getRateServices,
  getLabel,
  getInvoice,
  checkAddressValidation,
  addFromLocation,
  updateFromLocation,
  deleteFromLocation,
  getFromLocations,
  refreshToken,
  addUser,
  getUsers,
  removeUser,
  makeDefaultUser,
  addPackage,
  updatePackage,
  getPackages,
  removePackage,
  addTax,
  deleteTax,
  getTaxes,
  saveInternationalSettings,
  getInternationalSettings,
  getAddress,
  addressValidation,
  // getLabelRecovery,
};
