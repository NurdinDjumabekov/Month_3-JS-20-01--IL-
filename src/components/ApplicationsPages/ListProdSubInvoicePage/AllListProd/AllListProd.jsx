////// hooks
import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// components
import { Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// helpers

////// fns

////// icons

////// style
import "./style.scss";

const AllListProd = (props) => {
  const { guid_sub_invoice } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { listAllProds } = useSelector((state) => state.mainSlice);

  const clickProd = (item) => {
    const state = { ...item, invoice_guid: guid_sub_invoice, action: 1 }; /// добавление твоара
    navigate("/invoice/input_prods", { state });
  };

  return (
    <div className="allListProd">
      {listAllProds?.map((item, index) => (
        <TableContainer
          component={Paper}
          className="scroll_table standartTable"
          key={index}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left"></TableCell>
                <TableCell align="left">{item?.name || "..."}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item?.prods?.map((row, index) => (
                <TableRow
                  key={row?.product_guid}
                  onClick={() => clickProd(row)}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "15%", paddingLeft: 10 }}
                    align="center"
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "85%" }}
                  >
                    {row?.product_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </div>
  );
};

export default AllListProd;
