import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { FC, PropsWithChildren } from "react";

const ModalContainer: FC<
  PropsWithChildren<{
    open?: boolean;
    onClose?: () => void;
    maxWidth?: Breakpoint;
    title?: string;
    onSave?: () => void;
  }>
> = ({
  open = false,
  onClose = () => null,
  maxWidth = "md",
  title = "",
  children,
  onSave,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      PaperProps={{ sx: { width: "100%", height: "70%" } }}
    >
      <DialogTitle sx={{ mb: 2 }}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {onSave ? <Button onClick={onSave}>Save</Button> : null}
      </DialogActions>
    </Dialog>
  );
};

export default ModalContainer;
