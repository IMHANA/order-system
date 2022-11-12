export interface ApiRequestData {
  endpoint: string;
  method: string;
  param?: {};
  body?: {};
}

export interface ApiRequestOption {
  method: string;
  headers: {};
  body?: string;
}

export interface User {
  /** 고객 id */
  id: number;
  /** 고객명 */
  name: string;
  /** 고객 생성일자 */
  createdAt: string;
}

export interface Order {
  /** 주문 id */
  id?: number;
  /** 고객 id */
  customerId: number;
  /** 배송지 주소 1 */
  address1: string;
  /** 배송지 주소 2 */
  address2: string;
  /** 주문 금액 */
  totalPrice: number;
  /** 주문 일시 */
  createdAt?: string;
}
