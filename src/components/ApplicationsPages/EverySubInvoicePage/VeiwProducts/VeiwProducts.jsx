////// hooks
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// components
import { Table, TableBody, TableCell, Tooltip } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// helpers

////// fns

////// icons

////// style
import "./style.scss";
import DeleteIcon from "../../../../assets/MyIcons/DeleteIcon";
import { roundingNum } from "../../../../helpers/totals";

const VeiwProducts = (props) => {
  const { products } = props;

  const delStyle = { color: "rgba(213, 42, 42, 0.848)", width: 20, height: 20 };

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
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VeiwProducts;
