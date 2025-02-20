//////// hooks
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/////// components
import MainPage from "../MainPage/MainPage";
import CreateInvoicePage from "./CreateInvoicePage/CreateInvoicePage";
import InputInvoicePage from "./InputInvoicePage/InputInvoicePage";
import ListInvoicePage from "./ListInvoicePage/ListInvoicePage";
import ListSubInvoicePage from "./ListSubInvoicePage/ListSubInvoicePage";
import CreateSubInvoice from "./CreateSubInvoice/CreateSubInvoice";
import EverySubInvoicePage from "./EverySubInvoicePage/EverySubInvoicePage";
import ListProdSubInvoicePage from "./ListProdSubInvoicePage/ListProdSubInvoicePage";

const InvoicePages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location, "location");

  return (
    <Routes>
      <Route path="/main" element={<ListInvoicePage />} />
      <Route path="/list_sub_invoice" element={<ListSubInvoicePage />} />
      <Route path="/every_sub_invoice" element={<EverySubInvoicePage />} />
      <Route path="/crud_invoice" element={<ListProdSubInvoicePage />} />
      <Route path="/input_prods" element={<InputInvoicePage />} />
      <Route path="/create_sub_invoice" element={<CreateSubInvoice />} />
      {/* <Route path="/crud_invoice" element={<CreateInvoicePage />} /> */}
    </Routes>
  );
};

export default InvoicePages;
/// <Autocomplete isLoaded={isLoaded} onPlaceSelect={setCenter} />
/// AIzaSyD8hB-KDvF4vITv4idoxn2DqqMdJffJGd8
