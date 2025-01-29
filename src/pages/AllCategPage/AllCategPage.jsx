///// hooks
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

/////  components
import UserInfo from "../../components/AllCategPage/UserInfo/UserInfo";
import { LogOut } from "../../components/AllCategPage/LogOut/LogOut";
import NavMenu from "../../common/NavMenu/NavMenu";
import { BottomSheet } from "react-spring-bottom-sheet";

////// helpers
import { dataCategory } from "../../helpers/LocalData";

///// icons
import ArrowNav from "@mui/icons-material/ArrowForwardIosSharp";

////// styles
import "./style.scss";

const AllCategPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const clickCateg = (obj) => {
    navigate(`${obj?.link}`, {
      id: obj?.codeid,
      name: obj?.name,
      pathApi: obj?.pathApi,
    });
  };

  return (
    <>
      <NavMenu>
        <UserInfo /> <LogOut />
      </NavMenu>

      <div className="allCateg">
        {dataCategory?.map((item, index) => (
          <button
            key={index}
            className="parentCateg"
            onClick={() => clickCateg(item)}
          >
            <div className="shadow"></div>
            <img src={item?.img} className="backgroundImage" />
            <div className="main">
              <p className="textTitle">{item?.name}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default AllCategPage;
