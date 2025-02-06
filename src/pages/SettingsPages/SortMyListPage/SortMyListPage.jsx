////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// ////// fns
import {
  crudListWorkShopActiveReq,
  getListProdsReq,
  getListWorkShopActiveReq,
  listAllProdsFN,
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
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Select from "react-select";
import { Checkbox } from "@mui/material";

////// style
import "./style.scss";

const SortMyListPage = () => {
  const dispatch = useDispatch();

  const [select, setSelect] = useState({});
  const { listAllProds, listWH } = useSelector((state) => state.mainSlice);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await dispatch(getListWorkShopActiveReq()).unwrap();
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
              {listAllProds?.map((item) => (
                <TableList key={item?.category_guid} item={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SortMyListPage;

function TableList({ item }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState("");

  const obj52 = { maxWidth: 56, minWidth: 56, width: 56, padding: 1 };
  const obj82 = { maxWidth: 82, padding: 1, minWidth: 82, width: 82 };

  const { listAllProds } = useSelector((state) => state.mainSlice);

  const onChange = async (obj) => {
    const { status, guid } = obj;
    const new_list = (list) => {
      return list?.map((category) => {
        return {
          ...category,
          prods: category?.prods?.map((product) => {
            if (product?.guid == guid) {
              return { ...product, status: status == 1 ? 0 : 1 };
            }
            return product;
          }),
        };
      });
    };
    const send = { action_type: 2, guid, status: status == 1 ? 0 : 1 };
    const res = await dispatch(crudListWorkShopActiveReq(send)).unwrap();
    dispatch(listAllProdsFN(new_list(listAllProds)));
    if (!!res) return;
    else return dispatch(listAllProdsFN(listAllProds));
  };

  const clickCateg = (category_guid) => {
    if (open == category_guid) setOpen("");
    else setOpen(category_guid);
  };

  const onChangeMain = async ({ prods, category_guid, status }) => {
    const check = item?.prods?.some((prod) => prod?.status == 1);

    // const status_new = check ? 0 : 1;
    const status_new = 0;
    const list_guids = prods
      ?.filter((product) => product?.status == status_new)
      ?.map((product) => product?.guid)
      ?.join(",");

    const newListFN = (list) => {
      return list?.map((category) => {
        if (category?.category_guid == category_guid) {
          return {
            ...category,
            prods: category?.prods?.map((product) => {
              return { ...product, status: status_new };
            }),
          };
        }
        return category;
      });
    };

    const send = {
      action_type: 4,
      status: status_new,
      list_guids,
      guid: "F2EE6BE3-548A-437C-9801-4F1C54B42170",
    };
    dispatch(listAllProdsFN(newListFN(listAllProds)));
    const res = await dispatch(crudListWorkShopActiveReq(send)).unwrap();
    console.log(res, "res");
  };

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, background: "#edf2f985" }}
      >
        <TableCell
          sx={{ width: 56, padding: 1 }}
          onClick={() => clickCateg(item?.category_guid)}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton aria-label="expand row" size="small">
              {open == item?.category_guid ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </div>
        </TableCell>
        <TableCell
          sx={{ fontSize: 16, fontWeight: 600, paddingLeft: "5px" }}
          onClick={() => clickCateg(item?.category_guid)}
        >
          {item?.category_name || "..."}
        </TableCell>
        <TableCell sx={{ width: 82, fontSize: 16, fontWeight: 600 }}>
          <div className="mainCheckBox">
            <Checkbox
              checked={item?.prods?.some((prod) => prod?.status == 1)}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
              color="success"
              onChange={() => onChangeMain(item)}
            />
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse
            in={open == item?.category_guid}
            timeout={item?.prods?.length < 120 ? "auto" : 200}
            unmountOnExit
          >
            <Table size="small" aria-label="purchases">
              <TableBody>
                {item?.prods?.map((i, ind) => (
                  <TableRow key={i?.guid_product} onClick={() => onChange(i)}>
                    <TableCell sx={obj52}>
                      <p style={{ textAlign: "center", fontWeight: 500 }}>
                        {ind + 1}
                      </p>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 16, fontWeight: 500 }}
                      style={{ padding: "10px 10px 10px 5px" }}
                    >
                      {i?.product_name || "..."}
                    </TableCell>
                    <TableCell
                      sx={obj82}
                      style={{ fontSize: 16, fontWeight: 500, paddingLeft: 3 }}
                    >
                      <Checkbox
                        checked={!!i?.status}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                      />
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
