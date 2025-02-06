////// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

////// helpers
import { roundingNum } from "../../../../helpers/totals";

////// fns
import {
  crudSubInvoiceReq,
  everySubInvoiceFN,
} from "../../../../store/reducers/mainSlice";

////// components
import { FormControlLabel, Switch } from "@mui/material";
import ConfirmModal from "../../../../common/ConfirmModal/ConfirmModal";
import { BottomSheet } from "react-spring-bottom-sheet";

////// icons
import ArrowNav from "@mui/icons-material/ArrowForwardIosSharp";
import DeleteIcon from "../../../../assets/MyIcons/DeleteIcon";
import EditIcon from "../../../../assets/MyIcons/EditIcon";

const ViewSubInvoice = (props) => {
  const { item, getData } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listKoptilshiks } = useSelector((state) => state.mainSlice);

  const [modal, setMoodal] = useState("");
  const [look, setLook] = useState(false);

  const onChange = async (e) => {
    const { checked } = e?.target;
    const res = await dispatch(
      crudSubInvoiceReq({
        action_type: 2,
        guid_sub_invoice: item?.guid_sub_invoice,
        is_unusable: checked ? 1 : 0,
      })
    ).unwrap();
    if (!!res?.result) {
      dispatch(everySubInvoiceFN({ ...item, is_unusable: checked ? 1 : 0 }));
    } else {
      dispatch(everySubInvoiceFN({ ...item, is_unusable: !checked ? 1 : 0 }));
    }
  };

  const delInvoice = async () => {
    const send = { action_type: 3, guid_sub_invoice: modal };
    const res = await dispatch(crudSubInvoiceReq(send)).unwrap();
    if (!!res?.result) {
      setMoodal("");
      navigate(-1);
    }
  };

  const choideUser = async (obj) => {
    const res = await dispatch(
      crudSubInvoiceReq({
        action_type: 2,
        guid_sub_invoice: item?.guid_sub_invoice,
        user_to_guid: obj?.guid,
      })
    ).unwrap();

    if (!!res?.result) {
      setLook(false);
      getData();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="mainInfo">
      <div className="mainInfo__inner">
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

        <div className="info" onClick={() => setLook(true)}>
          <p>Получатель: </p>
          <div className="edit">
            <EditIcon width={22} height={22} color={"#222"} />
            <span>{item?.user_to_fio || "выбрать"}</span>
          </div>
        </div>

        <div className="info toggle">
          <p>Бракованный товар: </p>
          <span className="toggle__inner">
            <FormControlLabel
              control={
                <Switch checked={!!item?.is_unusable} onChange={onChange} />
              }
              label={!!item?.is_unusable ? "Да" : "Нет"}
            />
          </span>
        </div>

        <div className="info">
          <p>Итоговое кол-во: </p>
          <span>{roundingNum(item?.total_count) || ""}</span>
        </div>

        <div className="info">
          <p>Итоговый вес: </p>
          <span>{roundingNum(item?.total_count_kg) || ""}</span>
        </div>

        <div
          className="info del"
          onClick={() => setMoodal(item?.guid_sub_invoice)}
        >
          <p>Удалить накладную: </p>
          <DeleteIcon width={22} height={22} color={"red"} />
        </div>
      </div>

      <ConfirmModal
        state={!!modal}
        yesFN={delInvoice}
        noFN={() => setMoodal("")}
        title={"Удалить накладную ?"}
      />

      <BottomSheet
        open={look}
        onDismiss={() => setLook(false)}
        defaultSnap={({ maxHeight }) => maxHeight * 0.7}
        snapPoints={({ maxHeight }) => maxHeight * 0.7}
      >
        <div className="typesComment">
          {listKoptilshiks?.map((i) => (
            <div onClick={() => choideUser(i)} key={i?.guid}>
              <p>{i?.fio}</p>
              <ArrowNav sx={{ color: "#5276ecc7" }} />
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

export default ViewSubInvoice;

// EXEC dbo.create_edit_subinvoice
// 	@action_type = 1,
//     @comment = 'ЧЕТЫРЕЕ',
//     @type_sub_invoice = 1,
//     @total_count = 0,
//     @total_count_kg = 0,
//     @guid_creator = '8350CC14-3654-4C2E-8434-415DB65A13CF',
//     @user_from_guid = '8350CC14-3654-4C2E-8434-415DB65A13CF',
//     @user_guid = '8350CC14-3654-4C2E-8434-415DB65A13CF',
//     @user_type = 5,
//     @invoice_guid = '999085DB-80E3-4756-804A-43FD08848029',
// 	@is_unusable = 0;

// 	EXEC dbo.create_edit_subinvoice
//     @action_type = 2,
//     @guid_sub_invoice = '3a6230c3-2664-42b7-92c1-0c68f8753063',
//     @is_unusable = 1;
