////// hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

////// fns
import {
  activeSlideForProdFN,
  getEverySubInvoiceReq,
  getListProdsReq,
} from "../../../store/reducers/mainSlice";

////// components
import NavMenu from "../../../common/NavMenu/NavMenu";
import { NoneBtn } from "../CreateInvoicePage/CreateInvoicePage";
import Slider from "react-slick";
import AllListProd from "../../../components/ApplicationsPages/ListProdSubInvoicePage/AllListProd/AllListProd";
import VeiwProducts from "../../../components/ApplicationsPages/EverySubInvoicePage/VeiwProducts/VeiwProducts";
import ListEveryUser from "../../../components/InvoicesPages/ListEveryUser/ListEveryUser";

////// style
import "./style.scss";

///// helpers
import { listMenuProdsLocal } from "../../../helpers/LocalData";

//// icons

const ListProdSubInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const listActionsRef = useRef(null);
  const menuRefs = useRef([]);
  const sliderRef = useRef(null);

  const { listMenu, activeSlideForProd } = useSelector(
    (state) => state.mainSlice
  );
  const { everySubInvoice } = useSelector((state) => state.mainSlice);
  const { listAllProds } = useSelector((state) => state.mainSlice);

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
      <NavMenu navText={`Выбор продукции`} />
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
              {/* <AllListProd guid_sub_invoice={state} /> */}
              <ListEveryUser list={listAllProds} type={1} />
            </div>

            <div className="everySlide">
              {/* <ListEveryUser list={listAllProds} type={2} /> */}
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
