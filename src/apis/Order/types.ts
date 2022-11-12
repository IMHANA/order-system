export interface Order {
  /** 주문 id */
  id: number;
  /** 고객 id */
  customerId: number;
  /** 배송지 주소 1 */
  address1: string;
  /** 배송지 주소 2 */
  address2: string;
  /** 주문 금액 */
  totalPrice: number;
  /** 주문 일시 */
  createdAt: string;
}
