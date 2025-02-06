////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

////// components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import { TableRow, Paper } from "@mui/material";
import ListProds from "../ListProds/ListProds";
import ConfirmModal from "../../../../common/ConfirmModal/ConfirmModal";

////// fns
import {
  activeSlideForProdFN,
  addProdsInInvoiceReq,
  getEverySubInvoiceReq,
} from "../../../../store/reducers/mainSlice";

////// icons
import AddIcons from "@mui/icons-material/AddOutlined";

////// style
import "./style.scss";

///// helpers
import { myAlert } from "../../../../helpers/MyAlert";

const VeiwProducts = (props) => {
  const { products, guid_sub_invoice } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [guidProd, setGuidProd] = useState({});

  const { dataSave } = useSelector((state) => state.saveDataSlice);

  const checkPage = location?.pathname === "/invoice/every_sub_invoice";

  const editListProds = () => {
    dispatch(activeSlideForProdFN(0));
    navigate("/invoice/crud_invoice", { state: guid_sub_invoice });
  };

  const delProdsFN = async () => {
    const data = {
      invoice_guid: guid_sub_invoice,
      product_guid: guidProd?.product_guid,
      workshop_price: guidProd?.price,
      count: guidProd?.count,
      user_guid: dataSave?.guid,
      user_type: dataSave?.user_type,
      action_type: 3,
    };
    const res = await dispatch(addProdsInInvoiceReq(data)).unwrap();
    if (!!res) {
      setGuidProd({});
      myAlert("Товар удалён");
      dispatch(getEverySubInvoiceReq({ guid_sub_invoice }));
    }
  };

  return (
    <div className="listAcceptProd">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "100%" }}
        className="scroll_table standartTable"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10%" }} align="center">
                №
              </TableCell>
              <TableCell style={{ width: "40%" }}>Продукт</TableCell>
              <TableCell align="left" style={{ width: "20%" }}>
                Кол-во
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((row, index) => (
              <ListProds
                row={row}
                index={index}
                setGuidProd={setGuidProd}
                key={index}
                guid_sub_invoice={guid_sub_invoice}
              />
            ))}
            {products?.length == 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Список пустой
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {checkPage && (
        <button className="addProds" onClick={editListProds}>
          <AddIcons sx={{ color: "#fff" }} />
        </button>
      )}

      <ConfirmModal
        state={!!guidProd?.product_guid}
        yesFN={delProdsFN}
        noFN={() => setGuidProd({})}
        title={"Удалить продукт ?"}
      />
    </div>
  );
};

export default VeiwProducts;
