///// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

////// style
import "./style.scss";

////// components

/////// fns

const MainLayouts = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { guid } = useSelector((state) => state.saveDataSlice?.dataSave);

  useEffect(() => {}, []);

  const checkMap = "/points/maps" == pathname;

  return (
    <div className="layouts">
      <div className={`pages ${checkMap ? "mapsStyle" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;
