import React, { PropsWithChildren, useMemo } from "react";
import { FromLocationData } from "./dialog.component";
import ReactCountryFlag from "react-country-flag";
import { countryCodeEmoji, emojiCountryCode } from "country-code-emoji";
import countryList from "react-select-country-list";
import timezones from "../../../../../constant/timezones";
const ReturnAddress: React.FC<
  PropsWithChildren<{
    formData: FromLocationData | undefined;
    onChange: (p: FromLocationData) => void;
  }>
> = ({ formData, onChange }) => {
  const options = useMemo(() => countryList().getData(), []);
  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formData)
      onChange({ ...formData, [event.target.name]: event.target.value });
  };
  const handleTimeZone = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (formData) onChange({ ...formData, returnTimezone: event.target.value });
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (formData)
      onChange({ ...formData, returnCountryCode: event.target.value });
  };
  const handleDefaultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) onChange({ ...formData, selected: event.target.checked });
  };
  const handlePickupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formData)
      onChange({ ...formData, pickupAddress: event.target.checked });
    console.log(event.target.checked);
  };
  return (
    <div className="w-1/2">
      <div className="flex pr-2 mt-4">
        <input
          id="defaultChange"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          name="selected"
          onChange={handleDefaultChange}
          checked={formData?.selected}
        />
        <label
          htmlFor="defaultChange"
          className="ml-2 mb-10 block text-sm text-gray-900 "
        >
          Use as my default location
        </label>
      </div>
      <div className="font-bold"> Return Address</div>
      <div className="flex pr-2 mt-2">
        <input
          id="pickupAddress"
          name="pickupAddress"
          type="checkbox"
          checked={formData?.pickupAddress}
          onChange={handlePickupChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label
          htmlFor="pickupAddress"
          className="ml-2 block text-sm text-gray-900"
        >
          Use Pickup Address as Return Address
        </label>
      </div>
      {!formData?.pickupAddress && (
        <div>
          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1  pt-2"
              htmlFor="returnFullName"
              placeholder="Full Name"
            >
              Full Name
            </label>
            <input
              id="returnFullName"
              name="returnFullName"
              type="text"
              className="border border-gray-400 rounded-md py-2 px-3 text-sm "
              onChange={handleLabelChange}
              value={formData?.returnFullName}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1  pt-2"
              htmlFor="returnAttentionName"
              placeholder="Company Name"
            >
              Company
            </label>
            <input
              id="returnAttentionName"
              name="returnAttentionName"
              type="text"
              className="border border-gray-400 rounded-md py-2 px-3 text-sm "
              onChange={handleLabelChange}
              value={formData?.returnAttentionName}
            />
          </div>
          <div className="flex pt-2">
            <ReactCountryFlag
              className="mr-1 border border-gray-200 shadow-md rounded-md"
              style={{ width: "32px", height: "32px" }}
              countryCode={
                formData?.returnCountryCode ? formData?.returnCountryCode : ""
              }
              svg
              cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
              cdnSuffix="svg"
              title={
                formData?.returnCountryCode ? formData?.returnCountryCode : ""
              }
            />
            <select
              value={formData?.returnCountryCode}
              // size="small"
              name="returnCountryCode"
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
              htmlFor="returnAddress"
              placeholder="Address"
            >
              Address
            </label>
            <input
              id="returnAddress"
              name="returnAddress"
              type="text"
              className="border border-gray-400 rounded-md py-2 px-3 text-sm mb-1 "
              value={formData?.returnAddress}
              onChange={handleLabelChange}
            />
          </div>
          <div className="flex flex-col">
            <input
              id="returnAddress1"
              name="returnAddress1"
              type="text"
              className="border border-gray-400 rounded-md py-2 px-3 text-sm "
              value={formData?.returnAddress1}
              onChange={handleLabelChange}
            />
          </div>
          <div className="flex gap-2 align-center justify-between">
            <div className="flex flex-col">
              <label
                className="text-sm font-medium mb-1 pt-2"
                htmlFor="returnCity"
                placeholder="City"
              >
                City
              </label>
              <input
                id="returnCity"
                name="returnCity"
                type="text"
                className="w-52 border border-gray-400 rounded-md py-2 px-3 text-sm mb-1"
                value={formData?.returnCity}
                onChange={handleLabelChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-sm font-medium mb-1 pt-2"
                htmlFor="returnStateCode"
                placeholder="StateCode"
              >
                State
              </label>
              <input
                id="returnStateCode"
                name="returnStateCode"
                type="text"
                className="w-12 border border-gray-400 rounded-md py-2 px-3 text-sm mb-1"
                value={formData?.returnStateCode}
                onChange={handleLabelChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-sm font-medium mb-1 pt-2"
                htmlFor="returnPostalCode"
                placeholder="Postal Code"
              >
                Postal Code
              </label>
              <input
                id="returnPostalCode"
                name="returnPostalCode"
                type="text"
                className="w-32 border border-gray-400 rounded-md py-2 px-3 text-sm mb-1"
                value={formData?.returnPostalCode}
                onChange={handleLabelChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1 pt-2"
              htmlFor="returnPhone"
              placeholder="Phone"
            >
              Phone
            </label>
            <input
              id="returnPhone"
              name="returnPhone"
              type="text"
              className="border border-gray-400 rounded-md py-2 px-3 text-sm mb-1"
              value={formData?.returnPhone}
              onChange={handleLabelChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1 pt-2"
              htmlFor="returnEmail"
              placeholder="Email"
            >
              Email
            </label>
            <input
              id="returnEmail"
              type="text"
              name="returnEmail"
              className="border border-gray-400 rounded-md py-2 px-3 text-sm mb-1"
              value={formData?.returnEmail}
              onChange={handleLabelChange}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-medium mb-1"
              htmlFor="returnTimezone"
              placeholder="TimeZone"
            >
              Time Zone
            </label>
            <select
              id="returnTimezone"
              name="returnTimezone"
              className="border border-gray-400 rounded-md  px-3 h-10 w-full"
              onChange={handleTimeZone}
              value={formData?.returnTimezone}
            >
              {timezones.map((item, index) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnAddress;
