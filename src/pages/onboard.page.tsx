import ToastService from "../components/toast/toast.component";
import bigcommerceService from "../services/bigcommerce.service";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/auth.service";
import {
  AddCircleOutlineOutlined,
  LocalShippingOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import upsService from "../services/ups.service";

import { useDispatch, useSelector } from "react-redux";
import {
  setAccountNumber,
  setAuth,
  setUnAuth,
  setUpsAccounts,
} from "../redux/authslice";
import FromLocationsDialog, {
  FromLocationData,
} from "../components/pagecontents/settings/fromLocations/dialog/dialog.component";
import { RootState } from "../redux/store";
import AddStoreForm from "../components/pagecontents/onboard/addstore.form";
import AddCarrierForm from "../components/pagecontents/onboard/addcarrier.form";
import shopifyService from "../services/shopify.service";
import { Button, Divider, Typography } from "@mui/material";
import { UpsUsersRowData } from "../components/pagecontents/settings/upsUsers/upsUser.component";
import jwtDecode from "jwt-decode";
export interface ShipLocation {
  shipfrom_fullName: string;
  shipfrom_attentionname: string;
  shipfrom_phone: string;
  shipfrom_fax: string;
  shipfrom_address: string;
  shipfrom_city: string;
  shipfrom_statecode: string;
  shipfrom_postalcode: string;
  shipfrom_countrycode: string;
}

const Onboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const accountNumber = useSelector(
    (state: RootState) => state.authReducer.accountNumber
  );
  const [isAuthState, setIsAuthState] = useState(false);
  const [isUpsAuthState, setIsUpsAuthState] = useState(false);
  const [shopifyStores, setShopifyStores] = useState<Array<any>>(
    [] as Array<any>
  );
  const [upsUsers, setUPSUsers] = useState<Array<any>>([] as Array<any>);
  const [showFormOpen, setShowFormOpen] = useState(false);
  const [showAddStoreForm, setShowAddStoreForm] = useState(false);
  const [showAddCarrierForm, setShowAddCarrierForm] = useState(false);
  const [fromLocations, setFromLocations] = useState<FromLocationData[]>([]);
  const [fromLocation, setFromLocation] = useState<FromLocationData>({
    id: "",
    locationName: "",
    residential: false,
    fullName: "",
    attentionName: "",
    countryCode: "",
    address: "",
    address1: "",
    city: "",
    stateCode: "",
    postalCode: "",
    phone: "",
    email: "",
    selected: false,
    timezone: "",
    pickupAddress: false,
    returnFullName: "",
    returnAttentionName: "",
    returnCountryCode: "",
    returnAddress: "",
    returnAddress1: "",
    returnCity: "",
    returnStateCode: "",
    returnPostalCode: "",
    returnPhone: "",
    returnEmail: "",
    returnTimezone: "",
  } as FromLocationData);
  const handleAddStore = () => {
    setShowAddStoreForm(true);
  };
  const handleAddUpsCarrier = () => {
    setShowAddCarrierForm(true);
  };
  const handleAddLocation = () => {
    upsService
      .getFromLocations()
      .then((data) => {
        const jsondata = JSON.parse(data);
        setFromLocations(jsondata.fromLocations);
        setShowFormOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setShowFormOpen(false);
      });
  };
  const handleShowFormClose = () => {
    setShowFormOpen(false);
  };
  const handleSetFromClick = () => {
    setShowFormOpen(true);
  };
  const handleDeleteLocation = (id: string) => {
    upsService
      .deleteFromLocation(id)
      .then((data) => {
        upsService
          .getFromLocations()
          .then((data) => {
            const jsondata = JSON.parse(data);
            setFromLocations(jsondata.fromLocations);
            console.log(fromLocations);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRemoveBigCommerseStore = (storeName: string) => {
    bigcommerceService
      .removeStore(storeName)
      .then()
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemoveShopifyStore = (storeName: string) => {
    shopifyService
      .removeStore(storeName)
      .then(() => {
        ToastService.showToast("success", "Successfully Uninstalled");
        setShopifyStores((prevStores) =>
          prevStores.filter((store) => store.domain !== storeName)
        );
      })
      .catch((err) => {
        console.log(err);
        ToastService.showToast("failed", err.response.data.data);
      });
  };
  const handleRemoveUPS = (accountNumber: string) => {
    upsService
      .removeUser(accountNumber)
      .then(() => {
        const updatedUPSUsers = upsUsers.filter(
          (user) => user !== accountNumber
        );
        setUPSUsers(updatedUPSUsers);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    authService
      .is_jwt_expired()
      .then((result) => {
        if (result == true) {
          dispatch(setUnAuth());
        }
      })
      .catch((error) => {
        dispatch(setUnAuth());
      });
    const signed_payload_jwt = new URLSearchParams(location.search).get(
      "signed_payload_jwt"
    );
    const code = new URLSearchParams(location.search).get("code");
    const account_uuid = new URLSearchParams(location.search).get(
      "account_uuid"
    );
    const hmac = new URLSearchParams(location.search).get("hmac");
    const shop = new URLSearchParams(location.search).get("shop");
    const store_hash = new URLSearchParams(location.search).get("store_hash");
    const bc_code = new URLSearchParams(location.search).get("bc_code");
    bigcommerceService
      .isBigAuth()
      .then(
        (data) => {
          if (data.isAuthorized) setIsAuthState(true);
          return;
        },
        (error) => {
          setIsAuthState(false);
        }
      )
      .catch((error) => {
        setIsAuthState(false);
      });
    upsService
      .getUsers()
      .then(
        (data) => {
          data = JSON.parse(data);
          dispatch(setUpsAccounts(data.carriers));
          data.carriers.map((dataRow: any) => {
            if (dataRow.selected === true) {
              dispatch(setAccountNumber(dataRow.accountNumber));
              setIsUpsAuthState(true);
            }
          });
        },
        (error) => {
          if (error.response.status === 401) {
          }
        }
      )
      .catch((error: any) => {});
    shopifyService
      .getShopifyStores()
      .then(
        (data) => {
          if (data.result) setShopifyStores(data.data);
          return;
        },
        (error) => {
          setShopifyStores([] as Array<any>);
        }
      )
      .catch((error) => {
        setShopifyStores([] as Array<any>);
      });
    console.log(bc_code);
    if (bc_code != null && bc_code != "" && bc_code != undefined) {
      bigcommerceService
        .saveUserId(bc_code, store_hash ?? "")
        .then(() => {
          setIsAuthState(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (
      signed_payload_jwt != null &&
      signed_payload_jwt != "" &&
      signed_payload_jwt != undefined
    ) {
      const decoded = jwtDecode(signed_payload_jwt) as any;
      console.log(decoded);
      const storeHash = decoded.sub.split("/")[1];
      bigcommerceService
        .disconnect(storeHash)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
    if (code && !account_uuid && !hmac) {
      //ups
      const upsAccount = localStorage.getItem("upsAccount");
      upsService
        .getToken(code, upsAccount ? upsAccount : "")
        .then((data) => {
          if (data.access_token) setIsUpsAuthState(true);
          else setIsUpsAuthState(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (hmac && shop) {
      if (!code) {
        shopifyService.getCode(shop);
      } else {
        //in this case shopify
        console.log("-----------------------------");
        shopifyService
          .getAccessToken(code, shop ?? "")
          .then((data) => {
            console.log(data);
            if (data.result == true) {
              shopifyService
                .getShopifyStores()
                .then(
                  (data) => {
                    if (data.result) setShopifyStores(data.data);
                    return;
                  },
                  (error) => {
                    setShopifyStores([] as Array<any>);
                  }
                )
                .catch((error) => {
                  setShopifyStores([] as Array<any>);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    upsService
      .getUsers()
      .then(
        (data) => {
          const dataRows: any[] = [];
          data = JSON.parse(data);
          var accountNumbersArray = data.carriers.map(
            (dataRow: UpsUsersRowData) => {
              return dataRow.accountNumber;
            }
          );
          setUPSUsers(accountNumbersArray);
          setUpsAccounts(accountNumbersArray);
        },
        (error) => {
          console.log(error);
          if (error.response.status === 401) {
          }
        }
      )
      .catch((error: any) => {});
    upsService
      .getFromLocations()
      .then((data) => {
        const jsondata = JSON.parse(data);
        setFromLocations(jsondata.fromLocations);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint - disable - next - line;
  }, []);
  return (
    <>
      <AddStoreForm
        open={showAddStoreForm}
        onClose={() => {
          setShowAddStoreForm(false);
        }}
      ></AddStoreForm>
      <AddCarrierForm
        open={showAddCarrierForm}
        onClose={() => {
          setShowAddCarrierForm(false);
        }}
      ></AddCarrierForm>
      <FromLocationsDialog
        showDialog={showFormOpen}
        onChange={handleAddLocation}
        onClose={handleShowFormClose}
        formData={fromLocation}
      />
      <ToastService.MyToastContainer />
      <div
        className="w-full flex flex-col items-start"
        // style={{ minHeight: "calc(100vh - 700px)" }}
      >
        <div className="w-full">
          <Typography
            variant="h5"
            className="w-full text-left mb-2 pb-2"
            gutterBottom
          >
            Welcome to ShipVerse
          </Typography>
          <Divider />
        </div>
        <div className="w-full text-left text-lg mb-4">
          Check out our{" "}
          <a href="/quickstart" className="text-baseColor">
            Quickstart Guide
          </a>{" "}
          or take a guided approach with{" "}
          <a href="/shipverseuniversity" className="text-baseColor">
            ShipVerse University
          </a>
          .
        </div>
        <div className="w-full flex flex-col  justify-center items-center">
          <div className="w-full h-[340px] rounded-lg mb-4 border border-gray-300 bg-[#F5F6F8] shadow-md">
            <div className="flex p-4 justify-between">
              <div className="mb-4">
                <ShoppingCartOutlined className="mr-2" />
                <span className="text-xl">Connect a store</span>
              </div>
              <div>
                {isAuthState ? (
                  <div className="flex">
                    <svg
                      width="20"
                      height="20"
                      viewBox="9 11 11 8"
                      className="icon check-icon-s1Mg_KB base"
                    >
                      <path
                        fillRule="evenodd"
                        fill="#77BC3F"
                        d="M12.646 18.858l-3.5-3.417a.472.472 0 010-.683l.707-.684a.516.516 0 01.707 0L13 16.467l5.44-5.325a.512.512 0 01.706 0l.707.683a.47.47 0 010 .683l-6.5 6.35a.512.512 0 01-.707 0"
                      ></path>
                    </svg>
                    <div className="text-baseColor">Completed</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex p-2 items-left justify-left gap-6 ml-6">
              {isAuthState ? (
                <div className="w-[200px] h-[200px]  bg-white border border-gray-400 rounded-lg shadow-md flex flex-col items-center justify-center relative">
                  <img
                    src="/doublecheck.png"
                    alt="doublecheck"
                    style={{
                      width: "32px",
                      height: "32px",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                    }}
                  />

                  <img
                    src="/bigcommerce.svg"
                    alt="bigcommerce"
                    style={{ height: "30px" }}
                    className="h-8 mb-4"
                  />
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleRemoveBigCommerseStore("")}
                  >
                    Uninstall
                  </Button>
                </div>
              ) : null}
              {shopifyStores.map((item: any, index: number) => (
                <div
                  className="w-[200px] h-[200px] bg-white border border-gray-400 rounded-lg shadow-md flex flex-col items-center justify-center relative"
                  key={index}
                >
                  <img
                    src="/doublecheck.png"
                    alt="doublecheck"
                    style={{
                      width: "32px",
                      height: "32px",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                    }}
                  />

                  <img
                    src="/shopify.svg"
                    alt="shopify"
                    style={{ height: "40px" }}
                    className="h-8 mb-2"
                  />
                  <div className="w-[150px] text-center break-words">
                    {item.domain.substring(
                      0,
                      item.domain.indexOf("myshopify.com") - 1
                    )}
                  </div>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleRemoveShopifyStore(item.domain)}
                  >
                    Uninstall
                  </Button>
                </div>
              ))}

              <div
                className="w-[200px] h-[200px] bg-white border border-gray-400 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer"
                onClick={handleAddStore}
              >
                <AddCircleOutlineOutlined
                  className="text-baseColor"
                  style={{ fontSize: "42px" }}
                />
                <span className="pt-2 text-xl ">Add a Store</span>
              </div>
            </div>
          </div>
          <div className="w-full h-[340px] rounded-lg mb-4  border bg-[#F5F6F8]  shadow-md ">
            <div className="flex p-4 justify-between">
              <div>
                <LocalShippingOutlined className="mr-2" />
                <span className="text-xl">
                  Activate savings on carrier and insurance rates
                </span>
              </div>
              <div className="flex">
                <div className="flex ">
                  {isUpsAuthState ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="9 11 11 8"
                      className="icon check-icon-s1Mg_KB base"
                    >
                      <path
                        fillRule="evenodd"
                        fill="#77BC3F"
                        d="M12.646 18.858l-3.5-3.417a.472.472 0 010-.683l.707-.684a.516.516 0 01.707 0L13 16.467l5.44-5.325a.512.512 0 01.706 0l.707.683a.47.47 0 010 .683l-6.5 6.35a.512.512 0 01-.707 0"
                      ></path>
                    </svg>
                  ) : (
                    ""
                  )}
                  <div className="text-baseColor">
                    {isUpsAuthState ? "Connected" : "Disconnected"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex p-2 items-start justify-start gap-6 ml-6 mt-4">
              {upsUsers.map((item: string, index: number) => (
                <div className="w-[200px] h-[200px] bg-white border border-gray-400 rounded-lg shadow-md flex flex-col items-center justify-center relative ">
                  <div
                    className=" text-blue-500 hover:text-blue-600"
                    onClick={() => {}}
                  ></div>
                  <img
                    src="/doublecheck.png"
                    alt="doublecheck"
                    style={{
                      width: "32px",
                      height: "32px",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                    }}
                  />
                  <img
                    src="/ups.svg"
                    alt="ups"
                    style={{ height: "72px" }}
                    className="h-8 mb-2"
                  />{" "}
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleRemoveUPS(item)}
                  >
                    Uninstall
                  </Button>
                </div>
              ))}
              <div
                className="w-[200px] h-[200px]  bg-white border border-gray-400 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer"
                onClick={handleAddUpsCarrier}
              >
                <AddCircleOutlineOutlined
                  className="text-baseColor"
                  style={{ fontSize: "42px" }}
                />
                <span className="pt-2 text-xl ">Add a Carrier</span>
              </div>
            </div>
          </div>
          <div className="w-full h-[220px] rounded-lg mb-4  border bg-[#F5F6F8]  shadow-md ">
            <div className="flex p-4 justify-between">
              <div className="flex">
                <svg
                  className="mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M20.1235 15.4245C19.8114 15.2531 19.4196 15.3671 19.2483 15.6791C19.0769 15.9911 19.1908 16.3829 19.5028 16.5543C20.2706 16.9761 20.7109 17.4437 20.7109 17.8372C20.7109 18.3185 20.029 19.0644 18.1151 19.7146C16.2242 20.3571 13.6974 20.7109 11 20.7109C8.30264 20.7109 5.77577 20.3571 3.88493 19.7146C1.97098 19.0644 1.28906 18.3185 1.28906 17.8372C1.28906 17.4437 1.72941 16.9761 2.49717 16.5543C2.80917 16.3829 2.92312 15.991 2.75172 15.679C2.58032 15.3671 2.18857 15.2531 1.87649 15.4245C1.02046 15.8948 0 16.6951 0 17.8372C0 18.7126 0.602078 19.9608 3.47024 20.9352C5.49115 21.6218 8.16527 21.9999 11 21.9999C13.8347 21.9999 16.5089 21.6218 18.5298 20.9352C21.3979 19.9608 22 18.7126 22 17.8372C22 16.6951 20.9795 15.8948 20.1235 15.4245Z"
                    fill="black"
                  />
                  <path
                    d="M6.13305 18.7832C7.44145 19.1528 9.16961 19.3564 10.9992 19.3564C12.8287 19.3564 14.5569 19.1529 15.8653 18.7832C17.466 18.3311 18.2777 17.6765 18.2777 16.8378C18.2777 15.9991 17.466 15.3446 15.8653 14.8924C15.51 14.7921 15.1235 14.704 14.7126 14.6289C14.4895 15.0144 14.2557 15.4112 14.0112 15.8195C14.466 15.8877 14.893 15.9714 15.2808 16.0702C16.4588 16.3702 16.8892 16.708 16.9776 16.8378C16.8891 16.9677 16.4588 17.3055 15.2808 17.6055C14.1658 17.8895 12.7312 18.0515 11.2203 18.066C11.1472 18.0714 11.0734 18.0744 10.9992 18.0744C10.9249 18.0744 10.8512 18.0714 10.778 18.066C9.26707 18.0515 7.83251 17.8895 6.71752 17.6055C5.53948 17.3055 5.10915 16.9677 5.02068 16.8378C5.10915 16.708 5.53953 16.3702 6.71756 16.0702C7.10531 15.9714 7.53229 15.8877 7.98711 15.8195C7.74266 15.4113 7.50887 15.0144 7.28573 14.6289C6.87487 14.7041 6.48836 14.7921 6.13305 14.8924C4.53234 15.3446 3.7207 15.9991 3.7207 16.8378C3.7207 17.6765 4.53234 18.331 6.13305 18.7832Z"
                    fill="black"
                  />
                  <path
                    d="M10.9994 16.7851C11.5731 16.7851 12.0943 16.4927 12.3936 16.003C14.4909 12.5716 16.9909 8.04934 16.9909 5.99152C16.9909 2.68778 14.3032 0 10.9994 0C7.69559 0 5.00781 2.68778 5.00781 5.99152C5.00781 8.04934 7.50786 12.5716 9.60513 16.003C9.90445 16.4927 10.4257 16.7851 10.9994 16.7851ZM8.59111 5.58014C8.59111 4.25227 9.67147 3.17195 10.9994 3.17195C12.3273 3.17195 13.4076 4.25227 13.4076 5.58014C13.4076 6.90804 12.3273 7.98837 10.9994 7.98837C9.67147 7.98837 8.59111 6.90809 8.59111 5.58014Z"
                    fill="black"
                  />
                </svg>
                <span className="text-xl">Set a Ship From Location</span>
              </div>

              {/* <ShipLocationsDialog
              open={showFormOpen}
              handleClose={handleShowFormClose}
              handleAddLocation={handleAddLocation}
              onFromChange={onFromChange}
            /> */}
              <div
                className=" cursor-pointer text-baseColor"
                onClick={handleSetFromClick}
              >
                Add another location
              </div>
            </div>
            <div className="overflow-auto h-[180px]">
              {fromLocations?.map((location, index) => {
                return (
                  <div key={index} className="flex ml-4 mb-8 items-center">
                    <svg
                      className="mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="#77BC3F"
                    >
                      <path
                        d="M20.1235 15.4245C19.8114 15.2531 19.4196 15.3671 19.2483 15.6791C19.0769 15.9911 19.1908 16.3829 19.5028 16.5543C20.2706 16.9761 20.7109 17.4437 20.7109 17.8372C20.7109 18.3185 20.029 19.0644 18.1151 19.7146C16.2242 20.3571 13.6974 20.7109 11 20.7109C8.30264 20.7109 5.77577 20.3571 3.88493 19.7146C1.97098 19.0644 1.28906 18.3185 1.28906 17.8372C1.28906 17.4437 1.72941 16.9761 2.49717 16.5543C2.80917 16.3829 2.92312 15.991 2.75172 15.679C2.58032 15.3671 2.18857 15.2531 1.87649 15.4245C1.02046 15.8948 0 16.6951 0 17.8372C0 18.7126 0.602078 19.9608 3.47024 20.9352C5.49115 21.6218 8.16527 21.9999 11 21.9999C13.8347 21.9999 16.5089 21.6218 18.5298 20.9352C21.3979 19.9608 22 18.7126 22 17.8372C22 16.6951 20.9795 15.8948 20.1235 15.4245Z"
                        fill="#77BC3F"
                      />
                      <path
                        d="M6.13305 18.7832C7.44145 19.1528 9.16961 19.3564 10.9992 19.3564C12.8287 19.3564 14.5569 19.1529 15.8653 18.7832C17.466 18.3311 18.2777 17.6765 18.2777 16.8378C18.2777 15.9991 17.466 15.3446 15.8653 14.8924C15.51 14.7921 15.1235 14.704 14.7126 14.6289C14.4895 15.0144 14.2557 15.4112 14.0112 15.8195C14.466 15.8877 14.893 15.9714 15.2808 16.0702C16.4588 16.3702 16.8892 16.708 16.9776 16.8378C16.8891 16.9677 16.4588 17.3055 15.2808 17.6055C14.1658 17.8895 12.7312 18.0515 11.2203 18.066C11.1472 18.0714 11.0734 18.0744 10.9992 18.0744C10.9249 18.0744 10.8512 18.0714 10.778 18.066C9.26707 18.0515 7.83251 17.8895 6.71752 17.6055C5.53948 17.3055 5.10915 16.9677 5.02068 16.8378C5.10915 16.708 5.53953 16.3702 6.71756 16.0702C7.10531 15.9714 7.53229 15.8877 7.98711 15.8195C7.74266 15.4113 7.50887 15.0144 7.28573 14.6289C6.87487 14.7041 6.48836 14.7921 6.13305 14.8924C4.53234 15.3446 3.7207 15.9991 3.7207 16.8378C3.7207 17.6765 4.53234 18.331 6.13305 18.7832Z"
                        fill="#77BC3F"
                      />
                      <path
                        d="M10.9994 16.7851C11.5731 16.7851 12.0943 16.4927 12.3936 16.003C14.4909 12.5716 16.9909 8.04934 16.9909 5.99152C16.9909 2.68778 14.3032 0 10.9994 0C7.69559 0 5.00781 2.68778 5.00781 5.99152C5.00781 8.04934 7.50786 12.5716 9.60513 16.003C9.90445 16.4927 10.4257 16.7851 10.9994 16.7851ZM8.59111 5.58014C8.59111 4.25227 9.67147 3.17195 10.9994 3.17195C12.3273 3.17195 13.4076 4.25227 13.4076 5.58014C13.4076 6.90804 12.3273 7.98837 10.9994 7.98837C9.67147 7.98837 8.59111 6.90809 8.59111 5.58014Z"
                        fill="#77BC3F"
                      />
                    </svg>
                    <span>
                      {location.locationName +
                        "," +
                        location.address +
                        ", " +
                        location.city +
                        ", " +
                        location.stateCode +
                        ", " +
                        location.postalCode}
                    </span>
                    <span
                      className="inline-block text-red-500 px-4 py-2 rounded hover:text-red-600 cursor-pointer"
                      key={location.id}
                      onClick={() => handleDeleteLocation(location.id)}
                    >
                      Delete
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="p-2 items-center justify-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Onboard;
