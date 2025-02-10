////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// ////// fns
import {
  getListProdsReq,
  getListWorkShopActiveReq,
  saveListWorkShopActiveReq,
} from "../../../store/reducers/mainSlice";

/////// icons
import SaveAsIcon from "@mui/icons-material/SaveAs";

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
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import { myAlert } from "../../../helpers/MyAlert";

const SortMyListPage = () => {
  const dispatch = useDispatch();

  const [select, setSelect] = useState({});
  const [checkedPosition, setCheckedPosition] = useState("");
  const [saveModal, setSaveModal] = useState(false);
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

  console.log(listAllProds, "listAllProds");

  const savePositionProds = async () => {
    if (listAllProds?.length == 0) return myAlert("Изменений нет", "error");

    const new_obj = listAllProds?.find(
      ({ category_guid }) => category_guid == checkedPosition
    );

    const new_list = new_obj?.prods?.map((i) => {
      return { guid: i.guid, position: i?.position };
    });

    const res = await dispatch(
      saveListWorkShopActiveReq({ new_list })
    ).unwrap();

    if (!!res) {
      setCheckedPosition("");
      setSaveModal(false);
      getData();
    } else {
      myAlert("Что-то пошло не так, повторите попытку", "error");
    }
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
                  checkedPosition={checkedPosition}
                  setCheckedPosition={setCheckedPosition}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* //// для сохранения изменения перемещенных товаров */}
      {!!checkedPosition && (
        <button className="checkedPosition" onClick={() => setSaveModal(true)}>
          <SaveAsIcon sx={{ color: "#fff" }} />
        </button>
      )}

      <ConfirmModal
        state={!!saveModal}
        yesFN={savePositionProds}
        noFN={() => setSaveModal(false)}
        title={"Сохранить измененния ?"}
      />
    </div>
  );
};

export default SortMyListPage;
