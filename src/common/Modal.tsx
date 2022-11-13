import { ReactNode, useEffect, useState } from "react";
import { createOrder, selectUserList } from "../apis/api";
import styled from "styled-components";
import { User } from "src/apis/types";

interface Props {
  open: boolean;
  close: () => void;
  header: string;
  children: ReactNode;
  handleSubmit: (
    customerId: number,
    address1: string,
    address2: string,
    totalPrice: number
  ) => void;
}

const Modal = ({ open, close, header, handleSubmit }: Props) => {
  const [inputUserId, setInputUserId] = useState<number>(0);
  const [inputAddress1, setInputAddress1] = useState<string>("");
  const [inputAddress2, setInputAddress2] = useState<string>("");
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [user, setUser] = useState<User[]>();

  useEffect(() => {
    selectUserList().then((res) => setUser(res));
  }, []);

  const handleName = (name: string) => {
    if (!name) alert("다시 선택해주세요");
    const userId = user?.find((users) => users.name === name);
    if (userId) setInputUserId(userId.id);
  };

  const handleAddress1 = (address: string) => {
    setInputAddress1(address);
  };

  const handleAddress2 = (address: string) => {
    setInputAddress2(address);
  };

  const handleAmount = (amount: number | string) => {
    let check = /^[0-9]+$/;
    if (!check.test(amount.toString())) {
      setInputAmount(0);
      alert("숫자만 입력 가능합니다.");
    }
    setInputAmount(Number(amount));
  };

  const sendChanges = () => {
    handleSubmit(inputUserId, inputAddress1, inputAddress2, inputAmount);
  };

  const getUsers = () => {
    return user?.map((u) => {
      return <option value={u.name}>{u.name}</option>;
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
              <form className="input-container" onSubmit={sendChanges}>
                <select
                  name="user-name"
                  onChange={(e) => handleName(e.currentTarget.value)}
                >
                  {getUsers()}
                </select>
                <input
                  id="address1"
                  placeholder="배송지 주소1"
                  onChange={(e) => handleAddress1(e.currentTarget.value)}
                ></input>
                <input
                  id="address2"
                  placeholder="배송지 주소2"
                  onChange={(e) => handleAddress2(e.currentTarget.value)}
                ></input>
                <input
                  id="amount"
                  placeholder="주문 금액"
                  onChange={(e) => handleAmount(e.currentTarget.value)}
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
    cursor: pointer;
    border: 0;
  }
  .modal > section {
    width: 90%;
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
    background-color: #f1f1f1;
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
    padding: 6px 12px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 15px;
    width: 20%;
    height: 30px;
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
      border: 1px solid #868e9c;
      width: 80%;
      height: 30px;
      border-radius: 5px;
      padding: 5px;
      margin-bottom: 15px;
    }
    .make-btn {
      margin: 16px 0;
      width: 80%;
      height: 40px;
      border: 1px solid #6c757d;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
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
