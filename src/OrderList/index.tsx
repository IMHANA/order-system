import { CreateOrder, IOrder, IUser } from "../apis/types";
import styled from "styled-components";
import { selectOrderList, selectUserList } from "../apis/api";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import Modal from "../common/Modal";
import { createOrder } from "../apis/api";
import Pagenation, { LIMIT } from "./Pagenation";
import { useNavigate } from "react-router-dom";

export type newOrderList = {
  orderData: IOrder;
  userName: string;
};

const OrderList = () => {
  const {
    list,
    offset,
    open,
    page,
    setPage,
    openModal,
    closeModal,
    handleSubmit,
    user,
  } = useOrderList();

  // 주문정보 list
  const MainList = ({ lists }: { lists: newOrderList[] }) => {
    if (!Array.isArray(lists) || lists.length === 0) return <></>;
    return (
      <>
        {list.slice(offset, offset + LIMIT).map((list, idx) => {
          return <OrderCard data={list} key={idx + list.userName} />;
        })}
      </>
    );
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

      <div className="item-list">
        <MainList lists={list} />
      </div>

      <Pagenation
        className="page"
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
        user={user}
        handleSubmit={handleSubmit}
      />
    </List>
  );
};

//* hooks */
function useOrderList() {
  const [list, setList] = useState<newOrderList[]>([]);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const [user, setUser] = useState<IUser[]>();

  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const navigate = useNavigate();

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setClose(true);
    setOpen(false);
  };

  //* Order & User api */
  const getOrderList = async () => {
    const res = await selectOrderList();
    const res1 = await selectUserList();
    let newResList: newOrderList[] = [];
    res.map((data) => {
      const name = res1.filter((user) => user.id === data.customerId);
      return newResList.push({ orderData: data, userName: name[0].name });
    });

    setList(newResList);
    setUser(res1);
  };
  useEffect(() => {
    getOrderList();
  }, []);

  //* Create Order api */
  const handleSubmit = ({
    customerId,
    address1,
    address2,
    totalPrice,
  }: CreateOrder) => {
    const makeOrder = async () => {
      createOrder({ customerId, address1, address2, totalPrice }).then(
        (res) => {
          alert("주문작성 완료");
          navigate("/");
        }
      );
    };

    makeOrder();
  };

  return {
    list,
    offset,
    open,
    openModal,
    closeModal,
    page,
    setPage,
    handleSubmit,
    user,
  };
}

const List = styled.div<{ modalOpen: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 10% 20%;
  ${(props) =>
    props.modalOpen &&
    `position: fixed;
    overflow: hidden;
    width: 100%;
    height: 100%;
}`}

  .page {
    ${(props) => props.modalOpen && `display: none;`}
  }

  .order-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: end;
    width: 100vw;
    max-width: 375px;
    min-height: 40px;
    margin: 16px 0;
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
  .item-list {
    height: 100%;
  }
`;
export default OrderList;
