import { Link } from "react-router-dom";
import { IOrder } from "src/apis/types";
import { dateFormat } from "src/common/utils";
import styled from "styled-components";

interface Props {
  data: IOrder;
}
const OrderCard = ({ data }: Props) => {
  // const checkTime = (time: string) => {
  //   if (time.length === 1) return "0" + time;
  //   return time;
  // };

  // const dateFormat = (date: string) => {
  //   if (!data) return "";
  //   let newDate = new Date(date).toISOString().replace("T", "");
  //   let returnDate =
  //     newDate.substring(0, 10) +
  //     " " +
  //     checkTime(newDate.substring(11, 12)) +
  //     ":" +
  //     checkTime(newDate.substring(14, 15));
  //   return returnDate;
  // };

  const getOrderWindow = (id: number) => {
    return window.open("/orders/" + id);
  };

  return (
    <Card>
      <p
        className="order-id"
        onClick={() => data.id && getOrderWindow(data.id)}
      >
        {data.id}
      </p>
      <div>
        <p className="time">
          주문생성일자 : {data.createdAt && dateFormat(data.createdAt)}
        </p>
        <p className="user-id">고객 ID : {data.customerId}</p>
        <p className="address-first">주소1 : {data.address1}</p>
        <p className="address-second">주소2 : {data.address2}</p>
        <p className="price">주문가격 : {data.totalPrice.toLocaleString()}원</p>
      </div>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  margin-bottom: 2px;
  display: flex;
  justify-content: space-between;
  .order-id {
    display: block;
    font-size: 24px;
    font-weight: bold;
    width: 50%;
    text-align: center;
  }
  > div {
    width: 50%;
    align-items: center;
    text-align: center;
    > p {
      text-align: left;
    }
  }
`;
export default OrderCard;
