////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

////// fns
import {
  activeSlideFN,
  getListProdsReq,
} from "../../../store/reducers/mainSlice";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import { NoneBtn } from "../CreateInvoicePage/CreateInvoicePage";
import Slider from "react-slick";

////// style
import "./style.scss";

///// helpers
import { listMenuProdsLocal } from "../../../helpers/LocalData";
import AllListProd from "../../../components/ApplicationsPages/ListProdSubInvoicePage/AllListProd/AllListProd";

//// icons

const ListProdSubInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const listActionsRef = useRef(null);
  const menuRefs = useRef([]);
  const sliderRef = useRef(null);

  const { listMenu, activeSlide } = useSelector((state) => state.mainSlice);

  useEffect(() => {
    dispatch(getListProdsReq());
  }, []);

  const getData = () => {
    console.log("sadasd");
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

  return (
    <div className="listInvoicePage subInvoices">
      <NavMenu navText={`Выбор продукции`} />
      <div className="actionForPoints">
        <div className="listActions" ref={listActionsRef}>
          {listMenuProdsLocal?.map(({ codeid, name }, idx) => (
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
              <AllListProd />
            </div>

            <div className="everySlide"></div>

            <div className="everySlide"></div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ListProdSubInvoicePage;
