import { Order } from "../apis/types";
import styled from "styled-components";
import { selectOrderList } from "../apis/api";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import Modal from "../common/Modal";

const OrderList = () => {
  const [data, setList] = useState<Order[]>([]);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setClose(true);
    setOpen(false);
  };
  useEffect(() => {
    selectOrderList().then((res) => setList(res));
  }, []);

  const getList = (lists: Order[]) => {
    if (!Array.isArray(lists) || lists.length === 0) return [];
    return lists.map((list) => {
      return <OrderCard data={list} key={list.id} />;
    });
  };

  return (
    <List>
      <div
        className="order-btn"
        onClick={() => {
          openModal();
        }}
      >
        <span>주문하기</span>
      </div>
      <Modal open={open} close={closeModal} header="주문하기">
        <main> 모달 오픈 </main>
      </Modal>
      {getList(data)}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  .order-btn {
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
export default OrderList;
