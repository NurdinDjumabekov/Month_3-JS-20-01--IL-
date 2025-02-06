////// hooks
import { useLongPress } from "react-use";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

////// components
import { TableCell } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

////// style
import "./style.scss";
import EditIcon from "../../../../assets/MyIcons/EditIcon";

const ListProds = ({ row, index, setGuidProd, guid_sub_invoice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLongPress = () => {
    // setGuidProd(obj);
    const state = {
      ...row,
      invoice_guid: guid_sub_invoice,
      action: 2,
      workshop_price: row?.price,
    }; /// добавление твоара
    navigate("/invoice/input_prods", { state });
  };

  const longPressEvent = useLongPress(() => handleLongPress(), {
    delay: 700,
  });

  //   const clickProd = (e) => {
  //     e.stopPropagation();
  //     console.log("asdasd");
  //     // const state = { ...item, invoice_guid: guid_sub_invoice, action: 1 }; /// добавление твоара
  //     navigate("/invoice/input_prods", { state: {} });
  //   };

  return (
    <TableRow key={row?.product_guid} {...longPressEvent}>
      <TableCell
        component="th"
        scope="row"
        align="center"
        style={{ width: "10%" }}
      >
        {index + 1}
      </TableCell>
      <TableCell component="th" scope="row" style={{ width: "40%" }}>
        {row?.product_name}
      </TableCell>
      <TableCell align="left" style={{ width: "20%" }}>
        {row?.count_kg} кг
      </TableCell>
    </TableRow>
  );
};

export default ListProds;
