import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
interface InvoiceViewDialogProps {
  open: boolean;
  imageSource: string;
  handleClose: () => void;
}

export default function InvoiceView(props: InvoiceViewDialogProps) {
  const { open, imageSource, handleClose } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        className="h-full"
      >
        <DialogTitle sx={{ mb: 2 }}>Invoice Viewer</DialogTitle>
        <DialogContent>
          <embed
            src={`data:application/pdf;base64,${imageSource}`}
            type="application/pdf"
            width="100%"
            height="700px"
          ></embed>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
