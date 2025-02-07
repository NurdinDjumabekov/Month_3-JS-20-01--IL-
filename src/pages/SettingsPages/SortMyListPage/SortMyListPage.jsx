////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// ////// fns
import {
  getListProdsReq,
  getListWorkShopActiveReq,
} from "../../../store/reducers/mainSlice";

////// components
import TableList from "../../../components/SettingsPages/SortMyListPage/SortMyListPage";
import NavMenu from "../../../common/NavMenu/NavMenu";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Select from "react-select";

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
              {listAllProds?.map((item, index) => (
                <TableList
                  key={index}
                  item={item}
                  index={index}
                  listAllProds={listAllProds}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SortMyListPage;
