import { CreatOrder, IOrder } from "../apis/types";
import styled from "styled-components";
import { selectOrderList } from "../apis/api";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import Modal from "../common/Modal";
import { createOrder } from "../apis/api";
import Pagenation, { LIMIT } from "./Pagenation";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const [list, setList] = useState<IOrder[]>([]);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setClose(true);
    setOpen(false);
  };

  //* OrderList api */
  useEffect(() => {
    selectOrderList().then((res) => setList(res));
  }, []);

  const MainList = ({ lists }: { lists: IOrder[] }) => {
    if (!Array.isArray(lists) || lists.length === 0) return <></>;
    return (
      <>
        {list.slice(offset, offset + LIMIT).map((list) => {
          return <OrderCard data={list} key={list.id} />;
        })}
      </>
    );
  };

  //* Create Order api */
  const handleSubmit = (
    customerId: number,
    address1: string,
    address2: string,
    totalPrice: number
  ) => {
    const body: CreatOrder = {
      customerId: customerId,
      address1: address1,
      address2: address2,
      totalPrice: totalPrice,
    };

    createOrder(body).then((res) => {
      alert("주문작성 완료");
      navigate("/");
    });
  };

  return (
    <List modalOpen={open}>
      <div
        className="order-btn"
        onClick={() => {
          openModal();
        }}
      >
        <span>주문하기</span>
      </div>

      <MainList lists={list} />

      <Pagenation
        total={list.length}
        page={page}
        setPage={(page) => {
          setPage(page);
        }}
      />

      <Modal
        open={open}
        close={closeModal}
        header="주문하기"
        handleSubmit={handleSubmit}
      >
        <main></main>
      </Modal>
    </List>
  );
};

const List = styled.div<{ modalOpen: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 10% 20%;
  ${(props) =>
    props.modalOpen &&
    `position: fixed;
    overflow: hidden;
    width: 100%;
    height: 100%
}`}
  .order-btn {
    align-self: end;
    margin: 16px 0;
    width: 100vw;
    max-width: 375px;
    min-height: 40px;
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
