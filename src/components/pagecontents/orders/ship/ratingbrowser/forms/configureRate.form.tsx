import React, { PropsWithChildren, useState } from "react";
import { ConfigureRateFormData } from "../ship.rateDialog";
import { serviceCodes } from "../../ship.component";

const ConfigureRateForm: React.FC<
  PropsWithChildren<{
    formData: ConfigureRateFormData;
    onChange: (p: ConfigureRateFormData) => void;
  }>
> = ({ formData, onChange }) => {
  const [residential, setResidential] = useState(false);
  const handleShipFromChange = (event: any) => {
    const updatedFormData = { ...formData, fromLocation: event.target.value };
    onChange(updatedFormData);
    const curLocation = formData.fromLocations.find(
      (location) => location.locationName == event.target.value
    );
    setResidential(curLocation.residential);
  };
  const handleWeightChange = (event: any) => {
    const updatedFormData = { ...formData, weight: event.target.value };
    onChange(updatedFormData);
  };
  const handleConfirmationChange = (event: any) => {
    const updatedFormData = { ...formData, confirmation: event.target.value };
    onChange(updatedFormData);
  };
  const handleServiceChange = (event: any) => {
    const updatedFormData = { ...formData, serviceCode: event.target.value };
    onChange(updatedFormData);
  };
  return (
    <div className="flex flex-col p-4 mt-4">
      <div className="text-xl">Configure Rates</div>
      <hr className="border-gray-400 my-2" />
      <label className="text-lg font-bold">Ship From</label>
      <div>
        <select
          id="shipFromSelect"
          className="border border-gray-400 rounded-md  px-3 h-10 w-full"
          onChange={handleShipFromChange}
          value={formData.fromLocation}
        >
          {formData.fromLocations.map((item, index) => (
            <option value={item.locationName} key={index}>
              {item.locationName}
            </option>
          ))}
        </select>
      </div>
      <div className="text-lg font-bold">Ship To</div>
      <div className="flex flex-col">
        <label
          className="text-sm font-medium mb-1"
          htmlFor="shipToCountry"
          placeholder="Country"
        >
          Country
        </label>
        <select
          id="shipToCountry"
          className="border border-gray-400 rounded-md  px-3 h-10 w-full"
          disabled
        >
          <option value={formData.orderData?.country_iso2}>
            {formData.orderData?.country}
          </option>
        </select>
        <label
          className="text-sm font-medium mb-1"
          htmlFor="toCity"
          placeholder="City"
        >
          City
        </label>
        <input
          id="toCity"
          type="text"
          className="border border-gray-400 rounded-md py-2 px-3"
          disabled
          value={formData.orderData?.city}
        />

        <label
          className="text-sm font-medium mb-1"
          htmlFor="postalCode"
          placeholder="PostalCode"
        >
          Postal Code
        </label>
        <input
          id="taxes"
          type="text"
          className="border border-gray-400 rounded-md py-2 px-3"
          disabled
          value={formData.orderData?.zip}
        />
        <div className="flex pr-2 mt-2">
          <input
            id="checkbox"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            checked={residential}
            disabled
          />
          <label
            htmlFor="checkbox"
            className="ml-2 block text-sm text-gray-900"
          >
            Residential Address
          </label>
        </div>
      </div>
      <div className="text-lg font-bold">Ship Information</div>
      <div className="flex flex-col">
        <label
          className="text-sm font-medium mb-1"
          htmlFor="weight"
          placeholder="weight"
        >
          Weight
        </label>
        <div className="flex justify-center items-center">
          <input
            id="rate"
            type="number"
            onChange={handleWeightChange}
            className="border w-full  border-gray-400 rounded-md px-3 py-2"
          />
          <label>(lbs)</label>
        </div>
        <label
          className="text-sm font-medium mb-1"
          htmlFor="confirmationLabel"
          placeholder="Country"
        >
          Confirmation
        </label>
        <select
          id="confirmationSelect"
          className="border border-gray-400 rounded-md  px-3 h-10 w-full"
          onChange={handleConfirmationChange}
        >
          <option value="00">No Confirmation</option>
          <option value="delivery">Delivery</option>
          <option value="signature">Signature</option>
          <option value="adultSignature">Adult Signature</option>
          <option value="verbal">Verbal</option>
        </select>
        <label
          className="text-sm font-medium mb-1"
          htmlFor="serviceClassLabel"
          placeholder="Country"
        >
          Service Class
        </label>
        <select
          id="serviceSelect"
          className="border border-gray-400 rounded-md  px-3 h-10 w-full"
          onChange={handleServiceChange}
          value={formData.serviceCode}
        >
          <option value="00">All Services</option>

          {serviceCodes.map((item, index) =>
            formData.services.includes(item.key) ? (
              <option key={item.key} value={item.key}>
                {item.text}
              </option>
            ) : null
          )}
        </select>
      </div>
    </div>
  );
};

export default ConfigureRateForm;
