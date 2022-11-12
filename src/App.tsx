import GlobalStyle from "./styles/global";
import { Navigate, Routes, Route } from "react-router-dom";
import OrderList from "./OrderList";
import Order from "./Order";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigate to="/order" />} />
        <Route path="/order" element={<OrderList />} />
        <Route path="/orders/:id" element={<Order />} />
      </Routes>
    </>
  );
}

export default App;
