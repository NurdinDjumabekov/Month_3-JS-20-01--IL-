////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

////// fns
import {
  activeSlideFN,
  getEverySubInvoice,
  getListKopt,
} from "../../../store/reducers/mainSlice";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";

////// style
import "./style.scss";

///// helpers
import { roundingNum } from "../../../helpers/totals";
import { format } from "date-fns";

//// icons
import AddIcon from "@mui/icons-material/Add";
import { NoneBtn } from "../CreateInvoicePage/CreateInvoicePage";
import Slider from "react-slick";
import ViewSubInvoice from "../../../components/ApplicationsPages/EverySubInvoicePage/ViewSubInvoice/ViewSubInvoice";
import VeiwProducts from "../../../components/ApplicationsPages/EverySubInvoicePage/VeiwProducts/VeiwProducts";

const EverySubInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  // console.log(state, "state");

  const listActionsRef = useRef(null);
  const menuRefs = useRef([]);
  const sliderRef = useRef(null);

  const { listMenu, activeSlide } = useSelector((state) => state.mainSlice);
  const { listKoptilshiks } = useSelector((state) => state.mainSlice);
  const { everySubInvoice } = useSelector((state) => state.mainSlice);

  useEffect(() => {
    dispatch(getListKopt());
    getData();
  }, [state?.guid_sub_invoice]);

  const getData = () => {
    dispatch(getEverySubInvoice({ guid_sub_invoice: state?.guid_sub_invoice }));
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NoneBtn />,
    prevArrow: <NoneBtn />,
    initialSlide: activeSlide,
    afterChange: (current) => {
      dispatch(activeSlideFN(current));
      const isLastElement = current === listMenu?.length - 1;
      if (isLastElement) {
        listActionsRef.current.scrollLeft = listActionsRef.current.scrollWidth;
      } else {
        menuRefs.current[current]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    },
  };

  const handleMenuClick = (codeid) => {
    dispatch(activeSlideFN(codeid));
    sliderRef.current?.slickGoTo(codeid);
  };

  // console.log(listKoptilshiks, "listKoptilshiks");

  const createSubInvoice = async () => {};

  return (
    <div className="listInvoicePage subInvoices">
      <NavMenu navText={`Накладная № ${everySubInvoice?.codeid}`} />
      <div className="actionForPoints">
        <div className="listActions" ref={listActionsRef}>
          {listMenu?.map(({ codeid, name }, idx) => (
            <p
              key={codeid}
              ref={(el) => (menuRefs.current[idx] = el)}
              className={codeid === activeSlide ? "actives" : ""}
              onClick={() => handleMenuClick(codeid)}
            >
              {name}
            </p>
          ))}
        </div>
        <div className="actionForPoints__content">
          <Slider ref={sliderRef} {...settings}>
            <div className="everySlide">
              <ViewSubInvoice item={everySubInvoice} getData={getData} />
            </div>

            <div className="everySlide">
              <VeiwProducts products={everySubInvoice?.products} />
            </div>
          </Slider>
        </div>
      </div>

      {/* <button className="createBtns" onClick={createSubInvoice}>
        <AddIcon sx={{ color: "#fff" }} />
        <p>Создать накладную</p>
      </button> */}
    </div>
  );
};

export default EverySubInvoicePage;
