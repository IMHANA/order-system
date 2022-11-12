import { Order } from "src/apis/types";
import styled from "styled-components";

interface Props {
  data: Order;
}
const OrderCard = ({ data }: Props) => {
  return (
    <Card>
      <p>{data.id}</p>
      <p>{data.createdAt}</p>
      <p>{data.customerId}</p>
      <p>{data.address1}</p>
      <p>{data.address2}</p>
      <p>{data.totalPrice}</p>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  margin-bottom: 2px;
`;
export default OrderCard;
