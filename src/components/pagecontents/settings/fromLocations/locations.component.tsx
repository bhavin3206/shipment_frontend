import { Button, Divider, Typography } from "@mui/material";
import FromLocationsTable from "./table.component";
import { useState } from "react";
import upsService from "../../../../services/ups.service";
import FromLocationsDialog, {
  FromLocationData,
} from "./dialog/dialog.component";

const FromLocations = () => {
  const [fromLocation, setFromLocation] = useState<FromLocationData>({
    id: "",
    locationName: "",
    residential: false,
    fullName: "",
    attentionName: "",
    countryCode: "CA",
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
    returnCountryCode: "CA",
    returnAddress: "",
    returnAddress1: "",
    returnCity: "",
    returnStateCode: "",
    returnPostalCode: "",
    returnPhone: "",
    returnEmail: "",
    returnTimezone: "",
  } as FromLocationData);
  const [showFormOpen, setShowFormOpen] = useState(false);
  const [rowAdded, setRowAdded] = useState(false);
  const handleShowFormClose = () => {
    setShowFormOpen(false);
  };
  const handleSetFromClick = () => {
    setShowFormOpen(true);
  };
  const handleAddLocation = () => {
    setRowAdded(true);
  };
  return (
    <>
      <FromLocationsDialog
        showDialog={showFormOpen}
        onChange={handleAddLocation}
        onClose={handleShowFormClose}
        formData={fromLocation}
      />

      <div className="w-full">
        <div className=" mt-2 mb-4">
          <Typography variant="h5" className="text-left mb-2 pb-2" gutterBottom>
            From Locations
          </Typography>
          <Divider />
          <Typography className="text-left pt-2 text-[#828181]" gutterBottom>
            Your ship from locations provide origin information and shipment
            return information for packages shipped through ShipStation. <br />
            Your default Ship From Location will be applied to all incoming
            orders unless otherwise applied by an automation rule.
          </Typography>
          <div className="flex justify-end items-end ">
            <button
              type="submit"
              className="w-[200px] h-[42px] mt-2 text-center align-middle px-4 py-4 tracking-wide text-2xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 flex items-center justify-center"
              onClick={handleSetFromClick}
            >
              <span className="text-white text-base">+Add a Location</span>
            </button>
          </div>
          <FromLocationsTable rowAdded={rowAdded} />
        </div>
      </div>
    </>
  );
};

export default FromLocations;
