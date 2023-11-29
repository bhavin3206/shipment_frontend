import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import RatesForm from "./forms/rates.form";
import ConfigureRateForm from "./forms/configureRate.form";
import UpsAccountsForm from "./forms/upsAccount.form";
import upsService from "../../../../../services/ups.service";
import ToastService from "../../../../toast/toast.component";
import { TableDatatype } from "../../ordertable.component";
import { ShipmentData, serviceCodes } from "../ship.component";
export interface RateData {
  serviceName: string;
  value: string;
  currency_code: string;
}
export interface ConfigureRateFormData {
  fromLocation: string;
  fromLocations: any[];
  weight: number;
  confirmation: string;
  serviceCode: string;
  shipData: ShipmentData;
  orderData: TableDatatype | undefined;
  services: string[];
}
const RateDialog: React.FC<
  PropsWithChildren<{
    showDialog: boolean;
    services: string[];
    orderData: TableDatatype | undefined;
    shipData: ShipmentData;
    fromLocations: any[];
    onClose: () => void;
  }>
> = ({ showDialog, orderData, shipData, fromLocations, onClose, services }) => {
  const [rateData, setRateData] = useState(Array<RateData>);
  const [configureRateData, setConfigureRateData] = useState({
    fromLocation: "",
    fromLocations: [] as any,
    weight: 0,
    confirmation: "",
    serviceCode: "00",
    shipData: {} as ShipmentData,
    orderData: {} as TableDatatype,
    services: [] as any,
  } as ConfigureRateFormData);
  const [accountNumber, setAccountNumber] = useState("");
  const handleBrowseRates = () => {
    let rateServices: Array<string> = [];
    const updatedShipData = {
      ...shipData,
      shipfrom_location: configureRateData.fromLocation,
    };
    if (configureRateData.serviceCode == "00") {
      rateServices = services;
    } else {
      rateServices.push(configureRateData.serviceCode);
    }
    console.log(updatedShipData);
    upsService
      .getOrderRates(
        updatedShipData,
        accountNumber,
        rateServices,
        configureRateData.weight,
        configureRateData.confirmation
      )
      .then((data) => {
        if (data.result == "success") {
          ToastService.showToast("success", "Rate success");
          setRateData(data.data);
        } else if (data.result == "failed") {
          ToastService.showToast("failed", data.data);
        }
      })
      .catch((error) => {
        ToastService.showToast("failed", error.response.data.data);
        console.log(error);
      });
  };
  const handleConfigureChange = (p: ConfigureRateFormData) => {
    setConfigureRateData(p);
  };
  const handleAccountChange = (p: string) => {
    setAccountNumber(p);
  };
  useEffect(() => {
    // console.log(orderData);
    setConfigureRateData({
      fromLocation: fromLocations[0]?.locationName as string,
      fromLocations: fromLocations,
      serviceCode: "00",
      weight: 0,
      confirmation: "",
      shipData: shipData,
      orderData: orderData,
      services: services,
    } as ConfigureRateFormData);
  }, [shipData, orderData]);
  return (
    <div>
      <ToastService.MyToastContainer />
      <Dialog
        open={showDialog}
        onClose={onClose}
        fullWidth={true}
        maxWidth="md"
        sx={{
          "& .MuiDialogTitle-root": {
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.3)",
          },
          "& .MuiDialogActions-root": {
            boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <DialogTitle>Rating Browser</DialogTitle>
        <DialogContent className="p-0">
          <Grid container columns={24} rowSpacing={2}>
            <Grid item xs={24} sm={24} md={9}>
              <ConfigureRateForm
                formData={configureRateData}
                onChange={handleConfigureChange}
              />
            </Grid>
            <Grid item xs={24} sm={24} md={6}>
              <UpsAccountsForm
                accountNumber={accountNumber}
                onChange={handleAccountChange}
              />
            </Grid>
            <Grid item xs={24} sm={24} md={9}>
              <RatesForm rateData={rateData as Array<RateData>} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBrowseRates}>Browse Rates</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RateDialog;
