import React, { PropsWithChildren } from "react";
import RateDialog from "./ship.rateDialog";
import { ShipLocation } from "../../../../../pages/onboard.page";
import { ShipmentData } from "../ship.component";
import { TableDatatype } from "../../ordertable.component";

const ShipRateBrowser: React.FC<
  PropsWithChildren<{
    showDialog: boolean;
    orderData: TableDatatype | undefined;
    shipData: ShipmentData;
    fromLocations: any[];
    services: string[];
    onClose: () => void;
  }>
> = ({ showDialog, orderData, shipData, fromLocations, onClose, services }) => {
  return (
    <RateDialog
      showDialog={showDialog}
      orderData={orderData}
      shipData={shipData}
      services={services}
      fromLocations={fromLocations}
      onClose={onClose}
    />
  );
};

export default ShipRateBrowser;
