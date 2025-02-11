////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

///// icons
import krest from "../../../assets/icons/krest.svg";
import DeleteIcon from "../../../assets/MyIcons/DeleteIcon";

///// helpers
import { myAlert } from "../../../helpers/MyAlert";

///// fns
import {
  addProdsInInvoiceReq,
  getEverySubInvoiceReq,
} from "../../../store/reducers/mainSlice";

const InputInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  /// action - 1 - создание заявки, 2 - редактирвоание заявки
  const { product_name, invoice_guid, workshop_price } = location?.state;
  const { category_name, product_guid, action } = location?.state;
  const { count_kg, type_unit } = location?.state;

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const [count, setCount] = useState("");

  const onChange = (e) => {
    // Проверка: цифры и до 3 цифр после точки
    if (/^\d*\.?\d{0,3}$/.test(e.target.value)) setCount(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef?.current.focus();
    }, 300);
    setCount(count_kg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [action]);

  const crudProdsFN = async (e) => {
    e.preventDefault();
    const noNone = "Поля не должны быть пустыми или равны 0";
    if (!!!count) return myAlert(noNone, "error");
    const data = {
      invoice_guid,
      product_guid,
      workshop_price,
      count,
      user_guid: dataSave?.guid,
      user_type: dataSave?.user_type,
      action_type: action,
    };
    const res = await dispatch(addProdsInInvoiceReq(data)).unwrap();
    if (!!res) {
      myAlert(action == 1 ? "Продукт добавлен" : "Продукт обновлён");
      navigate(-1);
      dispatch(getEverySubInvoiceReq({ guid_sub_invoice: invoice_guid }));
    }
  };

  const delProdsFN = async () => {
    const data = {
      invoice_guid,
      product_guid,
      workshop_price,
      count,
      user_guid: dataSave?.guid,
      user_type: dataSave?.user_type,
      action_type: 3,
    };
    const res = await dispatch(addProdsInInvoiceReq(data)).unwrap();
    if (!!res) {
      myAlert("Продукт удалён");
      navigate(-1);
      dispatch(getEverySubInvoiceReq({ guid_sub_invoice: invoice_guid }));
    }
  };

  const objUnit = {
    1: "Введите итоговое кол-во товара",
    2: "Введите итоговый вес товара",
  };

  return (
    <>
      <NavMenu navText={"Назад"} />
      <div className="inputInvoice">
        <div className="titles">
          <h3>Категория товара: {category_name}</h3>
          <h4>Наименование товара: {product_name}</h4>
          <button onClick={() => navigate(-1)}>
            <img src={krest} alt="x" />
          </button>
        </div>
        <form className="count" onSubmit={crudProdsFN}>
          <div className="inputSend">
            <p>{objUnit?.[type_unit]}</p>
            <input
              type="tel"
              value={count}
              onChange={onChange}
              ref={inputRef}
              inputMode="decimal"
            />
          </div>
          <button type="submit">
            <p>Добавить</p>
          </button>
          {action == 2 && (
            <div className="delete" onClick={delProdsFN}>
              <DeleteIcon color={"#fff"} />
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default InputInvoicePage;
