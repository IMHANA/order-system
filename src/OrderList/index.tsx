import { Order } from "../apis/types";
import styled from "styled-components";
import { selectOrderList } from "../apis/api";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

const OrderList = () => {
  const [data, setList] = useState<Order[]>([]);

  useEffect(() => {
    selectOrderList().then((res) => setList(res));
  }, []);

  const getList = (lists: Order[]) => {
    console.log("list = ", lists);
    if (!Array.isArray(lists) || lists.length === 0) return [];
    return lists.map((list) => {
      return <OrderCard data={list} key={list.id} />;
    });
  };

  return <List>{getList(data)}</List>;
};

const List = styled.div``;
export default OrderList;
