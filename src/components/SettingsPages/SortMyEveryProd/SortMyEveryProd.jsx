////// hooks
import { useDispatch, useSelector } from "react-redux";
import { Draggable } from "@hello-pangea/dnd";

// ////// fns
import { listAllProdsFN } from "../../../store/reducers/mainSlice";
import { crudListWorkShopActiveReq } from "../../../store/reducers/mainSlice";

////// components
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";

const SortMyEveryProd = ({ i, ind, listAllProds }) => {
  const dispatch = useDispatch();

  const onChange = async (obj) => {
    const { status, guid } = obj;
    const new_list = (list) =>
      list?.map((category) => ({
        ...category,
        prods: category?.prods?.map((product) =>
          product?.guid == guid
            ? { ...product, status: status == 1 ? 0 : 1 }
            : product
        ),
      }));

    const send = { action_type: 2, guid, status: status == 1 ? 0 : 1 };
    const res = await dispatch(crudListWorkShopActiveReq(send)).unwrap();
    dispatch(listAllProdsFN(new_list(listAllProds)));
    if (!res) dispatch(listAllProdsFN(listAllProds));
  };

  const obj52 = { maxWidth: 56, minWidth: 56, width: 56, padding: 1 };
  const obj82 = { maxWidth: 82, padding: 1, minWidth: 82, width: 82 };

  return (
    <Draggable key={i?.guid_product} draggableId={i?.guid_product} index={ind}>
      {(provided) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onChange(i)}
        >
          <TableCell sx={obj52}>
            <p style={{ textAlign: "center", fontWeight: 500 }}>{ind + 1}</p>
          </TableCell>
          <TableCell
            sx={{ fontSize: 16, fontWeight: 500 }}
            style={{ padding: "10px 10px 10px 5px" }}
          >
            {i?.product_name || "..."}
          </TableCell>
          <TableCell sx={obj82}>
            <Checkbox
              checked={!!i?.status}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
            />
          </TableCell>
        </TableRow>
      )}
    </Draggable>
  );
};

export default SortMyEveryProd;
