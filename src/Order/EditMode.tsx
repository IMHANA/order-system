import { IOrder, IUser } from "src/apis/types";
import { amountFormat, dateFormat } from "src/common/utils";

interface Props {
  userData: IUser;
  orderData: IOrder;
}

const EditMode = ({ userData, orderData }: Props) => {
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
        <input id="address1" type="input" placeholder={orderData.address1} />
        <input id="address2" type="input" placeholder={orderData.address2} />
        <input
          id="totalPrice"
          type="input"
          placeholder={amountFormat(orderData.totalPrice)}
        />
        <span>{dateFormat(orderData?.createdAt)}</span>
      </div>
    </>
  );
};
export default EditMode;
