////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

////// fns
import {
  activeSlideFN,
  crudSubInvoiceReq,
  getListSubInvoiceReq,
} from "../../../store/reducers/mainSlice";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";

////// style
import "./style.scss";

///// helpers
import { roundingNum } from "../../../helpers/totals";

//// icons
import AddIcon from "@mui/icons-material/Add";

const ListSubInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [modal, setMoodal] = useState(false);

  const { listSubInvoice } = useSelector((state) => state.mainSlice);

  useEffect(() => {
    dispatch(getListSubInvoiceReq({ invoice_guid: state?.invoice_guid }));
  }, []);

  const createSubInvoice = async () => {
    const res = await dispatch(
      crudSubInvoiceReq({
        action_type: 1,
        comment: "",
        type_sub_invoice: 1,
        invoice_guid: state?.invoice_guid,
        is_unusable: 0,
      })
    ).unwrap();
    if (res?.result == 1) {
      setMoodal(false);
      navigate("/invoice/every_sub_invoice", {
        state: { guid_sub_invoice: res?.guid_sub_invoice },
      });
      dispatch(activeSlideFN(0));
    }
  };

  const viewEverySubInvoice = (state) => {
    navigate("/invoice/every_sub_invoice", { state });
    dispatch(activeSlideFN(0));
  };

  return (
    <div className="listInvoicePage subInvoices">
      <NavMenu navText={`Вложенные накладные`} />
      {listSubInvoice?.length != 0 && (
        <div className="listInvoices">
          {listSubInvoice?.map((item, index) => (
            <div
              className="every"
              key={index}
              onClick={() => viewEverySubInvoice(item)}
            >
              <div className="info">
                <p>Тип накладной: </p>
                <span>Вложеный</span>
              </div>
              <div className="info">
                <p>Дата: </p>
                <span>{item?.date}</span>
              </div>

              <div className="info">
                <p>№ </p>
                <span>{item?.codeid}</span>
              </div>

              <div className={`info ${item?.status == 1 ? "loadStatus" : ""}`}>
                <p>Статус: </p>
                <span>Черновик</span>
              </div>

              <div className="info">
                <p>Отправитель: </p>
                <span>{item?.user_from_fio}</span>
              </div>

              <div className="info">
                <p>Получатель: </p>
                <span>{item?.user_to_fio || "отсутствует"}</span>
              </div>

              <div className="info">
                <p>Итоговое кол-во: </p>
                <span>{roundingNum(item?.total_count) || ""}</span>
              </div>

              <div className="info">
                <p>Итоговый вес: </p>
                <span>{roundingNum(item?.total_count_kg) || ""}</span>
              </div>

              <div className="info">
                <p>Бракованный товар: </p>
                <span>{!!item?.is_unusable ? "Да" : "Нет"}</span>
              </div>

              {/* <div className="info">
              <p>Комментарий: </p>
              <span>{item?.comment}</span>
            </div> */}
            </div>
          ))}
        </div>
      )}

      {listSubInvoice?.length == 0 && (
        <div className="emptyListData">
          <p>Список пустой, создайте вложенную накладную</p>
        </div>
      )}

      <button className="createBtns" onClick={() => setMoodal(true)}>
        <AddIcon sx={{ color: "#fff" }} />
        <p>Создать накладную</p>
      </button>

      <ConfirmModal
        state={modal}
        yesFN={createSubInvoice}
        noFN={() => setMoodal(false)}
        title={"Создать накладную ?"}
      />
    </div>
  );
};

export default ListSubInvoicePage;
