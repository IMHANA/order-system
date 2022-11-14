import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { modifyOrder, selectOrderList, selectUserList } from "src/apis/api";
import { CreateOrder, IOrder, IUser } from "src/apis/types";
import styled from "styled-components";
import EditMode from "./EditMode";
import ReadMode from "./ReadMode";

const Order = () => {
  const { order, user, allUser, bodyData, setBodyData, onSubmit } = useOrder();
  // Read & Edit switch
  const [onRead, setOnRead] = useState<boolean>(true);

  const InfoTable = React.useMemo(() => {
    if (!user || !order) return <></>;
    return (
      <>
        {onRead ? (
          <ReadMode userData={user} orderData={order} />
        ) : (
          <EditMode
            userData={user}
            orderData={order}
            allUser={allUser}
            bodyData={bodyData}
            setBodyData={setBodyData}
          />
        )}
      </>
    );
  }, [allUser, bodyData, onRead, order, setBodyData, user]);

  const handleEdit = async () => {
    if (!onRead && bodyData) {
      await onSubmit(() => setOnRead(!onRead));
      return;
    }
    setOnRead(!onRead);
  };

  return (
    <OrderLayout>
      <div className="btn" onClick={handleEdit}>
        <span>{onRead ? "수정" : "저장"}</span>
      </div>
      {InfoTable}
    </OrderLayout>
  );
};

//* hooks */
function useOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder>();
  const [user, setUser] = useState<IUser>();
  const [allUser, setAllUser] = useState<IUser[]>();
  // 주문 수정시 body param
  const [bodyData, setBodyData] = useState<CreateOrder>();

  //* Order & User api */
  const getAllData = async () => {
    const res = await selectOrderList();
    const [target] = res.filter((item) => item.id === Number(id));

    const res1 = await selectUserList();

    const [findUser] = res1.filter((user) => user.id === target?.customerId);
    const bodyItem = target && {
      customerId: target.customerId,
      address1: target.address1,
      address2: target.address2,
      totalPrice: target.totalPrice,
    };
    // 초기값 세팅
    setUser(findUser);
    setAllUser([...res1]);
    setOrder(target);
    setBodyData(bodyItem);
  };

  //* Order Update api */
  const onSubmit = async (callback?: () => void) => {
    if (bodyData && order) {
      await modifyOrder(Number(id), {
        customerId: bodyData.customerId ?? order.customerId,
        address1: bodyData.address1 ?? order.address1,
        address2: bodyData.address2 ?? order.address2,
        totalPrice: bodyData.totalPrice ?? order.totalPrice,
      });
      await getAllData();
      callback?.();
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return {
    allUser,
    order,
    user,
    bodyData,
    onSubmit,
    setBodyData,
  };
}

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
    select,
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
