import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import authService from "../../../../services/auth.service";
import { setAccountNumber, setUnAuth } from "../../../../redux/authslice";
import { useDispatch } from "react-redux";
import upsService from "../../../../services/ups.service";
import ToastService from "../../../toast/toast.component";
import UpsUserDialog, { UPSUserData } from "./upsUserDialog.component";
import { DeleteOutline, LinkRounded, LinkedIn } from "@mui/icons-material";

export interface UpsUsersRowData {
  fullName: string;
  accountNumber: string;
  selected: boolean;
}
function createData(
  fullName: string,
  accountNumber: string,
  selected: boolean
) {
  return {
    fullName,
    accountNumber,
    selected,
  };
}

const UpsUserManagement = () => {
  const [showAddFormOpen, setShowAddFormOpen] = useState(false);
  const [rows, setRows] = useState<UpsUsersRowData[]>([]);
  const [upsUserData, setUpsUserData] = useState<UPSUserData>({
    shipper_nickName: "",
    shipper_fullName: "",
    shipper_attentionname: "",
    shipper_companyName: "",
    shipper_taxidnum: "",
    shipper_phone: "",
    shipper_number: "",
    shipper_fax: "",
    shipper_address: "",
    shipper_city: "",
    shipper_statecode: "",
    shipper_postalcode: "",
    shipper_countrycode: "",
    shipper_upsNumber: '',
    shipper_zipCode: '',
    shipper_selected: false,
  });
  const [editmode, setEditmode] = useState(false);
  const formopen = () => {
    setShowAddFormOpen(true);
  };
  const handleShowFormOpen = () => {
    setEditmode(false);
    setUpsUserData({
      shipper_nickName: "",
      shipper_fullName: "",
      shipper_companyName: "",
    shipper_attentionname: "",
      shipper_taxidnum: "",
      shipper_phone: "",
      shipper_number: "",
      shipper_fax: "",
      shipper_address: "",
      shipper_city: "",
      shipper_statecode: "",
      shipper_postalcode: "",
      shipper_countrycode: "",
      shipper_upsNumber: '',
      shipper_zipCode: '',
      shipper_selected: false,
    });
    formopen();
  };
  const handleShowFormClose = () => {
    setShowAddFormOpen(false);
    handleGetRows();
  };
  const handleMakeDefaultUser = (fullName: string) => {
    authService
      .is_jwt_expired()
      .then((result) => {
        if (result == true) {
          dispatch(setUnAuth());
        }
        upsService
          .makeDefaultUser(fullName)
          .then(
            (data) => {
              if (data.success == true) {
                const selectedRowIndex = rows.findIndex(
                  (item) => item.fullName === fullName
                );
                let newRows: UpsUsersRowData[] = [];
                rows.map((row: UpsUsersRowData, index: number) => {
                  if (row.fullName == fullName) row.selected = true;
                  else row.selected = false;
                  newRows.push(row);
                });
                setRows(newRows);
              }
            },
            (error) => {
              console.log(error);
              if (error.response.status === 401) {
              }
            }
          )
          .catch((error: any) => {});
      })
      .catch((error) => {
        dispatch(setUnAuth());
      });
  };
  const handleDeleteUser = (shipperno: string) => {
    authService
      .is_jwt_expired()
      .then((result) => {
        if (result == true) {
          dispatch(setUnAuth());
        }
        upsService
          .removeUser(shipperno)
          .then(
            (data) => {
              if (data.success == true) {
                const selectedRowIndex = rows.findIndex(
                  (item) => item.accountNumber === shipperno
                );
                let newRows: UpsUsersRowData[] = [];
                newRows = newRows.concat(
                  rows.slice(0, selectedRowIndex),
                  rows.slice(selectedRowIndex + 1)
                );
                setRows(newRows);
              }
            },
            (error) => {
              console.log(error);
              if (error.response.status === 401) {
              }
            }
          )
          .catch((error: any) => {});
      })
      .catch((error) => {
        dispatch(setUnAuth());
      });
  };
  const handleReconnectUser = (accountNumber: string) => {
    localStorage.setItem("upsAccount", accountNumber);
    upsService
      .validate()
      .then((data) => {
        if (data.result == "success") {
          upsService.getCode(data.LassoRedirectURL, data.type);
          ToastService.showToast(
            "Reconnect Success",
            data.response.errors[0].message
          );
        } else if (data.response.errors[0].message)
          ToastService.showToast(
            "Reconnect Failed",
            data.response.errors[0].message
          );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGetRows = () => {
    authService
      .is_jwt_expired()
      .then((result) => {
        if (result == true) {
          dispatch(setUnAuth());
        }
        upsService
          .getUsers()
          .then(
            (data) => {
              const dataRows: any[] = [];
              data = JSON.parse(data);
              data.carriers.map((dataRow: UpsUsersRowData, index: number) => {
                dataRows.push(
                  createData(
                    dataRow.fullName,
                    dataRow.accountNumber,
                    dataRow.selected
                  )
                );
                if (dataRow.selected == true) {
                  dispatch(setAccountNumber(dataRow.accountNumber));
                }
              });
              setRows(dataRows);
            },
            (error) => {
              console.log(error);
              if (error.response.status === 401) {
              }
            }
          )
          .catch((error: any) => {});
      })
      .catch((error) => {
        dispatch(setUnAuth());
      });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetRows();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <ToastService.MyToastContainer />
      <UpsUserDialog
        open={showAddFormOpen}
        editmode={editmode}
        userData={upsUserData}
        setUpsUserData={setUpsUserData}
        handleClose={handleShowFormClose}
        handleAddUser={handleShowFormClose}
      />
      <div className="w-full">
        <div className=" mt-2 mb-4">
          <Typography variant="h5" className="text-left mb-2 pb-2" gutterBottom>
            Carriers
          </Typography>
          <Divider />
          <Typography className="text-left pt-2  text-[#828181]" gutterBottom>
            Save with ShipVerse's carrier rates or bring your own carrier
            accounts.
          </Typography>
        </div>
        <div className="w-full flex justify-end items-end ">
          <button
            type="submit"
            className="w-[300px] h-[42px] mt-2 text-center align-middle px-4 py-4 tracking-wide text-2xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 flex items-center justify-center"
            onClick={handleShowFormOpen}
          >
            <span className="text-white text-base">
              +Add a Carrier User Account
            </span>
          </button>
        </div>

        <TableContainer component={Paper} className="mt-2">
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
                <TableCell align="center">Carrier</TableCell>
                <TableCell align="center">AccountNumber</TableCell>
                <TableCell align="center">Default</TableCell>
                <TableCell align="center">Reconnect</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any, index: number) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: "rgba(119, 188, 63, 0.11)",
                    },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">
                    {row.selected ? row.fullName + "(Default)" : row.fullName}
                  </TableCell>
                  <TableCell align="center">{row.accountNumber}</TableCell>
                  <TableCell
                    align="center"
                    className=" w-1/6 cursor-pointer  hover:text-blue-600"
                    style={{ color: "#60A5F0" }}
                    onClick={(event) => handleMakeDefaultUser(row.fullName)}
                  >
                    {row.selected ? "" : "Default"}
                  </TableCell>
                  <TableCell
                    align="center"
                    className=" w-1/6 cursor-pointer  hover:text-blue-600"
                    style={{ color: "#60A5F0" }}
                    onClick={(event) => handleReconnectUser(row.accountNumber)}
                  >
                    <LinkRounded />
                    Connect
                  </TableCell>
                  <TableCell
                    align="center"
                    className=" w-1/6 cursor-pointer  hover:text-blue-600"
                    style={{ color: "#FF0000" }}
                    onClick={(event) => handleDeleteUser(row.accountNumber)}
                  >
                    <DeleteOutline />
                    Delete
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default UpsUserManagement;
