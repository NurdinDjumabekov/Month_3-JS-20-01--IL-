////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

// ////// fns
import {
  activeCategFN,
  crudListWorkShopActiveReq,
  listAllProdsFN,
} from "../../../store/reducers/mainSlice";

////// components
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox } from "@mui/material";
import SortMyEveryProd from "../SortMyEveryProd/SortMyEveryProd";

////// helpers
import { myAlert } from "../../../helpers/MyAlert";

const TableList = (props) => {
  const { item, listAllProds, setCheckedPosition, checkedPosition } = props;

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(0);
  const [checkedStatus, setCheckedStatus] = useState(true);

  const { activeCateg } = useSelector((state) => state.mainSlice);

  useEffect(() => {
    const list_check = item?.prods?.filter((prod) => prod?.status == 1);
    setChecked(list_check?.length >= 1 ? 1 : 0);
  }, [item?.prods]);

  const clickCateg = (categ) => {
    if (categ == activeCateg) dispatch(activeCategFN("1"));
    else dispatch(activeCategFN(categ));
  };

  const onChangeMain = async ({ prods, category_guid }) => {
    setChecked(checkedStatus);
    let list_guids = prods
      ?.filter((product) => product?.status == !checkedStatus)
      ?.map((product) => product?.guid)
      ?.join(", ");

    const newListFN = (list) =>
      list?.map((category) =>
        category?.category_guid == category_guid
          ? {
              ...category,
              prods: category?.prods?.map((product) => ({
                ...product,
                status: checkedStatus,
              })),
            }
          : category
      );

    dispatch(listAllProdsFN(newListFN(listAllProds)));
    const send = {
      action_type: 4,
      status: checkedStatus ? 1 : 0,
      list_guids,
      guid: "F2EE6BE3-548A-437C-9801-4F1C54B42170",
    };
    setCheckedStatus(!checkedStatus);

    const res = await dispatch(crudListWorkShopActiveReq(send)).unwrap();
    if (res != 1) {
      myAlert("Упс, повторите пожалуйста еще раз", "error");
      dispatch(listAllProdsFN(listAllProds));
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // Если элемент перетащили за пределы списка, ничего не делаем

    // Создаем копию массива товаров (глубокое копирование, чтобы избежать read-only ошибок)
    const updatedProducts = item?.prods?.map((product) => ({ ...product }));

    // Получаем элементы, которые меняем местами
    const draggedItem = updatedProducts?.[result?.source?.index];
    const targetItem = updatedProducts?.[result?.destination?.index];

    if (!draggedItem || !targetItem) return; // Проверка, чтобы не было ошибок

    // 🔥 Меняем `position` местами
    const tempPosition = draggedItem.position;
    draggedItem.position = targetItem.position;
    targetItem.position = tempPosition;

    // Удаляем перемещаемый элемент из старой позиции
    const draggedProduct = updatedProducts.splice(result.source.index, 1)[0];

    // Вставляем его в новую позицию
    updatedProducts?.splice(result?.destination?.index, 0, draggedProduct);

    // Обновляем список категорий в Redux
    const updatedCategories = listAllProds?.map((category) =>
      category?.category_guid === item?.category_guid
        ? { ...category, prods: updatedProducts }
        : category
    );

    dispatch(listAllProdsFN(updatedCategories));
    setCheckedPosition(item?.category_guid); /// проверяю менялось ли что-то в списке
  };

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, background: "#edf2f985" }}
      >
        <TableCell
          sx={{ width: 56, padding: 1 }}
          onClick={() => clickCateg(item?.category_guid)}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton aria-label="expand row" size="small">
              {activeCateg == item?.category_guid ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </div>
        </TableCell>
        <TableCell
          sx={{ fontSize: 16, fontWeight: 600, paddingLeft: "5px" }}
          onClick={() => clickCateg(item?.category_guid)}
        >
          {item?.category_name || "..."}
        </TableCell>
        <TableCell sx={{ width: 82, fontSize: 16, fontWeight: 600 }}>
          <Checkbox
            checked={!!checked}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
            color="success"
            onChange={() => onChangeMain(item)}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse
            in={activeCateg == item?.category_guid}
            timeout={item?.prods?.length < 120 ? "auto" : 200}
            unmountOnExit
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable-prods">
                {(provided) => (
                  <Table
                    size="small"
                    aria-label="purchases"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <TableBody>
                      {item?.prods?.map((i, ind) => (
                        <SortMyEveryProd
                          i={i}
                          ind={ind}
                          listAllProds={listAllProds}
                          key={ind}
                        />
                      ))}
                      {provided?.placeholder}
                    </TableBody>
                  </Table>
                )}
              </Droppable>
            </DragDropContext>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableList;

TableList.propTypes = {
  row: PropTypes.shape({
    ind: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    prods: PropTypes.arrayOf(
      PropTypes.shape({
        ind: PropTypes.number.isRequired,
        historyRow: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
