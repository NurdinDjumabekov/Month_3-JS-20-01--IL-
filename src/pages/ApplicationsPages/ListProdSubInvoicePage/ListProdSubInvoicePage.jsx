////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

////// fns
import {
  activeSlideForProdFN,
  getEverySubInvoiceReq,
} from "../../../store/reducers/mainSlice";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import { NoneBtn } from "../CreateInvoicePage/CreateInvoicePage";
import Slider from "react-slick";
import VeiwProducts from "../../../components/ApplicationsPages/EverySubInvoicePage/VeiwProducts/VeiwProducts";
import ListEveryUser from "../../../components/InvoicesPages/ListEveryUser/ListEveryUser";

////// style
import "./style.scss";

///// helpers
import { listMenuProdsLocal } from "../../../helpers/LocalData";

//// icons
import arrow from "../../../assets/icons/arrowNav.svg";
import SettingsIcon from "@mui/icons-material/Settings";

const ListProdSubInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const listActionsRef = useRef(null);
  const menuRefs = useRef([]);
  const sliderRef = useRef(null);

  const { listActiveProds } = useSelector((state) => state.mainSlice);
  const { listMenu, activeSlideForProd, everySubInvoice, listAllProds } =
    useSelector((state) => state.mainSlice);

  useEffect(() => {
    dispatch(getEverySubInvoiceReq({ guid_sub_invoice: state }));
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NoneBtn />,
    prevArrow: <NoneBtn />,
    initialSlide: activeSlideForProd,
    afterChange: (current) => {
      dispatch(activeSlideForProdFN(current));
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
    dispatch(activeSlideForProdFN(codeid));
    sliderRef.current?.slickGoTo(codeid);
  };

  return (
    <div className="listInvoicePage subInvoices innerSlider">
      <NavMenu>
        <div className="nav" onClick={() => navigate(-1)}>
          <button className="navArrow">
            <img src={arrow} alt="<" />
          </button>
          <p className="navText">Выбор продукции</p>
        </div>
        <SettingsIcon
          onClick={() => navigate("/setting/list")}
          sx={{ width: 25, height: 25, color: "gray" }}
        />
      </NavMenu>
      <div className="actionForPoints">
        <div className="listActions" ref={listActionsRef}>
          {listMenuProdsLocal?.map(({ codeid, name }, idx) => (
            <p
              key={codeid}
              ref={(el) => (menuRefs.current[idx] = el)}
              className={codeid == activeSlideForProd ? "actives" : ""}
              onClick={() => handleMenuClick(codeid)}
            >
              {name}
            </p>
          ))}
        </div>
        <div className="actionForPoints__content">
          <Slider ref={sliderRef} {...settings}>
            <div className="everySlide">
              <ListEveryUser
                list={listAllProds}
                type={1}
                guid_sub_invoice={state}
              />
            </div>

            <div className="everySlide">
              <ListEveryUser
                list={listActiveProds}
                type={2}
                guid_sub_invoice={state}
              />
            </div>

            <div className="everySlide">
              <VeiwProducts
                products={everySubInvoice?.products}
                guid_sub_invoice={state}
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ListProdSubInvoicePage;
