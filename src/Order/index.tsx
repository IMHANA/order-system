import React from "react";
import { useEffect, useState } from "react";
import { selectOrderList, selectUserList } from "src/apis/api";
import { IOrder, IUser } from "src/apis/types";
import styled from "styled-components";
import EditMode from "./EditMode";
import ReadMode from "./ReadMode";

const Order = () => {
  const search = window.location.pathname.replace("/orders/", "");

  const [order, setOrder] = useState<IOrder>();
  const [user, setUser] = useState<IUser>();
  const [onRead, setOnRead] = useState<boolean>(true);

  // Todo: then 안에서 유저정보 가져올것
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

  const InfoTable = React.useMemo(() => {
    if (onRead && user && order)
      return (
        <>
          <ReadMode userData={user} orderData={order} />
        </>
      );
    else if (!onRead && user && order)
      return (
        <>
          <EditMode userData={user} orderData={order} />
        </>
      );
    else return <></>;
  }, [onRead, user, order]);

  const buttonText = React.useMemo(() => {
    if (onRead) return "수정";
    else return "저장";
  }, [onRead]);

  return (
    <OrderLayout>
      <div className="btn" onClick={() => setOnRead(!onRead)}>
        <span>{buttonText}</span>
      </div>
      {InfoTable}
    </OrderLayout>
  );
};
const OrderLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10% 20%;

  .user,
  .user-info,
  .order,
  .order-info {
    display: flex;
    align-items: center;

    > span,
    input {
      display: inline-block;
      display: flex;
      min-width: 20%;
      min-height: 50px;
      border: 1px solid #ccc;
      align-items: center;
      padding-left: 10px;
    }
  }

  .user-info {
    margin-bottom: 20px;
  }

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
    margin-bottom: 20%;
    cursor: pointer;

    > span {
      color: #868e9c;
    }
  }
`;

export default Order;
