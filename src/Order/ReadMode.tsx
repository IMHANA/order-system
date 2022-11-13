import { IOrder, IUser } from "src/apis/types";
import { dateFormat } from "src/common/utils";

interface Props {
  userData: IUser;
  orderData: IOrder;
}
const ReadMode = ({ userData, orderData }: Props) => {
  return (
    <>
      <p>주문자 정보</p>
      <div className="user">
        <span>주문자ID</span>
        <span>주문자명</span>
        <span>주문자 생성일자</span>
      </div>
      <div className="user-info">
        <span>{userData?.id}</span>
        <span>{userData?.name}</span>
        <span>{dateFormat(userData?.createdAt)}</span>
      </div>

      <p>주문 정보</p>
      <div className="order">
        <span>주문ID</span>
        <span>배송지 주소1</span>
        <span>배송지 주소2</span>
        <span>주문금액</span>
        <span>주문일시</span>
      </div>
      <div className="order-info">
        <span>{orderData?.id}</span>
        <span>{orderData?.address1}</span>
        <span>{orderData?.address2}</span>
        <span>{orderData?.totalPrice}</span>
        <span>{dateFormat(orderData?.createdAt)}</span>
      </div>
    </>
  );
};
export default ReadMode;
