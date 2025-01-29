import MainRoutes from "./routers/MainRoutes";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/////// hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// fns
import { sendGeoUser, setMapGeo } from "./store/reducers/mapSlice";
import { Preloader } from "./common/Preloader/Preloader";

const App = () => {
  const dispatch = useDispatch();

  const dataSave = useSelector((state) => state.saveDataSlice);

  console.log(dataSave, "dataSave");

  return (
    <>
      <MainRoutes />
      <Preloader />
    </>
  );
};

export default App;
