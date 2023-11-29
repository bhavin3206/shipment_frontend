import React, { PropsWithChildren } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TaxData } from "./internationalsettings.component";
import upsService from "../../../../services/ups.service";
import { DeleteOutline } from "@mui/icons-material";

const TaxIdTable: React.FC<
  PropsWithChildren<{
    rowsData: Array<TaxData>;
    onChange: (p: Array<TaxData>) => void;
  }>
> = ({ rowsData, onChange }) => {
  const deleteTax = (nickname: string, index: number) => {
    upsService
      .deleteTax(nickname)
      .then(() => {
        const updatedRowsData = [
          ...rowsData.slice(0, index),
          ...rowsData.slice(index + 1),
        ];
        onChange(updatedRowsData);
      })
      .catch(() => {});
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
              <TableCell align="center">Tax ID Type</TableCell>
              <TableCell align="center">Issuing Authority</TableCell>
              <TableCell align="center">Number</TableCell>
              <TableCell align="center">Nickname</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData.map((row: any, index: number) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: "rgba(119, 188, 63, 0.11)",
                  },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">{row.idType}</TableCell>
                <TableCell align="center">{row.authority}</TableCell>
                <TableCell align="center">{row.number}</TableCell>
                <TableCell align="center">{row.nickname}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell
                  align="center"
                  className=" w-1/6 cursor-pointer  hover:text-blue-600"
                  style={{ color: "#FF0000" }}
                  onClick={(event) => deleteTax(row.nickname, index)}
                >
                  {row.upsPackage ? null : <DeleteOutline />}
                  {row.upsPackage ? "" : "Delete"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaxIdTable;
