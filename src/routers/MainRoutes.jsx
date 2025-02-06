////hooks
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//// components
import MainLayouts from "../layouts/MainLayouts/MainLayouts";
import LoginPage from "../pages/LoginPage/LoginPage";
import AllCategPage from "../pages/AllCategPage/AllCategPage";
import LeftoversPage from "../pages/LeftoversPage/LeftoversPage";
import ExpensePage from "../pages/ExpensePage/ExpensePage";
import ActionsInPointsPage from "../pages/ActionsInPointsPage/ActionsInPointsPage";
import WorkshopPages from "../pages/WorkshopPages/WorkshopPages";
import InvoicePages from "../pages/ApplicationsPages/InvoicePages";
import SettingsPages from "../pages/SettingsPages/SettingsPages";
// import { Preloader } from "../components/Preloader/Preloader";

////fns

const MainRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { dataSave } = useSelector((state) => state.saveDataSlice);
  const { listProds, listTA } = useSelector((state) => state.orderSlice);
  const { listTitleOrders } = useSelector((state) => state.orderSlice);
  const { listOrders, invoiceInfo } = useSelector((state) => state.orderSlice);
  const { activeRouteList } = useSelector((state) => state.photoSlice);

  return (
    <Routes>
      {!!!dataSave?.guid ? (
        <Route path="/" element={<LoginPage />} />
      ) : (
        <Route element={<MainLayouts />}>
          <Route path="/" element={<AllCategPage />} />
          <Route path="/invoice/*" element={<InvoicePages />} />
          <Route path="/setting/*" element={<SettingsPages />} />

          {/* <Route path="/invoice/*" element={<WorkshopPages />} />
          <Route path="/leftovers" element={<LeftoversPage />} />
          <Route path="/expense" element={<ExpensePage />} />
          <Route path="/points/*" element={<ActionsInPointsPage />} /> */}
        </Route>
      )}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default MainRoutes;
/// window.scrollTo({ top: 0, behavior: "smooth" });
