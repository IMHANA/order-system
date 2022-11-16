import GlobalStyle from "./styles/global";
import { Navigate, Routes, Route } from "react-router-dom";
import OrderList from "./OrderList";
import Order from "./Order";
import React from "react";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigate to="/orders" />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:id" element={<Order />} />
      </Routes>
    </>
  );
}

export default App;
