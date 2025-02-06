////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// ////// fns
import {
  getListProdsReq,
  getListWorkShop,
} from "../../../store/reducers/mainSlice";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Select from "react-select";

////// style
import "./style.scss";

///// helpers

//// icons

const SortMyListPage = () => {
  const dispatch = useDispatch();

  const [select, setSelect] = useState({});

  const { listAllProds, listWH } = useSelector((state) => state.mainSlice);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await dispatch(getListWorkShop()).unwrap();
    const value = res?.[0]?.guid;
    const label = res?.[0]?.name;
    if (!!value) {
      setSelect({ value, label });
      dispatch(getListProdsReq({ wh: value }));
    }
  };

  const onChangeWH = async ({ label, value }) => {
    setSelect({ value, label });
    dispatch(getListProdsReq({ wh: value }));
  };

  return (
    <div className="sortMyListPage">
      <NavMenu navText={`Настройки списка`} />
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
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableBody>
              {listAllProds?.map((row) => (
                <TableList key={row?.category_guid} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SortMyListPage;

function TableList({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, background: "#edf2f985" }}
        onClick={() => setOpen(!open)}
      >
        <TableCell sx={{ width: 56, padding: 1 }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton aria-label="expand row" size="small">
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {row?.prods?.map((historyRow, ind) => (
                  <TableRow key={historyRow?.guid_product}>
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
}

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
