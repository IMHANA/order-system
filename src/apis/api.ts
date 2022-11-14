import { API } from "./utils/config";
import {
  ApiRequestData,
  ApiRequestOption,
  CreateOrder,
  IOrder,
  IUser,
} from "./types";

/**
 * 공통 api 호출 - fetch
 * @param data
 * @returns response Data
 */

const sendAPI = <T>(data: ApiRequestData): Promise<T> => {
  const { endpoint, method, param = {}, body } = data;
  const apiUrl = new URL(`${API.IP}/${endpoint}`);
  //url set param
  for (const [_key, _value] of Object.entries(param)) {
    apiUrl.searchParams.set(_key, String(_value));
  }
  const apiOption: ApiRequestOption = {
    method,
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  };

  if (body) apiOption.body = JSON.stringify(body);

  return fetch(apiUrl, apiOption).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const result = res.json();
    return result;
  });
};

/**
 * 모든 주문 조회
 * @returns Array<IOrder>
 */
export const selectOrderList = async () => {
  const result: Array<IOrder> = await sendAPI({
    endpoint: "orders",
    method: "GET",
  });
  console.log(result);
  return result;
};

/** 
 *  const body = {
      customerId: 1,
      address1: "서울시 강남구 강남대로112길",
      address2: "",
      totalPrice: 3000,
    };
    createOrder(body);
 * 
 */
/**
 * 주문 생성
 * @param _body
 * @returns insert Data
 */
export const createOrder = async (_body: CreateOrder): Promise<IOrder> => {
  const result: IOrder = await sendAPI({
    endpoint: "orders",
    method: "POST",
    body: _body,
  });
  console.log(result);
  return result;
};

/**
 *    const updateOrder = () => {
    const body = {
      customerId: 1,
      address1: "서울시 강남구 강남대로112길",
      address2: "",
      totalPrice: 5000,
    };
    modifyOrder(227, body);
  };
*/
/**
 * 주문 수정
 * @param _body
 * @returns update Data
 */
export const modifyOrder = async (_id: number, _body: CreateOrder) => {
  const result: IOrder = await sendAPI({
    endpoint: `orders/${_id}`,
    method: "PUT",
    body: _body,
  });
  console.log(result);
  return result;
};

/**
 * 모든 고객 조회
 * @returns<IUser>
 */
export const selectUserList = async () => {
  const result: Array<IUser> = await sendAPI({
    endpoint: "users",
    method: "GET",
  });
  console.log(result);
  return result;
};
