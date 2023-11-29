import React, { PropsWithChildren, useMemo, useState } from "react";
import { FromLocationData } from "./dialog.component";
import { countryCodeEmoji, emojiCountryCode } from "country-code-emoji";
import ReactCountryFlag from "react-country-flag";
import countryList from "react-select-country-list";
import timezones from "../../../../../constant/timezones";
const FromAddress: React.FC<
  PropsWithChildren<{
    formData: FromLocationData | undefined;
    onChange: (p: FromLocationData) => void;
  }>
> = ({ formData, onChange }) => {
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formData)
      onChange({ ...formData, [event.target.name]: event.target.value });
  };
  const handleResidentialChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (formData) onChange({ ...formData, residential: event.target.checked });
  };
  const options = useMemo(() => countryList().getData(), []);
  const handleTimeZone = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (formData) onChange({ ...formData, timezone: event.target.value });
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (formData) onChange({ ...formData, countryCode: event.target.value });
  };
  return (
    <div className="w-1/2">
      <div className="flex flex-col">
        <label
          className="text-sm font-medium mb-1 mt-4"
          htmlFor="Location Name"
          placeholder="Location Name"
        >
          Location Name
        </label>
        <input
          id="locationName"
          name="locationName"
          type="text"
          className="border border-gray-400 rounded-md py-2 px-3 text-sm "
          value={formData?.locationName}
          onChange={handleLabelChange}
        />
      </div>
      <div className="font-bold"> Pickup Address</div>
      <div className="flex pr-2 mt-2">
        <input
          id="residential"
          type="checkbox"
          name="residentialAddress"
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          checked={formData?.residential}
          onChange={handleResidentialChange}
        />
        <label
          htmlFor="residential"
          className="ml-2 block text-sm text-gray-900"
        >
          Residential Address
        </label>
      </div>
      <div className="flex flex-col">
        <label
          className="text-sm font-medium mb-1  pt-2"
          htmlFor="Full Name"
          placeholder="Full Name"
        >
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          className="border border-gray-400 rounded-md py-2 px-3 text-sm "
          value={formData?.fullName}
          onChange={handleLabelChange}
        />
      </div>
      <div className="flex flex-col">
        <label
          className="text-sm font-medium mb-1  pt-2"
          htmlFor="Company Name"
          placeholder="Company Name"
        >
          Company
        </label>
        <input
          id="attentionName"
          name="attentionName"
          type="text"
          className="border border-gray-400 rounded-md py-2 px-3 text-sm "
          value={formData?.attentionName}
          onChange={handleLabelChange}
        />
      </div>
      <div className="flex pt-2">
        <ReactCountryFlag
          className="mr-1 border border-gray-200 shadow-md rounded-md"
          style={{ width: "32px", height: "32px" }}
          countryCode={formData?.countryCode ? formData?.countryCode : ""}
          svg
          cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
          cdnSuffix="svg"
          title={formData?.countryCode ? formData?.countryCode : ""}
        />
        <select
          value={formData?.countryCode}
          // size="small"
          name="shipfrom_countrycode"
          onChange={handleCountryChange}
          className="w-full border border-gray-400 rounded-md"
          // sx={{
          //   fontSize: "14px",
          // }}
        >
          {options.map((country) => (
            <option
              id={country.value}
              key={country.value}
              value={country.value}
              // sx={{
              //   fontSize: "14px",
              // }}
            >
              {"(" + countryCodeEmoji(country.value) + ") " + country.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label
          className="text-sm font-medium mb-1  pt-2"
          htmlFor="Address"
          placeholder="Address"
        >
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          className="border border-gray-400 rounded-md py-2 px-3 text-sm mb-1 "
          value={formData?.address}
          onChange={handleLabelChange}
        />
      </div>
      <div className="flex flex-col">
        <input
          id="address1"
          name="address1"
          type="text"
          className="border border-gray-400 rounded-md py-2 px-3 text-sm "
          value={formData?.address1}
          onChange={handleLabelChange}
        />
      </div>
      <div className="flex gap-2 align-center justify-between">
        <div className="flex flex-col">
          <label
            className="text-sm font-medium mb-1 pt-2"
            htmlFor="City"
            placeholder="City"
          >
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            className="w-52 border border-gray-400 rounded-md py-2 px-3 text-sm mb-1"
            value={formData?.city}
            onChange={handleLabelChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-sm font-medium mb-1 pt-2"
            htmlFor="StateCode"
            placeholder="StateCode"
          >
            State
          </label>
          <input
            id="state"
            name="stateCode"
            type="text"
            className="w-12 border border-gray-400 rounded-md py-2 px-3 text-sm mb-1"
            value={formData?.stateCode}
            onChange={handleLabelChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="text-sm font-medium mb-1 pt-2"
            htmlFor="Postal Code"
            placeholder="Postal Code"
          >
            Postal Code
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            className="w-32 border border-gray-400 rounded-md py-2 px-3 text-sm mb-1"
            value={formData?.postalCode}
            onChange={handleLabelChange}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label
          className="text-sm font-medium mb-1 pt-2"
          htmlFor="Phone"
          placeholder="Phone"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          className="border border-gray-400 rounded-md py-2 px-3 text-sm mb-1"
          value={formData?.phone}
          onChange={handleLabelChange}
        />
      </div>
      <div className="flex flex-col">
        <label
          className="text-sm font-medium mb-1 pt-2"
          htmlFor="Email"
          placeholder="Email"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          className="border border-gray-400 rounded-md py-2 px-3 text-sm mb-1"
          value={formData?.email}
          onChange={handleLabelChange}
        />
      </div>
      <div className="flex flex-col">
        <label
          className="text-sm font-medium mb-1"
          htmlFor="timezoneLabel"
          placeholder="TimeZone"
        >
          Time Zone
        </label>
        <select
          id="timezoneSelect"
          name="timezoneSelect"
          className="border border-gray-400 rounded-md  px-3 h-10 w-full"
          onChange={handleTimeZone}
          value={formData?.timezone}
        >
          {timezones.map((item, index) => (
            <option value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FromAddress;
