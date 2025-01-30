////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

////// fns

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

////// style
import "./style.scss";

//// helpers
import { roundingNum } from "../../../helpers/totals";

const CreateSubInvoice = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { listInvoice } = useSelector((state) => state.mainSlice);

  return (
    <div className="createSubInvoice">
      <NavMenu navText={"Список главных накладных"} />
      <div className="createSubInvoice__list"></div>
    </div>
  );
};

export default CreateSubInvoice;
