////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ////// fns
import {
  activeCategFN,
  getActiveListProdsReq,
  getListProdsReq,
  getListWorkShopActiveReq,
} from "../../../store/reducers/mainSlice";

////// components
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Select from "react-select";

////// style
import "./style.scss";

const ListEveryUser = ({ list, type, guid_sub_invoice }) => {
  /// 1 - все товары, 2 - выбранные
  const dispatch = useDispatch();

  const [select, setSelect] = useState({});

  const { listWH, activeCateg } = useSelector((state) => state.mainSlice);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await dispatch(getListWorkShopActiveReq()).unwrap();
    const value = res?.[0]?.guid;
    const label = res?.[0]?.name;
    if (!!value) {
      setSelect({ value, label });
      if (type == 1) dispatch(getListProdsReq({ wh: value }));
      else if (type == 2) dispatch(getActiveListProdsReq({ wh: value }));
    }
  };

  const onChangeWH = async ({ label, value }) => {
    setSelect({ value, label });
    if (type == 1) dispatch(getListProdsReq({ wh: value }));
    else if (type == 2) dispatch(getActiveListProdsReq({ wh: value }));
  };

  return (
    <div className="sortMyListPage">
      <div className="myInputs">
        <Select
          options={listWH}
          className="select"
          onChange={onChangeWH}
          value={select}
          isSearchable={false}
        />
      </div>
      <div className="sortMyListPage__inner">
        <TableContainer key={list?.length} component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              {list?.map((row) => (
                <TableList
                  key={row?.category_guid}
                  row={row}
                  guid_sub_invoice={guid_sub_invoice}
                  activeCateg={activeCateg}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ListEveryUser;

const TableList = ({ row, guid_sub_invoice, activeCateg }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickProd = (item) => {
    const state = {
      ...item,
      product_guid: item?.guid_product,
      invoice_guid: guid_sub_invoice,
      action: 1,
    }; /// добавление товара
    navigate("/invoice/input_prods", { state });
  };

  ///// меняю активную категорию
  const editActiveCateg = (categ) => {
    if (categ == activeCateg) dispatch(activeCategFN("1"));
    else dispatch(activeCategFN(categ));
  };
  const checkCateg = row?.category_guid == activeCateg;

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, background: "#edf2f985" }}
        onClick={() => editActiveCateg(row?.category_guid)}
      >
        <TableCell sx={{ width: 56, padding: 1 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton aria-label="expand row" size="small">
              {checkCateg ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </div>
        </TableCell>
        <TableCell sx={{ fontSize: 16, fontWeight: 600, paddingLeft: "5px" }}>
          {row?.category_name || "..."}
        </TableCell>
        <TableCell sx={{ width: 82, fontSize: 16, fontWeight: 600 }}>
          {row?.prods?.length}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse
            in={checkCateg}
            timeout="auto"
            unmountOnExit
            sx={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Table size="small" aria-label="purchases">
              <TableBody>
                {row?.prods?.map((historyRow, ind) => (
                  <TableRow
                    key={historyRow?.guid}
                    onClick={() => clickProd(historyRow)}
                  >
                    <TableCell sx={{ maxWidth: 56, minWidth: 56, padding: 1 }}>
                      <p style={{ textAlign: "center", fontWeight: 500 }}>
                        {ind + 1}
                      </p>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 16, fontWeight: 500 }}
                      style={{ padding: "10px 16px 10px 5px" }}
                    >
                      {historyRow?.product_name || "..."}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

TableList.propTypes = {
  row: PropTypes.shape({
    ind: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    prods: PropTypes.arrayOf(
      PropTypes.shape({
        ind: PropTypes.number.isRequired,
        historyRow: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
