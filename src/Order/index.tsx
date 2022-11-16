import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { modifyOrder, selectOrderList, selectUserList } from "../apis/api";
import { CreateOrder, IOrder, IUser } from "../apis/types";
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

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .user,
  .order {
    font-weight: 600;
    border-bottom: 1px solid #eaeaea;
  }

  .user,
  .user-info,
  .order,
  .order-info {
    display: flex;
    align-items: center;

    .select-wrap {
      min-width: 20%;

      select {
        border-bottom: 1px solid #eb9077;
        width: 80%;
      }
    }
    .input-wrap {
      border-bottom: 1px solid #eb9077;
      &:not(:last-of-type) {
        border-right: 1px solid #f3e3de;
      }
    }

    > span,
    select,
    input {
      display: flex;
      min-width: 20%;
      min-height: 50px;
      border: none;
      align-items: center;
      padding-left: 10px;
      font-size: 16px;

      &::placeholder {
        font-size: 16px;
        color: #b7b6b6;
      }
    }
  }

  .edit {
    color: #b00000;
  }

  .user-info {
    margin-bottom: 30px;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: end;
    width: 100vw;
    max-width: 375px;
    min-height: 40px;
    margin: 16px 0;
    margin-bottom: 20%;
    border: 1px solid #868e9c;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #e7eaef;
      border: none;
      > span {
        color: #111;
        font-weight: bold;
      }
    }

    > span {
      color: #868e9c;
    }
  }
`;

export default Order;
