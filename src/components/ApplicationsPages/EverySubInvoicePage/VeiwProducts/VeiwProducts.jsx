////// hooks
import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// components
import { Table, TableBody, TableCell, Tooltip } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// helpers

////// fns

////// icons
import AddIcons from "@mui/icons-material/AddOutlined";

////// style
import "./style.scss";

const VeiwProducts = (props) => {
  const { products } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const editListProds = () => {
    navigate("/invoice/crud_invoice", { state: {} });
  };

  return (
    <div className="listAcceptProd">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%" }}
        className="scroll_table standartTable"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10%" }} align="center">
                №
              </TableCell>
              <TableCell style={{ width: "40%" }}>Продукт</TableCell>
              <TableCell align="left" style={{ width: "20%" }}>
                Кол-во
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((row, index) => (
              <TableRow key={row?.product_guid}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={{ width: "10%" }}
                >
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row" style={{ width: "40%" }}>
                  {row?.product_name}
                </TableCell>
                <TableCell align="left" style={{ width: "20%" }}>
                  {row?.count_kg} кг
                </TableCell>
              </TableRow>
            ))}
            {products?.length == 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Список пустой
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <button className="addProds" onClick={editListProds}>
        <AddIcons sx={{ color: "#fff" }} />
      </button>
    </div>
  );
};

export default VeiwProducts;
