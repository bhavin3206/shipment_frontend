import {
  Button,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TaxIdTable from "./taxIdTable.component";
import AddTaxDialog from "./addTaxDialog.component";
import upsService from "../../../../services/ups.service";
import ToastService from "../../../toast/toast.component";
export const ContentTypes = [
  { name: "None", value: "None" },
  { name: "GIFT", value: "This is a gift" },
  { name: "SALE", value: "I am selling these items" },
  { name: "SAMPLE", value: "I am sending product samples" },
  { name: "REPAIR", value: "I am sending these items to be repaired" },
  { name: "RETURN", value: "I am returning items" },
  { name: "INTERCOMPANYDATA", value: "I am sending data within my company" },
];
export const TermsOfSaleItems = [
  { name: "None", value: "None" },
  { name: "CFR", value: "Cost and Freight(CFR)" },
  { name: "CIF", value: "Cost Insurance and Freight(CIF)" },
  { name: "CIP", value: "Carriage and Insurance Paid(CIP)" },
  { name: "CPT", value: "Carriage Paid To(CPT)" },
  { name: "DIF", value: "Delivered at Frontier(DIF)" },
  { name: "DAP", value: "Delivered at Place(DAP)" },
  { name: "DAT", value: "Delivered at Terminal(DAT)" },
  { name: "DDP", value: "Delivery Duty Paid(DDP)" },
  { name: "DDU", value: "Delivery Duty Unpaid(DDU)" },
  { name: "DEQ", value: "Delivered Ex Quay(DEQ)" },
  { name: "DES", value: "Delivered Ex Ship(DES)" },
  { name: "EXW", value: "Ex Works(EXW)" },
  { name: "FAS", value: "Free Alongside Ship(FAS)" },
  { name: "FCA", value: "Free Carrier(FCA)" },
  { name: "FOB", value: "Free On Board(FOB)" },
];
export interface TaxData {
  idType: string;
  authority: string;
  number: string;
  nickname: string;
  description: string;
}
export interface InternationalDataType {
  defaultContentType: string;
  termsOfSale: string;
  declarationStatement: string;
}
const InternationalSettings = () => {
  const [rows, setRows] = useState<Array<TaxData>>([] as Array<TaxData>);
  const [internationalData, setInternationalData] =
    useState<InternationalDataType>({
      defaultContentType: "",
      termsOfSale: "",
      declarationStatement: "",
    });
  const [showAddTax, setShowAddTax] = useState(false);
  const handleDefaultChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setInternationalData((prev) => ({ ...prev, [name]: value }));
  };
  const handleTermsChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setInternationalData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDeclarationStatementChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setInternationalData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddTax = () => {
    setShowAddTax(true);
  };
  const handleCloseTax = () => {
    setShowAddTax(false);
  };
  const handleSave = () => {
    upsService
      .saveInternationalSettings(internationalData)
      .then((data) => {
        ToastService.showToast("success", "International Settings Saved!");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.data) {
          ToastService.showToast("failed", error.response.data.data);
        } else {
          console.log(error);
          ToastService.showToast("failed", error.response.statusText);
        }
      });
  };
  const handleTableDataChange = (p: Array<TaxData>) => {
    setRows(p);
  };
  useEffect(() => {
    upsService
      .getTaxes()
      .then((data) => {
        const results = JSON.parse(data);
        if (results.result == "success") setRows(results.data);
        else
          ToastService.showToast(
            "Loading Taxes Failed",
            data.response.errors[0].message
          );
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.data) {
          ToastService.showToast("failed", error.response.data.data);
        } else {
          ToastService.showToast("failed", "Loading Taxes failed");
        }
      });
    upsService
      .getInternationalSettings()
      .then((data) => {
        const results = JSON.parse(data);
        if (results.result == "success") setInternationalData(results.data);
        else
          ToastService.showToast(
            "Loading Settings Failed",
            data.response.errors[0].message
          );
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.data) {
          ToastService.showToast("failed", error.response.data.data);
        } else {
          ToastService.showToast("failed", "Loading Settings failed");
        }
      });
  }, []);
  return (
    <>
      <ToastService.MyToastContainer />
      <AddTaxDialog
        open={showAddTax}
        onClose={handleCloseTax}
        onAdd={(newTax: TaxData) => setRows((prev) => [...prev, newTax])}
      />
      <div className="w-full">
        <div className=" mt-2 mb-4">
          <Typography variant="h5" className="text-left mb-2 pb-2" gutterBottom>
            International Settings
          </Typography>
          <Divider />
          <Typography className="text-left pt-2 text-[#828181]" gutterBottom>
            ShipVerse can automatically assign a default setting for your
            customs information for every order that is imported with an
            international destination.
            <br /> You can always change this setting on individual orders as
            well.
          </Typography>
        </div>
        <label className="text-xl text-left mb-2 pb-2">
          Default Customs Information
        </label>
        <div className="flex flex-col w-1/3 ">
          <div className="flex items-center justify-between  pt-2 gap-8">
            <label className="w-[200px] text-sm font-medium mb-1 ">
              Default Content Type
            </label>
            <Select
              id="contentSelect"
              className="w-full h-8 text-sm border border-gray-400 rounded-md  "
              name="defaultContentType"
              onChange={handleDefaultChange}
              value={
                internationalData.defaultContentType.toString() == ""
                  ? "None"
                  : internationalData.defaultContentType.toString()
              }
            >
              {ContentTypes.map((item, index: number) => (
                <MenuItem
                  value={item.name}
                  sx={{ fontSize: "14px" }}
                  key={index}
                >
                  {item.value}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex items-center justify-between  pt-2 gap-8">
            <label className="w-[200px] text-sm font-medium mb-1 ">
              TermsOfSale
            </label>
            <Select
              id="termsSelect"
              className="w-full h-8 text-sm border border-gray-400 rounded-md  "
              name="termsOfSale"
              onChange={handleTermsChange}
              value={
                internationalData.termsOfSale.toString() == ""
                  ? "None"
                  : internationalData.termsOfSale.toString()
              }
            >
              {TermsOfSaleItems.map((item) => (
                <MenuItem value={item.name} sx={{ fontSize: "14px" }}>
                  {item.value}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex items-center justify-between  pt-2 gap-8">
            <label className="w-[200px] text-sm font-medium mb-1 ">
              Default Declaration Statement
            </label>
            <Select
              id="declarationSelect"
              className="w-full h-8 text-sm border border-gray-400 rounded-md  "
              name="declarationStatement"
              onChange={handleDeclarationStatementChange}
              value={
                internationalData.declarationStatement.toString() == ""
                  ? "Standard"
                  : internationalData.declarationStatement.toString()
              }
            >
              <MenuItem value="None" sx={{ fontSize: "14px" }}>
                None
              </MenuItem>
              <MenuItem value="Standard" sx={{ fontSize: "14px" }}>
                Standard
              </MenuItem>
            </Select>
          </div>
        </div>
        <div className="flex flex-col w-full justify-end items-end">
          <div className="flex justify-end items-end ">
            <button
              type="submit"
              className="w-[200px] h-[42px] mt-2 text-center align-middle px-4 py-4 tracking-wide text-2xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 flex items-center justify-center"
              onClick={handleSave}
            >
              <span className="text-white text-base">Save Changes</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div>
            <label className="text-xl text-left mb-2 pb-2">
              Tax Identifiers
            </label>
            <div className="flex flex-col w-full justify-end items-end mb-2">
              <div className="flex justify-end items-end ">
                <button
                  type="submit"
                  className="w-[200px] h-[42px] mt-2 text-center align-middle px-4 py-4 tracking-wide text-2xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 flex items-center justify-center"
                  onClick={handleAddTax}
                >
                  <span className="text-white text-base">Add a Tax</span>
                </button>
              </div>
            </div>
            <TaxIdTable rowsData={rows} onChange={handleTableDataChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InternationalSettings;
