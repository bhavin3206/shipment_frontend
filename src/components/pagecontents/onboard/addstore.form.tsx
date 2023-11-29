import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import bigcommerceService from "../../../services/bigcommerce.service";
import ShopifyForm from "./shopify.form";

const AddStoreForm: React.FC<
  PropsWithChildren<{
    open: boolean;
    onClose: () => void;
  }>
> = ({ open, onClose }) => {
  const [openShopifyForm, setOpenShopifyForm] = useState(false);
  const handleConnectBigCommerce = () => {
    bigcommerceService.bigcommerceLogin();
  };
  const handleConnectShopify = () => {
    setOpenShopifyForm(true);
    onClose();
  };
  return (
    <div>
      <ShopifyForm
        openShopifyForm={openShopifyForm}
        onClose={() => {
          setOpenShopifyForm(false);
        }}
      />
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { width: "100%", height: "70%" } }}
        maxWidth={"md"}
        sx={{
          "& .MuiDialogTitle-root": {
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.3)",
          },
          "& .MuiDialogActions-root": {
            boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <DialogTitle sx={{ mb: 2 }}>Connect a Store</DialogTitle>
        <DialogContent className="flex gap-4">
          <div
            className="w-[150px] h-[160px] border border-gray-400 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer"
            onClick={handleConnectBigCommerce}
          >
            <img
              src="/bigcommerce.svg"
              alt="bigcommerce"
              style={{ height: "25px" }}
              className="h-8 mb-2"
            />
            <div className="  text-blue-500 hover:text-blue-600">Connect</div>
          </div>
          <div
            className="w-[150px] h-[160px] border border-gray-400 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer"
            onClick={handleConnectShopify}
          >
            <img
              src="/shopify.svg"
              alt="shopify"
              style={{ height: "25px" }}
              className="h-8 mb-2"
            />
            <div className="  text-blue-500 hover:text-blue-600">Connect</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddStoreForm;
