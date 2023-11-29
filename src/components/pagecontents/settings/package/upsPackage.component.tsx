import {
  Button,
  Divider,
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
import UpsPackageDialog from "./upsPackageDialog.component";
import { Delete, DeleteOutline, Edit } from "@mui/icons-material";

export interface UpsPackageData {
  id: string;
  packageName: string;
  measureUnit: string;
  length: number;
  width: number;
  height: number;
  packageCode: string;
  upsPackage: boolean;
}
function createData(
  packageName: string,
  measureUnit: string,
  length: number,
  width: number,
  height: number,
  packageCode: string,
  upsPackage: boolean
) {
  return {
    packageName,
    measureUnit,
    length,
    width,
    height,
    packageCode,
    upsPackage,
  };
}

const PackageManagement = () => {
  const [showAddFormOpen, setShowAddFormOpen] = useState(false);
  const [rows, setRows] = useState<UpsPackageData[]>([]);
  const [packageData, setPackageData] = useState<UpsPackageData>({
    id: "",
    packageName: "",
    measureUnit: "",
    length: 0,
    width: 0,
    height: 0,
    packageCode: "",
    upsPackage: false,
  });
  const [editMode, setEditmode] = useState(false);
  const formopen = () => {
    setShowAddFormOpen(true);
  };
  const handleShowFormOpen = () => {
    setEditmode(false);
    setPackageData({
      id: "",
      packageName: "",
      measureUnit: "",
      length: 0,
      width: 0,
      height: 0,
      packageCode: "",
      upsPackage: false,
    });
    formopen();
  };
  const handleShowFormClose = () => {
    setShowAddFormOpen(false);
    handleGetRows();
  };
  const handleEditPackage = (
    packageName: string,
    measureUnit: string,
    length: number,
    width: number,
    height: number
  ) => {
    setEditmode(true);
    setPackageData({
      id: "",
      packageName: packageName,
      measureUnit: measureUnit,
      length: length,
      width: width,
      height: height,
      packageCode: "02",
      upsPackage: false,
    });
    console.log(packageData);
    formopen();
  };

  const handleDeletePackage = (packageName: string) => {
    authService.is_jwt_expired().then((result) => {
      if (result == true) {
        dispatch(setUnAuth());
      } else {
        upsService
          .removePackage(packageName)
          .then(
            (data) => {
              if (data.success == true) {
                const selectedRowIndex = rows.findIndex(
                  (item) => item.packageName === packageName
                );
                let newRows: UpsPackageData[] = [];
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
      }
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
          .getPackages()
          .then(
            (data) => {
              const dataRows: any[] = [];
              data = JSON.parse(data);
              data.packages.map((dataRow: UpsPackageData) => {
                dataRows.push(
                  createData(
                    dataRow.packageName,
                    dataRow.measureUnit,
                    dataRow.length,
                    dataRow.width,
                    dataRow.height,
                    dataRow.packageCode,
                    dataRow.upsPackage
                  )
                );
              });
              setRows(dataRows);
              console.log(rows);
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
      <UpsPackageDialog
        open={showAddFormOpen}
        editMode={editMode}
        packageData={packageData}
        setPackageData={(name: string, value: string) =>
          setPackageData((prev: UpsPackageData) => ({
            ...prev,
            [name]: value,
          }))
        }
        handleClose={handleShowFormClose}
      />
      <div className="w-full">
        <div className=" mt-2 mb-4">
          <Typography variant="h5" className="text-left mb-2 pb-2" gutterBottom>
            Packages
          </Typography>
          <Divider />
          <Typography className="text-left pt-2 text-[#828181]" gutterBottom>
            Save with ShipVerse's Package Sizes or bring your own package sizes.
          </Typography>
        </div>
        <div className="flex justify-end items-end ">
          <button
            type="submit"
            className="w-[200px] h-[42px] mt-2 text-center align-middle px-4 py-4 tracking-wide text-2xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 flex items-center justify-center"
            onClick={handleShowFormOpen}
          >
            <span className="text-white text-base">+Add a Package</span>
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
                <TableCell align="center">Package Name</TableCell>
                <TableCell align="center">Measure Unit</TableCell>
                <TableCell align="center">Length</TableCell>
                <TableCell align="center">Width</TableCell>
                <TableCell align="center">Height</TableCell>
                <TableCell align="center">UPS Package</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: "rgba(119, 188, 63, 0.11)",
                    },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">
                    {row.packageCode + "- " + row.packageName}
                  </TableCell>
                  <TableCell align="center">{row.measureUnit}</TableCell>
                  <TableCell align="center">{row.length}</TableCell>
                  <TableCell align="center">{row.width}</TableCell>
                  <TableCell align="center">{row.height}</TableCell>
                  <TableCell align="center">
                    {row.upsPackage ? "TRUE" : "FALSE"}
                  </TableCell>
                  <TableCell
                    align="center"
                    className=" w-1/6 cursor-pointer  hover:text-blue-600"
                    style={{ color: "#60A5F0" }}
                    onClick={(event) =>
                      handleEditPackage(
                        row.packageName,
                        row.measureUnit,
                        row.length,
                        row.width,
                        row.height
                      )
                    }
                  >
                    {row.upsPackage ? null : <Edit />}
                    {row.upsPackage ? "" : "Edit"}
                  </TableCell>
                  <TableCell
                    align="center"
                    className=" w-1/6 cursor-pointer  hover:text-blue-600"
                    style={{ color: "#FF0000" }}
                    onClick={(event) => handleDeletePackage(row.packageName)}
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
    </>
  );
};

export default PackageManagement;
