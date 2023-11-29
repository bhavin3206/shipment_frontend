const upsUrl =
  process.env.NODE_ENV === "development"
    ? "https://wwwcie.ups.com"
    : "https://onlinetools.ups.com";
const IS_DEVELOPMENT = process.env.NODE_ENV === "development" ? true : false;
// export const firebaseConfig = {
//   apiKey: "AIzaSyBkPP650u_2Hxx1ImrBQdvIh-7tQgfdwjQ",
//   authDomain: "shipverse-ad7bf.firebaseapp.com",
//   projectId: "shipverse-ad7bf",
//   storageBucket: "shipverse-ad7bf.appspot.com",
//   messagingSenderId: "568854448961",
//   appId: "1:568854448961:web:061587ce86da576741efc0",
//   measurementId: "G-5GEMW4RHX4",
// };
export const bigcommerceConfig = {
  API_URL: "/api/bigcommerce/",
  bc_client_id: IS_DEVELOPMENT
    ? "9jdk8i1a4onjot8nwz4u9i8yz3edvzw"
    : "efs9f29rdqtf056jygdahm0p8heu9h",
  bc_auth_endpoint: "https://login.bigcommerce.com/oauth2/authorize",
  bc_redirect_uri: IS_DEVELOPMENT
    ? "http://localhost:3000/application/settings/onboard"
    : "https://app.goshipverse.com/application/settings/onboard",
  scopes: "store_v2_orders store_v2_products store_v2_information", // add scopes separated by space
  bc_token_endpoint: "https://login.bigcommerce.com/oauth2/token",
};
export const upsConfig = {
  API_URL: "/api/ups/",
  ups_client_id: IS_DEVELOPMENT
    ? "qsHvKXwJEIprVlp4v9FRen1zAUtl5t5pvFEgWR8epV5BmkBZ"
    : "8PoEj3NgOESHtZNbBo7ASpcXoMAJILRlCKgiNF4kZRsNHR9z",
  ups_redirect_uri: IS_DEVELOPMENT
    ? "https://2995-45-126-3-252.ngrok-free.app/application/settings/onboard"
    : "https://app.goshipverse.com/application/settings/onboard",
  ups_validate_endpoint: `${upsUrl}` + "/security/v1/oauth/validate-client",
  ups_token_endpoint: `${upsUrl}` + "/security/v1/oauth/token",
  ups_refreshtoken_endpoint: `${upsUrl}` + "/security/v1/oauth/refresh",
  ups_addressValidation_endpoint: `${upsUrl}` + "/api/addressvalidation/",
  ups_shipment_endpoint: `${upsUrl}` + "/api/shipments/",
  ups_rate_endpoint: `${upsUrl}` + "/api/rating/",
  addressApiKey: "keMMcWt8M0p8ZtVVn_HXTecv_2e3FI_SjF4P7YUfXvI",
};
export const shopifyConfig = {
  API_URL: "/api/shopify/",
  shopify_client_id: IS_DEVELOPMENT
    ? "b4513015ff53dd40c4fb72657c34a995"
    : "4bfac20a06df28aac9782bd9569530eb",
  shopify_redirect_uri: IS_DEVELOPMENT
    ? "http://localhost:8080/api/shopify/addshopifystore"
    : "https://app.goshipverse.com/api/shopify/addshopifystore",
};
export const ngrokConfig = {
  AuthToken: "2RaqpQ3SGpbZKEQETmc7hAtIfSK_3WmJBig3tjdYZKsrfwhdp",
};
