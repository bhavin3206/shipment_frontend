import React, { PropsWithChildren } from "react";
import { RateData } from "../ship.rateDialog";
import { serviceCodes } from "../../ship.component";

const RatesForm: React.FC<
  PropsWithChildren<{
    rateData: Array<RateData>;
  }>
> = (rateData) => {
  return (
    <div className="flex flex-col flex-grow ">
      <div className="h-10 flex items-center justify-end pr-2 bg-gray-100">
        Estimated Rates
      </div>
      <div className="flex flex-col h-12 p-4   bg-gray-50 border border-gray-100">
        {rateData.rateData.map((item: RateData, key: number) => (
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">
              {
                serviceCodes.find(
                  (serviceCode) => serviceCode.key === item.serviceName
                )?.text
              }
            </div>
            <div className="text-baseColor">
              {item.value + " " + item.currency_code}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatesForm;
