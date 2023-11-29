import React, { PropsWithChildren } from "react";
import { formatDate, formatTime, serviceCodes } from "../ship.component";
import { getDescriptionFromSurchargeCode } from "../../../../../constant/upssurchargecode";
import { Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Label, MoreHoriz, Refresh } from "@mui/icons-material";
import { RootState } from "../../../../../redux/store";
import { useSelector } from "react-redux";
const TotalCharges: React.FC<
  PropsWithChildren<{
    hovered: boolean;
    formData: any;
    createLabel: () => void;
    refreshRate: () => void;
  }>
> = ({ hovered, formData, createLabel, refreshRate }) => {
  const [chargeOpened, setChargeOpened] = useState(false);
  const handleChargeOpenedClicked = () => {
    setChargeOpened(!chargeOpened);
  };
  const apiStatus = useSelector(
    (state: RootState) => state.authReducer.apiStatus
  );

  return (
    <div className="w-full">
      <div className="flex w-full h-16 gap-4 bg-[#77BC3F] text-white items-center duration-300 z-[1200]">
        <img
          src="/ups.svg"
          alt="ups"
          style={{ height: "30px", width: "30px" }}
          className="h-8 ml-2"
        />
        <div className="items-start">
          <Typography fontSize={12}>
            {`${
              formData?.NegotiatedRateCharges?.TotalCharge?.CurrencyCode || ""
            } $${(
              parseFloat(
                formData?.NegotiatedRateCharges?.TotalCharge?.MonetaryValue || 0
              ) + parseFloat(formData?.TaxCharges?.MonetaryValue || 0)
            ).toFixed(2)}`}
          </Typography>
          <Typography fontSize={12}>
            {formatDate(
              formData?.TimeInTransit?.ServiceSummary?.EstimatedArrival?.Arrival
                .Date
            )}
          </Typography>
          <Typography fontSize={12}>
            {formatTime(
              formData?.TimeInTransit?.ServiceSummary?.EstimatedArrival.Arrival
                .Time
            )}
          </Typography>
        </div>
        {/* <Button
          sx={{
            backgroundColor: "#017BFB",
            color: "#FFFFFF",
            width: "120px",
            height: "35px",
            marginRight: "10px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#123456",
            },
          }}
          variant="outlined"
          onClick={createLabel}
        >
          Create Label
        </Button> */}
        {apiStatus == "Awaiting Fulfillment" && (
          <IconButton aria-label="back" size="small" onClick={createLabel}>
            <div className="flex flex-col items-center ">
              <Label fontSize="small" className="text-white" />
              <span className="text-white font-sans text-[12px]">Label</span>
            </div>
          </IconButton>
        )}

        <IconButton aria-label="back" size="small" onClick={refreshRate}>
          <div className="flex flex-col items-center ">
            <Refresh fontSize="small" className="text-white" />
            <span className="text-white font-sans text-[12px]">Refresh</span>
          </div>
        </IconButton>
        {/* <div className="bg-[#4473C5]  shadow-lg hover:shadow-xl rounded-full p-2"> */}
        <IconButton
          aria-label="back"
          size="small"
          onClick={handleChargeOpenedClicked}
        >
          <div className="flex flex-col items-center ">
            <MoreHoriz fontSize="small" className="text-[#EEEEEE]" />
            <span className="text-white font-sans text-[12px]">Details</span>
          </div>
        </IconButton>
        {/* </div> */}
      </div>
      {chargeOpened ? (
        <div
          className={
            "grid grid-cols-1 w-full gap-4 bg-[#FFC02B] text-black duration-300 z-[1200]"
          }
        >
          <div className="flex flex-col m-2">
            <div className="flex">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="32px"
                width="32px"
                className="-mt-1"
              >
                <path d="M20 3H4a2 2 0 00-2 2v2a2 2 0 001 1.72V19a2 2 0 002 2h14a2 2 0 002-2V8.72A2 2 0 0022 7V5a2 2 0 00-2-2zM4 5h16v2H4zm1 14V9h14v10z" />
                <path d="M8 11h8v2H8z" />
              </svg>
              <div className="flex flex-col ml-4">
                <label className="text-xl ">
                  {formData?.TaxCharges
                    ? "Total (with taxes and discount):"
                    : "Total (with discount)"}{" "}
                  {`${(
                    parseFloat(
                      formData?.NegotiatedRateCharges?.TotalCharge
                        ?.MonetaryValue || 0
                    ) + parseFloat(formData?.TaxCharges?.MonetaryValue || 0)
                  ).toFixed(2)} ${
                    formData?.NegotiatedRateCharges?.TotalCharge
                      ?.CurrencyCode || ""
                  }`}
                </label>
                <label className="text-ms">
                  Published Charges:{" "}
                  {formData?.TaxCharges
                    ? `${
                        formData?.TotalChargesWithTaxes?.MonetaryValue || ""
                      } ${formData?.TotalChargesWithTaxes?.CurrencyCode || ""}`
                    : `${formData?.TotalCharges?.MonetaryValue || ""} ${
                        formData?.TotalCharges?.CurrencyCode || ""
                      }`}
                </label>
              </div>
            </div>
            <label className="text-sm mt-4">
              <b>Shipping Fees</b>
            </label>
            <table className="mt-4 text-sm">
              <tbody>
                <tr>
                  <td
                    style={{ borderBottom: "1px solid black", padding: "8px" }}
                  >
                    {serviceCodes.find(
                      (item) => item.key === formData?.Service?.Code
                    )?.text || "No UPS Service is selected"}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      padding: "8px",
                      textAlign: "right",
                    }}
                  >
                    {`${formData?.BaseServiceCharge?.MonetaryValue || ""} ${
                      formData?.BaseServiceCharge?.CurrencyCode || ""
                    }`}
                  </td>
                </tr>
                {Array.isArray(formData?.ItemizedCharges)
                  ? formData.ItemizedCharges.map((item: any, index: number) => (
                      <tr key={index}>
                        <td
                          style={{
                            borderBottom: "1px solid black",
                            padding: "8px",
                          }}
                        >
                          {getDescriptionFromSurchargeCode(item.Code)}
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid black",
                            padding: "8px",
                            textAlign: "right",
                          }}
                        >
                          {`${item.MonetaryValue || ""} ${
                            item.CurrencyCode || ""
                          }`}
                        </td>
                      </tr>
                    ))
                  : formData?.ItemizedCharges?.MonetaryValue &&
                    formData?.ItemizedCharges?.MonetaryValue != "0.00" && (
                      <tr>
                        <td
                          style={{
                            borderBottom: "1px solid black",
                            padding: "8px",
                          }}
                        >
                          {getDescriptionFromSurchargeCode(
                            formData?.ItemizedCharges?.Code
                          )}
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid black",
                            padding: "8px",
                            textAlign: "right",
                          }}
                        >
                          {`${formData?.ItemizedCharges?.MonetaryValue || ""} ${
                            formData?.ItemizedCharges?.CurrencyCode || ""
                          }`}
                        </td>
                      </tr>
                    )}
                {Array.isArray(formData?.RatedPackage?.ItemizedCharges)
                  ? formData?.RatedPackage?.ItemizedCharges.map(
                      (item: any, index: number) => {
                        if (item.MonetaryValue === "0.00") {
                          return null; // Skip rendering the row
                        }
                        return (
                          <tr key={index}>
                            <td
                              style={{
                                borderBottom: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {getDescriptionFromSurchargeCode(item.Code)}
                            </td>
                            <td
                              style={{
                                borderBottom: "1px solid black",
                                padding: "8px",
                                textAlign: "right",
                              }}
                            >
                              {`${item.MonetaryValue || ""} ${
                                item.CurrencyCode || ""
                              }`}
                            </td>
                          </tr>
                        );
                      }
                    )
                  : // Render the row only if MonetaryValue is not "0.00"
                    formData?.RatedPackage?.ItemizedCharges?.MonetaryValue !==
                      "0.00" &&
                    formData?.RatedPackage?.ItemizedCharges?.MonetaryValue && (
                      <tr>
                        <td
                          style={{
                            borderBottom: "1px solid black",
                            padding: "8px",
                          }}
                        >
                          {getDescriptionFromSurchargeCode(
                            formData?.RatedPackage?.ItemizedCharges?.Code
                          )}
                        </td>
                        <td
                          style={{
                            borderBottom: "1px solid black",
                            padding: "8px",
                            textAlign: "right",
                          }}
                        >
                          {`${
                            formData?.RatedPackage?.ItemizedCharges
                              ?.MonetaryValue || ""
                          } ${
                            formData?.RatedPackage?.ItemizedCharges
                              ?.CurrencyCode || ""
                          }`}
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
            {Array.isArray(formData?.RatedShipmentAlert) && (
              <label className="mt-4 text-sm">
                {formData?.RatedShipmentAlert.map((item: any) => (
                  <div key={item.Description}>{item.Description}</div>
                ))}
              </label>
            )}
          </div>

          <div className="flex flex-col m-2 text-sm ">
            <label className="text-ms">
              <b>Sub Totals</b>
            </label>

            <table className="mt-4">
              <tbody>
                <tr>
                  <td
                    style={{ borderBottom: "1px solid black", padding: "8px" }}
                  >
                    Shipping Fees
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      padding: "8px",
                      textAlign: "right",
                    }}
                  >
                    {`${formData?.TotalCharges?.MonetaryValue || ""} ${
                      formData?.TotalCharges?.CurrencyCode || ""
                    }`}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ borderBottom: "1px solid black", padding: "8px" }}
                  >
                    Contract Rate
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      padding: "8px",
                      textAlign: "right",
                    }}
                  >
                    {`${
                      formData?.NegotiatedRateCharges?.TotalCharge
                        ?.MonetaryValue || ""
                    } ${
                      formData?.NegotiatedRateCharges?.TotalCharge
                        ?.CurrencyCode || ""
                    }`}
                  </td>
                </tr>

                {formData?.TaxCharges && (
                  <tr>
                    <td
                      style={{
                        borderBottom: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {formData?.TaxCharges?.Type}
                    </td>
                    <td
                      style={{
                        borderBottom: "1px solid black",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      {`${formData?.TaxCharges?.MonetaryValue || ""} ${
                        formData?.TotalCharges?.CurrencyCode || ""
                      }`}
                    </td>
                  </tr>
                )}

                <tr>
                  <td
                    style={{ borderBottom: "1px solid black", padding: "8px" }}
                  >
                    {formData?.TaxCharges
                      ? "Total (with taxes and discount)"
                      : "Total (with discount)"}
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      padding: "8px",
                      textAlign: "right",
                    }}
                  >
                    {`${(
                      parseFloat(
                        formData?.NegotiatedRateCharges?.TotalCharge
                          ?.MonetaryValue || 0
                      ) + parseFloat(formData?.TaxCharges?.MonetaryValue || 0)
                    ).toFixed(2)}`}{" "}
                    {`${
                      formData?.NegotiatedRateCharges?.TotalCharge
                        ?.CurrencyCode ?? ""
                    }`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TotalCharges;
