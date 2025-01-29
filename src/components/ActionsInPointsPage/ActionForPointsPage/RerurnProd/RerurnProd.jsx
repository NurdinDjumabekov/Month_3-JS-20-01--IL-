////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// fns
import { getListProdsInInvoiceNur } from "../../../../store/reducers/standartSlice";
import { getDataInvoiceReturn } from "../../../../store/reducers/standartSlice";
import { clearListOrdersNurFN } from "../../../../store/reducers/standartSlice";
import { confirmInvoiceReq } from "../../../../store/reducers/orderSlice";

///// helpers
import { format } from "date-fns";
import { roundingNum } from "../../../../helpers/totals";
import { myAlert } from "../../../../helpers/MyAlert";

const RerurnProd = ({ return_guid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { reportEveryTT } = useSelector((state) => state.standartSlice);
  const { activeSlide, listOrdersNur } = useSelector(
    (state) => state.standartSlice
  );

  const getData = () => dispatch(getListProdsInInvoiceNur(return_guid));
  /// список товаров определённой накладной

  useEffect(() => {
    if (activeSlide == 1) {
      getData();
    } else {
      dispatch(clearListOrdersNurFN());
    }
    dispatch(getDataInvoiceReturn(return_guid));
  }, [return_guid, activeSlide]);

  const createReturn = () => {
    const obj = {
      action: 1,
      date_from: "",
      date_to: "",
      invoice_guid: return_guid,
      checkTypeProds: 0, /// все товары
      type_point_text: location.state?.type_point_text, /// для типов точек (нужен только для ФТ)
    };

    navigate("/app/crud_invoice", { state: obj });
  };

  const checkEdit = !!!reportEveryTT?.end_time && !!reportEveryTT?.start_time;
  //// редактирование и добавление не возможно

  const viewProds = async () => {
    const res = await dispatch(getDataInvoiceReturn(return_guid)).unwrap();
    navigate(`/invoice/view`, { state: res });
  };

  const confirmInvoiceForFT = async () => {
    //// для отправки наклажной только для ФТ
    const send = {
      invoice_guid: return_guid,
      date_from: format(new Date(), "yyyy-MM-dd HH:mm"),
      date_to: format(new Date(), "yyyy-MM-dd HH:mm"),
      status: 1, // подтверждение агентом 1, принято ТТ 2, откланено ТТ -2, удалено -1, создано 0
      user_guid: dataSave?.guid,
      user_type: 1, // 1 agent 2 admin
      user_type1: 1, // 1 agent 2 admin
    };
    const res = await dispatch(confirmInvoiceReq(send)).unwrap();
    if (res?.result == 1) {
      myAlert("Накладная подтверждена и отправлена в точку");
      getData();
    }
  };

  const checkFT =
    location?.state?.type_point_text == "ФТ" &&
    (listOrdersNur?.[0]?.status == 0 || listOrdersNur?.[0]?.status == -2) &&
    listOrdersNur?.length !== 0;

  return (
    <div className="mainInfo rerurnProd">
      <div className="mainInfo__inner">
        <div className="info">
          <p>Cумма возврата: </p>
          <span>{roundingNum(listOrdersNur?.[0]?.total_price || 0)} сом</span>
        </div>
        <div className="info">
          <p>Общий вес возврата: </p>
          <span>{roundingNum(listOrdersNur?.[0]?.total_count_kg || 0)} кг</span>
        </div>
        <div className="info">
          <p>Количество возврата: </p>
          <span>{roundingNum(listOrdersNur?.[0]?.total_count || 0)} шт</span>
        </div>
        <button className="pdfBtn">
          <a href={listOrdersNur?.[0]?.file} target="_blank">
            <p>Распечатать накладную возврата</p>
          </a>
        </button>
        <button className="pdfBtn viewProd">
          <a onClick={viewProds}>
            <p>Посмотреть товары</p>
          </a>
        </button>
      </div>
      {checkEdit && (
        <button className="startEndTA" onClick={createReturn}>
          <p>+ Оформить возврат</p>
        </button>
      )}
      {checkFT && (
        <button className="startEndTA noneMargin" onClick={confirmInvoiceForFT}>
          <p>Подтвердить отправку накладной</p>
        </button>
      )}
    </div>
  );
};

export default RerurnProd;
