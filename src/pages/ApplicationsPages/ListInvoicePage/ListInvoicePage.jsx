////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

////// fns
import { getListInvoiceReq } from "../../../store/reducers/mainSlice";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

////// style
import "./style.scss";

//// helpers
import { roundingNum } from "../../../helpers/totals";

const ListInvoicePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { listInvoice } = useSelector((state) => state.mainSlice);

  useEffect(() => {
    dispatch(getListInvoiceReq());
  }, []);

  function clickInvoice(item) {
    navigate("/invoice/list_sub_invoice", { state: item });
  }

  return (
    <div className="listInvoicePage">
      <NavMenu navText={"Список главных накладных"} />
      <div className="listInvoices">
        {listInvoice?.map((item, index) => (
          <div className="every" key={index} onClick={() => clickInvoice(item)}>
            <div className="info">
              <p>Тип накладной: </p>
              <span>Главный</span>
            </div>
            <div className="info">
              <p>Дата: </p>
              <span>{item?.date_from || "..."}</span>
            </div>

            <div className="info">
              <p>№ </p>
              <span>{item?.codeid}</span>
            </div>

            <div className={`info ${item?.status == 1 ? "loadStatus" : ""}`}>
              <p>Статус: </p>
              <span>{item?.status == 1 ? "Ожидание" : "Доступ закрыт"} </span>
            </div>

            <div className="info">
              <p>Тип накладной: </p>
              <span>главная накладная</span>
            </div>

            <div className="info">
              <p>Ожидаемое кол-во: </p>
              <span>{roundingNum(item?.total_count) || ""}</span>
            </div>

            <div className="info">
              <p>Ожидаемый вес: </p>
              <span>{roundingNum(item?.total_count_kg) || ""}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListInvoicePage;
