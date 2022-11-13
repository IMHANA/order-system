import React from "react";
import { useEffect, useState } from "react";
import { selectOrderList, selectUserList } from "src/apis/api";
import { IOrder, IUser } from "src/apis/types";
import styled from "styled-components";

const Order = () => {
  const search = window.location.pathname.replace("/orders/", "");

  const [order, setOrder] = useState<IOrder>();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    selectOrderList().then((res) => {
      const finditems = res.filter((item) => item.id === Number(search));
      setOrder(finditems.length > 0 ? finditems[0] : undefined);
    });
  }, [search]);

  useEffect(() => {
    selectUserList().then((res) => {
      const findUser = res.filter((user) => user.id === order?.customerId);
      setUser(findUser.length > 0 ? findUser[0] : undefined);
    });
  }, [order]);

  return (
    <OrderLayout>
      <div className="btn">
        <span>수정</span>
      </div>
      <p>{order?.id}</p>
      <p>{order?.totalPrice}</p>
      <p>{order?.address1}</p>
      <p>{order?.address2}</p>
      <p>{order?.totalPrice}</p>
      <p>{order?.customerId}</p>
      <p>{user?.name}</p>
      <p>{user?.createdAt}</p>
    </OrderLayout>
  );
};
const OrderLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10% 20%;
  .btn {
    align-self: end;
    margin: 16px 0;
    width: 100vw;
    max-width: 375px;
    height: 40px;
    border: 1px solid #868e9c;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    > span {
      color: #868e9c;
    }
  }
`;

export default Order;
