import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import upsService from "../../../../services/ups.service";
import FromLocationsDialog, {
  FromLocationData,
} from "./dialog/dialog.component";
import { Edit } from "@mui/icons-material";

const FromLocationsTable: React.FC<
  PropsWithChildren<{ rowAdded: boolean }>
> = ({ rowAdded }) => {
  const [fromLocations, setFromLocations] = useState<FromLocationData[]>([]);
  const [fromLocation, setFromLocation] = useState<FromLocationData>();
  const [showDialog, setShowDialog] = useState(false);
  const handleClose = () => {
    setShowDialog(false);
  };

  const handleEditClick = (fromLocation: FromLocationData) => {
    setShowDialog(true);
    setFromLocation(fromLocation);
  };
  const handleLocationChange = (fromLocation: FromLocationData) => {
    setFromLocation(fromLocation);

    const index = fromLocations.findIndex(
      (item) => item.id === fromLocation.id
    );

    const updatedLocations = [
      ...fromLocations.slice(0, index),
      fromLocation,
      ...fromLocations.slice(index + 1),
    ];
    setFromLocations(updatedLocations);
    console.log(fromLocation);
  };
  useEffect(() => {
    upsService
      .getFromLocations()
      .then((data) => {
        const jsonData = JSON.parse(data);
        setFromLocations(jsonData?.fromLocations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rowAdded]);
  return (
    <div className="w-full mt-2">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "#FFFFFF",
                  backgroundColor: "#77BC3F",
                  height: "42px",
                },
              }}
            >
              <TableCell>Name</TableCell>
              <TableCell align="left">Return to Address</TableCell>
              <TableCell align="center">Default</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fromLocations.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: "rgba(119, 188, 63, 0.11)",
                  },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.locationName}
                </TableCell>
                <TableCell className="whitespace-pre-line" align="left">
                  {row.fullName}
                  <br />
                  {row.attentionName}
                  <br />
                  {row.address}
                  <br />
                  {row.city +
                    ", " +
                    row.stateCode +
                    " " +
                    row.postalCode +
                    " " +
                    row.countryCode}
                  <br />
                  {row.phone} <br />
                  {row.email}
                </TableCell>
                <TableCell align="center">
                  {row.selected ? "Default" : ""}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "#60A5F0" }}
                  className="cursor-pointer text-blue-400 hover:text-blue-600"
                  onClick={() => handleEditClick(row)}
                >
                  <Edit />
                  Edit
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FromLocationsDialog
        showDialog={showDialog}
        onChange={handleLocationChange}
        onClose={handleClose}
        formData={fromLocation}
      />
    </div>
  );
};

export default FromLocationsTable;
