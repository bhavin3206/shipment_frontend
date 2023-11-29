import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import UpsUserDialog, {
  UPSUserData,
} from "../settings/upsUsers/upsUserDialog.component";

const AddCarrierForm: React.FC<
  PropsWithChildren<{
    open: boolean;
    onClose: () => void;
  }>
> = ({ open, onClose }) => {
  const [showAddCarrier, setShowAddCarrier] = useState(false);
  const handleConnectUps = () => {
    setShowAddCarrier(true);
  };
  const handleCanadaPost = () => {
    setShowAddCarrier(true);
  };
  return (
    <div>
      <UpsUserDialog
        open={showAddCarrier}
        editmode={false}
        userData={{} as UPSUserData}
        setUpsUserData={() => {}}
        handleClose={() => {
          setShowAddCarrier(false);
          onClose();
        }}
        handleAddUser={() => {
          setShowAddCarrier(false);
          onClose();
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
        <DialogTitle sx={{ mb: 2 }}>Connect a Carrier</DialogTitle>
        <DialogContent className="flex flex-row">
          <div
            className="w-[150px] h-[160px] border border-gray-400 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer mr-2"
            onClick={handleConnectUps}
          >
            <img
              src="/ups.svg"
              alt="ups"
              style={{ height: "50px", width: "50px" }}
              className="h-8 mb-2"
            />
            <div className="  text-blue-500 hover:text-blue-600">Connect</div>
          </div>
          <div
            className="w-[150px] h-[160px] border border-gray-400 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer mr-2"
            onClick={handleCanadaPost}
          >
            <img
              src="/canada-post.png"
              alt="canada-post"
              style={{ height: "50px", width: "50px" }}
              className="h-8 mb-2"
            />
            <div className="  text-blue-500 hover:text-blue-600">Connect</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCarrierForm;
