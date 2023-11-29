import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { ProductDataType } from "./ship/ship.product.form";
import { styled } from "@mui/material/styles";
import { useTheme } from "styled-components";

interface Data {
  order: string;
  age: number;
  date: string;
  itemsku: string;
  itemname: string;
  recipient: string;
  quantity: number;
  ordertotal: number;
  label: string;
  invoice: string;
  orderstatus: string;
}
export interface TableDatatype {
  order: string;
  age: string;
  date: string;
  itemsku: string;
  itemname: string;
  recipient: string;
  attention: string;
  quantity: number;
  ordertotal: number;
  label: string;
  invoice: string;
  street: string;
  city: string;
  state: string;
  country: string;
  country_iso2: string;
  phone: string;
  zip: string;
  products: Array<ProductDataType>;
  orderstatus: string;
  fulfillment_status: string;
  order_id: string;
  shoptype: string;
  storename: string;
}
interface Props {
  onSelectionChange: (selectedRows: string[]) => void;
}
interface EnhancedTableContentProps {
  rows: TableDatatype[];
  selected: string[];
  selectedRow: TableDatatype | undefined;
  selectedRowChanged: (selectedRow: TableDatatype | undefined) => void;
  setSelected: (selectedRows: string[]) => void;
  onSelectionChange: (selectedRows: string[]) => void;
  onViewPdfChange: (viewPdfOrder: string) => void;
  onViewInvoiceChange: (viewInvoiceOrder: string) => void;
  isRefresh?: boolean;
  selectedState: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "order",
    numeric: true,
    disablePadding: true,
    label: "Order #",
  },
  {
    id: "age",
    numeric: true,
    disablePadding: true,
    label: "Age",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Order Date",
  },
  {
    id: "itemsku",
    numeric: false,
    disablePadding: true,
    label: "Item SKU",
  },
  {
    id: "itemname",
    numeric: false,
    disablePadding: true,
    label: "Item Name",
  },

  {
    id: "recipient",
    numeric: false,
    disablePadding: true,
    label: "Recipient",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: true,
    label: "Quantity",
  },
  {
    id: "ordertotal",
    numeric: false,
    disablePadding: true,
    label: "Order Total",
  },
  {
    id: "label",
    numeric: false,
    disablePadding: true,
    label: "Label",
  },
  {
    id: "invoice",
    numeric: false,
    disablePadding: true,
    label: "Invoice",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  selectedState: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    selectedState,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
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
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => {
          // Check if selectedState is "Shipped"
          const isShippedState =
            selectedState === "Shipped" ||
            selectedState === "On Hold" ||
            selectedState === "Cancelled";

          // Check if the current headCell.id is "label" or "invoice"
          const isLabelOrInvoice =
            headCell.id === "label" || headCell.id === "invoice";

          // Render the TableCell only if it's not "label" or "invoice" when selectedState is not "Shipped"
          if (!(isLabelOrInvoice && !isShippedState)) {
            return (
              <TableCell
                key={headCell.id}
                align="center"
                padding={headCell.disablePadding ? "none" : "normal"}
                style={{ textAlign: "center", verticalAlign: "middle" }}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Orders
        </Typography>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable({
  rows,
  selectedRow,
  selectedRowChanged,
  selected,
  setSelected,
  onSelectionChange,
  onViewPdfChange,
  onViewInvoiceChange,
  selectedState,
}: EnhancedTableContentProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("order");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [visibleRows, setVisibleRows] = React.useState<any>([]);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map((n: TableDatatype) =>
        String(n.order)
      );
      setSelected(newSelected);
      onSelectionChange(newSelected);
      return;
    } else {
      setSelected([]);
      onSelectionChange([]);
    }
  };
  const handleRowClick = (event: React.MouseEvent<unknown>, order: string) => {
    const selectedIndex = selected.indexOf(order);
    let newSelected: string[] = [];
    newSelected[0] = order.toString();
    const currentSelectedRow = rows.find((item) => item.order === order);
    selectedRowChanged(currentSelectedRow);
    setSelected(newSelected);
    onSelectionChange(newSelected);
  };
  const handleClick = (event: React.MouseEvent<unknown>, order: string) => {
    const currentSelectedRow = rows.find((item) => item.order === order);
    selectedRowChanged(currentSelectedRow);
    const selectedIndex = selected.indexOf(order);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, order);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    onSelectionChange(newSelected);
  };
  const handleViewLabelClick = (
    event: React.MouseEvent<unknown>,
    order: string
  ) => {
    onViewPdfChange(order);
  };
  const handleViewInvoiceClick = (
    event: React.MouseEvent<unknown>,
    order: string
  ) => {
    onViewInvoiceChange(order);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (order: string) =>
    selected.findIndex((item) => item === order) > -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const StyledTableRow = styled(TableRow)((theme: any) => ({
    "&:nth-of-type(even)": {
      backgroundColor: "rgba(119, 188, 63, 0.11)",
    },
  }));
  React.useEffect(() => {
    setVisibleRows(
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    );
  }, [rows, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              selectedState={selectedState}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              key={order}
            />
            <TableBody>
              {visibleRows.map((row: any, index: any) => {
                const isItemSelected = isSelected(String(row.order));
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.order}
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                    onClick={(event: any) => {
                      if ((event.target as HTMLElement).tagName !== "INPUT") {
                        handleRowClick(event, row.order);
                      }
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) =>
                          handleClick(event, row.order.toString())
                        }
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                    >
                      <div className="flex justify-start items-center">
                        <img
                          src={"/" + row.shoptype + "_small.png"}
                          width="24px"
                          height="24px"
                        ></img>
                        {row.order}
                      </div>
                    </TableCell>
                    <TableCell align="center">{row.age}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.itemsku}</TableCell>
                    <TableCell align="center">{row.itemname}</TableCell>
                    <TableCell align="center">{row.recipient}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.ordertotal}</TableCell>
                    {(selectedState === "Shipped" ||
                      selectedState === "On Hold" ||
                      selectedState === "Cancelled") && (
                      <>
                        <TableCell
                          align="right"
                          className=" cursor-pointer  hover:text-blue-600"
                          style={{ color: "#60A5F0" }}
                          onClick={(event) =>
                            handleViewLabelClick(event, row.order)
                          }
                        >
                          {row.label}
                        </TableCell>
                        <TableCell
                          align="right"
                          className=" cursor-pointer  hover:text-blue-600"
                          style={{ color: "#60A5F0" }}
                          onClick={(event) =>
                            handleViewInvoiceClick(event, row.order)
                          }
                        >
                          {row.invoice}
                        </TableCell>
                      </>
                    )}
                    {/* <TableCell align="center">{row.orderstatus}</TableCell> */}
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50, 100, 150]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
