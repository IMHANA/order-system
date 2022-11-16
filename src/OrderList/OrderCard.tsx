import { amountFormat, dateFormat } from "../common/utils";
import styled from "styled-components";
import { newOrderList } from ".";

interface Props {
  data: newOrderList;
}
const OrderCard = ({ data }: Props) => {
  // 상세페이지 open
  const getOrderWindow = (id: number) => {
    return window.open("/orders/" + id);
  };

  return (
    <>
      <Card>
        <div className="info-container">
          <div className="tag">
            <span>주문자명</span>
            <span>주문일</span>
            <span>주소 1</span>
            <span>주소 2</span>
            <span>가격</span>
          </div>
          <div className="info">
            <span>{data.userName}</span>
            <span>
              {data.orderData.createdAt && dateFormat(data.orderData.createdAt)}
            </span>
            <span className="address">{data.orderData.address1}</span>
            <span className="address">{data.orderData.address2}</span>
            <span>{amountFormat(data.orderData.totalPrice)}</span>
          </div>
        </div>
        <div
          className="order-id"
          onClick={() => data.orderData.id && getOrderWindow(data.orderData.id)}
        >
          <span>{data.orderData.id}</span>
        </div>
      </Card>
      <Divider className="divider" />
    </>
  );
};

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  border-radius: 15px;
  &:hover {
    background-color: #e7eaef;
  }

  .order-id {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 100%;
    font-size: 24px;
    font-weight: bold;
    border-radius: 15px;
    cursor: pointer;
    &:hover > span {
      color: #b00000;
    }
  }

  .info-container {
    display: flex;
    align-items: center;
    width: 50%;
    text-align: center;
    flex-grow: 1;
    margin-left: 5%;

    div {
      display: flex;
      flex-direction: column;
      font-size: 15.5px;
    }
    .tag {
      text-align: center;
      width: 200px;
      padding-right: 20px;
      font-weight: 600;
      > span:not(:last-child) {
        border-bottom: 1px solid #f3f4f7;
      }
    }

    .info {
      text-align: left;
      width: 100%;
      > span {
        margin-bottom: 2px;
      }

      .address {
        display: -webkit-box;
        max-height: 14.5px;
        overflow: hidden;
        word-break: break-all;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        max-width: 450px;
      }
    }
  }
`;
const Divider = styled.div`
  width: 97%;
  border-bottom: 1px solid #e7eaef;
  align-self: center;
`;
export default OrderCard;
