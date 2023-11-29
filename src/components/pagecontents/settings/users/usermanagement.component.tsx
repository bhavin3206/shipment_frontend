import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PropsWithChildren, useEffect, useState } from "react";

import authService from "../../../../services/auth.service";
import { setUnAuth } from "../../../../redux/authslice";
import { useDispatch } from "react-redux";
import UserDialog, { UserManagementData } from "./userDialog.component";
import paymentService from "../../../../services/payment.service";
import ToastService from "../../../toast/toast.component";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
interface usersData {
  username: string;
  fullName: string;
  email: string;
  password: string;
  active: boolean;
  roles: string;
  edit: string;
}
function createData(
  username: string,
  fullName: string,
  email: string,
  password: string,
  active: boolean,
  roles: string,
  edit: string
) {
  return {
    username,
    fullName,
    email,
    password,
    active,
    roles,
    edit,
  };
}

export interface AddUserInformation {
  username: string;
  fullName: string;
  email: string;
}
const UserManagement: React.FC<PropsWithChildren<{}>> = ({}) => {
  const [showActive, setShowActive] = useState(false);
  const [showAddFormOpen, setShowAddFormOpen] = useState(false);
  const [rows, setRows] = useState<usersData[]>([]);
  const [count, setCount] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [date, setDate] = useState("");
  const [usermanagementdata, setUserManagementData] =
    useState<UserManagementData>({
      username: "",
      fullName: "",
      email: "",
      password: "",
      roles: "",
      active: false,
    });
  const [editmode, setEditmode] = useState(false);
  const formopen = () => {
    setShowAddFormOpen(true);
  };
  const handleShowFormOpen = () => {
    const activeUsers = rows.filter((item) => item.active === true);
    if (activeUsers.length >= count * 5) {
      ToastService.showToast(
        "failed",
        `You can add only ${count * 5} users. Upgrade subscription`
      );
      return;
    }
    setEditmode(false);
    setUserManagementData({
      username: "",
      fullName: "",
      email: "",
      password: "",
      roles: "",
      active: false,
    });
    formopen();
  };
  const handleShowFormClose = () => {
    setShowAddFormOpen(false);
    handleGetRows();
  };
  const handleEditClick = (
    username: string,
    fullName: string,
    email: string,
    password: string,
    roles: string,
    active: boolean
  ) => {
    setEditmode(true);
    setUserManagementData({
      username: username,
      fullName: fullName,
      email: email,
      password: password,
      roles: roles,
      active: active,
    });
    formopen();
  };
  const handleGetRows = () => {
    authService
      .is_jwt_expired()
      .then((result) => {
        if (result == true) {
          dispatch(setUnAuth());
        }
        authService
          .getChildAccounts()
          .then(
            (data) => {
              const dataRows: any[] = [];
              data = JSON.parse(data);
              data.map((dataRow: UserManagementData) => {
                const edit = "[Edit]";
                dataRows.push(
                  createData(
                    dataRow.username,
                    dataRow.fullName,
                    dataRow.email,
                    dataRow.password,
                    dataRow.active,
                    dataRow.roles,
                    edit
                  )
                );
                return true;
              });
              setRows(dataRows);
              setActiveUserCount(
                dataRows.filter((item) => item.active === true).length
              );
            },
            (error) => {
              console.log(error);
              if (error.response.status === 401) {
                // bigcommerceService.getCode();
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
  const navigate = useNavigate();
  useEffect(() => {
    paymentService
      .getSubscriptions()
      .then((data) => {
        if (data.data.result == "success") {
          setCount(data.data.count);
          setDate(data.data.date);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    handleGetRows();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <ToastService.MyToastContainer />
      <UserDialog
        open={showAddFormOpen}
        editmode={editmode}
        userData={usermanagementdata}
        setUserManagementData={setUserManagementData}
        handleClose={handleShowFormClose}
        handleAddUser={handleShowFormClose}
        more={count * 5 > activeUserCount}
      />
      <div>
        <div className=" mt-2 mb-4">
          <Typography variant="h5" className="text-left mb-2 pb-2" gutterBottom>
            User Management
          </Typography>
          <Divider />
          <Typography className="text-left pt-2 text-[#828181]" gutterBottom>
            As users come and go from your organisation, it's important to
            maintain historical references on their activity. Old user accounts
            are never fully deleted; instead they are deactivated and prevented
            from accessing the system.
            <br />
          </Typography>
        </div>
        <div className="bg-gray-200 text-[#828181]">
          <strong>{activeUserCount}</strong> active user(s) are being used. Your
          subscription supports <strong>{count * 5}</strong> users.{" "}
          {activeUserCount >= count * 5 ? (
            <span>
              New users cannot be added until another one is deactivated or
              removed.
              <br />
            </span>
          ) : (
            <br />
          )}
          <div className="flex">
            <div>You can alternatively&nbsp; </div>
            <div
              className="font-bold text-[#77BC3F] cursor-pointer underline"
              onClick={() => {
                navigate("settings/payment");
              }}
            >
              upgrade your subscription
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={showActive}
                onChange={(event) => setShowActive(event.target.checked)}
              />
            }
            label={<Typography variant="body2">Show Inactive Users</Typography>}
          />
          <button
            type="submit"
            className="w-[200px] h-[42px] mt-2 text-center align-middle px-4 py-4 tracking-wide text-2xl -skew-x-6 text-white transition-colors duration-200 transform bg-baseColor rounded-md hover:bg-baseFocusColor focus:outline-none focus:bg-baseFocusColor1 flex items-center justify-center"
            onClick={handleShowFormOpen}
          >
            <span className="text-white text-base">+Add a User Account</span>
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
                <TableCell align="center">User Name</TableCell>
                <TableCell align="center">Full Name</TableCell>
                <TableCell align="center">E-mail</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell align="center">Roles</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) =>
                row.active != showActive || row.active ? (
                  <TableRow
                    key={row.email}
                    sx={{
                      "&:nth-of-type(even)": {
                        backgroundColor: "rgba(119, 188, 63, 0.11)",
                      },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell className="w-1/6 " align="center">
                      {row.username}
                    </TableCell>
                    <TableCell className="w-1/6 " align="center">
                      {row.fullName}
                    </TableCell>
                    <TableCell className="w-1/6 " align="center">
                      {row.email}
                    </TableCell>
                    <TableCell className="w-1/6 " align="center">
                      {row.active ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell className="w-1/6 " align="center">
                      {row.roles}
                    </TableCell>
                    <TableCell
                      align="center"
                      className=" w-1/6 cursor-pointer  hover:text-blue-600"
                      style={{ color: "#60A5F0" }}
                      onClick={(event) =>
                        handleEditClick(
                          row.username,
                          row.fullName,
                          row.email,
                          row.password,
                          row.roles,
                          row.active
                        )
                      }
                    >
                      <Edit />
                      Edit
                    </TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default UserManagement;
