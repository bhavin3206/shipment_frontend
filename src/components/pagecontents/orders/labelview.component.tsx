import { PDFViewer, Page, Image, Document } from "@react-pdf/renderer";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
interface LabelViewDialogProps {
  open: boolean;
  imageSource: string;
  handleClose: () => void;
}

export default function LabelView(props: LabelViewDialogProps) {
  const { open, imageSource, handleClose } = props;
  const base64Image = `data:image/png;base64,${imageSource}`;
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ mb: 2 }}>Label Viewer</DialogTitle>
        <DialogContent>
          <PDFViewer
            style={{
              width: "100%",
              height: "calc(100vh - 200px)",
            }}
          >
            <Document>
              <Page>
                <Image
                  src={base64Image}
                  style={{
                    transform: "rotate(90deg)",
                    position: "relative", // add this property to the Image component
                    top: "16%",
                    left: -120,
                    // right: 0,
                    // margin: "auto",
                  }}
                />
              </Page>
            </Document>
          </PDFViewer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
