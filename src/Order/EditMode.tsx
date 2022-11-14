import { useState } from "react";
import { CreatOrder, IOrder, IUser } from "src/apis/types";
import { amountFormat, dateFormat } from "src/common/utils";

interface Props {
  userData: IUser;
  orderData: IOrder;
  allUser: IUser[] | undefined;
  onSubmit: ({
    customerId,
    address1,
    address2,
    totalPrice,
  }: CreatOrder) => void;
}
// TODO: input값 바뀌면 저장했다가 값 비교 후 기존값과 다르면 modifyOrder()로 업데이트api 호출
//* Can Edit (address1, address2, totalPrice) */
const EditMode = ({ allUser, userData, orderData, onSubmit }: Props) => {
  const [bodyData, setBodyData] = useState<CreatOrder>();

  const userOptions = () => {
    if (allUser) {
      const restData = allUser
        .map((user) => user)
        .filter((name) => name.id !== userData.id);

      const rest = restData.map((user) => {
        return <option value={user.name}>{user.name}</option>;
      });
      return (
        <>
          <option value={userData.name} selected>
            {userData.name}
          </option>
          {rest}
        </>
      );
    }
  };

  return (
    <form onSubmit={() => bodyData && onSubmit(bodyData)}>
      <p>주문자 정보</p>
      <div className="user">
        <span>주문자ID</span>
        <span>주문자명</span>
        <span>주문자 생성일자</span>
      </div>
      <div className="user-info">
        <span>{userData.id}</span>
        <select>{userOptions()}</select>
        <span>{dateFormat(userData.createdAt)}</span>
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
    </form>
  );
};
export default EditMode;
