import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import shopifyService from "../../../services/shopify.service";

const ShopifyForm: React.FC<
  PropsWithChildren<{ openShopifyForm: boolean; onClose: () => void }>
> = ({ openShopifyForm, onClose }) => {
  const [shopifyDomain, setShopifyDomain] = useState("");
  const handleShopifyDomainChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShopifyDomain(event.target.value);
  };
  const handleConnect = () => {
    shopifyService.getCode(shopifyDomain);
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div>
      <Dialog
        open={openShopifyForm}
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
        <DialogTitle sx={{ mb: 2 }}>Set Up Store Connection</DialogTitle>
        <DialogContent className="flex gap-4">
          <div className="flex flex-col">
            <img src="/shopify.svg" alt="shopify" className="w-[200px] mb-8" />
            <Typography className="text-lg ">Shopify Domain</Typography>
            <TextField
              className="w-full"
              variant="outlined"
              name="domain"
              size="small"
              value={shopifyDomain}
              placeholder="yourstore.myshopify.com"
              onChange={handleShopifyDomainChange}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                },
              }}
            />
            <Typography fontSize="12px">
              Enter the domain of your Shopify store (Example:
              yourstorename.myshopify.com or yourstorename)
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConnect}>Connect</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShopifyForm;
