import { FormEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { selectUserList } from "../apis/api";
import styled from "styled-components";
import { CreateOrder, IUser } from "src/apis/types";

interface Props {
  open: boolean;
  close: () => void;
  header: string;
  children: ReactNode;
  handleSubmit: ({
    customerId,
    address1,
    address2,
    totalPrice,
  }: CreateOrder) => void;
}

const Modal = ({ open, close, header, handleSubmit }: Props) => {
  const [bodyData, setBodyData] = useState<CreateOrder>({
    customerId: 0,
    address1: "",
    address2: "",
    totalPrice: 0,
  });
  const [user, setUser] = useState<IUser[]>();

  useEffect(() => {
    selectUserList().then((res) => setUser(res));
  }, []);

  const handleStates = useCallback(
    (
      key: "customer" | "address1" | "address2" | "totalPrice",
      data: string | number
    ) => {
      if (key === "customer") {
        const userId = user?.find((users) => users.name === data);
        setBodyData({ ...bodyData, customerId: Number(userId?.id) });
      } else if (key === "address1") {
        setBodyData({ ...bodyData, address1: data.toString() });
      } else if (key === "address2") {
        setBodyData({ ...bodyData, address2: data.toString() });
      } else if (key === "totalPrice") {
        let check = /^[0-9]+$/;
        if (!check.test(data.toString())) {
          return alert("숫자만 입력 가능합니다.");
        }
        setBodyData({ ...bodyData, totalPrice: Number(data) });
      }
    },
    [bodyData, user]
  );

  const sendChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      bodyData.customerId === 0 ||
      bodyData.address1 === "" ||
      bodyData.address2 === "" ||
      bodyData.totalPrice === 0
    ) {
      alert("주문실패");
      close();
    }
    handleSubmit({
      customerId: bodyData.customerId,
      address1: bodyData.address1,
      address2: bodyData.address2,
      totalPrice: bodyData.totalPrice,
    });
  };

  const getUsers = () => {
    return user?.map((u) => {
      return (
        <option key={u.createdAt} value={u.name}>
          {u.name}
        </option>
      );
    });
  };

  return (
    <ModalContainer>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
              <form
                className="input-container"
                onSubmit={(e) => sendChanges(e)}
              >
                <select
                  id="user-name"
                  onChange={(e) =>
                    handleStates("customer", e.currentTarget.value)
                  }
                >
                  <option value="">주문자는 선택해주세요</option>
                  {getUsers()}
                </select>
                <input
                  id="address1"
                  placeholder="배송지 주소1"
                  onChange={(e) =>
                    handleStates("address1", e.currentTarget.value)
                  }
                ></input>
                <input
                  id="address2"
                  placeholder="배송지 주소2"
                  onChange={(e) =>
                    handleStates("address2", e.currentTarget.value)
                  }
                ></input>
                <input
                  id="amount"
                  placeholder="주문 금액"
                  onChange={(e) =>
                    handleStates("totalPrice", e.currentTarget.value)
                  }
                ></input>
                <button type="submit" className="make-btn">
                  생성하기
                </button>
              </form>
            </main>
            <footer>
              <button className="close" onClick={close}>
                close
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .modal button {
    outline: none;
    border: 0;
    cursor: pointer;
  }

  .modal > section {
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
  }

  .modal > section > header {
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #e7eaef;
    font-weight: 700;
  }

  .modal > section > header button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
  }

  .modal > section > main {
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
  }

  .modal > section > footer {
    padding: 12px 16px;
    text-align: center;
  }

  .modal > section > footer button {
    width: 20%;
    height: 30px;
    padding: 6px 12px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 15px;
  }

  .modal.openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.3s;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > input,
    select {
      width: 80%;
      height: 30px;
      padding: 5px;
      border: 1px solid #868e9c;
      margin-bottom: 15px;
      border-radius: 5px;
    }

    .make-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80%;
      height: 40px;
      margin: 16px 0;
      border: 1px solid #6c757d;
      background-color: #fff;
      border-radius: 5px;
      cursor: pointer;
      :hover {
        background-color: #6c757d;
        color: #fff;
      }
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }

  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
export default Modal;
