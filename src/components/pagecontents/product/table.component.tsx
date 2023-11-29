import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { PropsWithChildren } from "react";

const MyTableComponent: React.FC<
  PropsWithChildren<{
    tableHeaders: string[];
    data: any;
    onChange: (p: any) => void;
  }>
> = ({ data = {} as any, onChange = () => null, tableHeaders }) => {
  return (
    <TableContainer component={Paper} style={{ width: "100%", height: "100%" }}>
      <Table
        sx={{ minWidth: 550, width: "100%" }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                color: "#FFFFFF",
                backgroundColor: "#77BC3F",
                height: "45px",
              },
            }}
          >
            {tableHeaders.map((header: string, index: number) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) ? (
            data.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: "rgba(119, 188, 63, 0.11)",
                  },
                }}
              >
                {Object.keys(row).map((keyValue: string, index: number) => {
                  if (index == 5)
                    return (
                      <TableCell key={keyValue}>
                        <img
                          src={row[keyValue]}
                          width="32px"
                          height="32px"
                        ></img>
                      </TableCell>
                    );
                  else return <TableCell>{row[keyValue]}</TableCell>;
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={12}>Data is loading.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTableComponent;
