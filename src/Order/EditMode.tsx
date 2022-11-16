import React from "react";
import { CreateOrder, IOrder, IUser } from "../apis/types";
import { amountFormat, dateFormat } from "../common/utils";

interface Props {
  userData: IUser;
  orderData: IOrder;
  allUser: IUser[] | undefined;
  bodyData: CreateOrder | undefined;
  setBodyData: ({
    customerId,
    address1,
    address2,
    totalPrice,
  }: CreateOrder) => void;
}

//* Edit available (userId, address1, address2, totalPrice) */
const EditMode = ({
  allUser,
  userData,
  orderData,
  bodyData,
  setBodyData,
}: Props) => {
  const UserOptions = () => {
    if (allUser && bodyData) {
      const restData = allUser.filter(
        (user) => user.id !== bodyData.customerId
      );

      return (
        <>
          {restData.map((user) => {
            return (
              <option key={user.createdAt} value={user.name}>
                {user.name}
              </option>
            );
          })}
        </>
      );
    }
    return <></>;
  };

  const handleChange = (
    key: "customer" | "address1" | "address2" | "totalPrice",
    data: string | number
  ) => {
    if (key === "customer" && bodyData) {
      const findId = allUser?.filter((user) => user.name === data);
      if (findId && findId.length > 0) {
        setBodyData({ ...bodyData, customerId: findId[0].id });
      }
    } else if (key === "address1" && bodyData) {
      setBodyData({ ...bodyData, address1: data.toString() });
    } else if (key === "address2" && bodyData) {
      setBodyData({ ...bodyData, address2: data.toString() });
    } else if (key === "totalPrice" && bodyData) {
      const price = data.toString().replace(/[^-0-9]/g, "");
      setBodyData({ ...bodyData, totalPrice: Number(price) });
    }
  };

  return (
    <>
      <p className="title">고객 정보</p>
      <div className="user">
        <span>주문자ID</span>
        <span className="edit">주문자명</span>
        <span>주문자 생성일자</span>
      </div>
      <div className="user-info">
        <span>{userData.id}</span>
        <div className="select-wrap">
          <select
            id="user-name"
            onChange={(e) => handleChange("customer", e.currentTarget.value)}
          >
            <option value={""}>
              {
                allUser?.filter((user) => user.id === bodyData?.customerId)[0]
                  .name
              }
            </option>
            <UserOptions />
          </select>
        </div>
        <span>{dateFormat(userData.createdAt)}</span>
      </div>
      <p className="title">주문 정보</p>
      <div className="order">
        <span>주문ID</span>
        <span className="edit">배송지 주소1</span>
        <span className="edit">배송지 주소2</span>
        <span className="edit">주문금액</span>
        <span>주문일시</span>
      </div>
      <div className="order-info">
        <span>{orderData?.id}</span>
        <input
          id="address1"
          className="input-wrap"
          type="input"
          placeholder={orderData.address1}
          onChange={(e) => handleChange("address1", e.currentTarget.value)}
        />
        <input
          id="address2"
          className="input-wrap"
          type="input"
          placeholder={orderData.address2}
          onChange={(e) => handleChange("address2", e.currentTarget.value)}
        />
        <input
          id="totalPrice"
          className="input-wrap"
          type="input"
          placeholder={amountFormat(orderData.totalPrice)}
          onChange={(e) => handleChange("totalPrice", e.currentTarget.value)}
        />
        <span>{dateFormat(orderData?.createdAt)}</span>
      </div>
    </>
    // </form>
  );
};
export default EditMode;
