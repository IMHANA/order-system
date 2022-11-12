import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  open: boolean;
  close: () => void;
  header: string;
  children: ReactNode;
}

const Modal = ({ open, close, header }: Props) => {
  const [inputName, setInputName] = useState<string>("");
  const [inputAddress, setInputAddress] = useState<string>("");
  const [inputAmount, setInputAmount] = useState<number>(0);

  const handleName = (name: string) => {
    setInputName(name);
  };
  const handleAddress = (address: string) => {
    setInputAddress(address);
  };
  const handleAmount = (amount: number | string) => {
    let check = /^[0-9]+$/;
    if (!check.test(amount.toString())) {
      setInputAmount(0);
      alert("숫자만 입력 가능합니다.");
    }
    setInputAmount(Number(amount));
  };
  const handleChange = () => {};

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
              <form className="input-container" onSubmit={handleChange}>
                <input
                  id="name"
                  placeholder="주문자명"
                  onChange={(e) => handleName(e.currentTarget.value)}
                ></input>
                <input
                  id="address"
                  placeholder="배송지 주소"
                  onChange={(e) => handleAddress(e.currentTarget.value)}
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
              <button className="close" onClick={close}></button>
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
    text-align: right;
  }
  .modal > section > footer button {
    padding: 6px 12px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 13px;
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
    > input {
      border: 1px solid #868e9c;
      width: 80%;
      height: 30px;
      border-radius: 5px;
      padding: 5px;
      margin-bottom: 15px;
    }
    .make-btn {
      margin: 16px 0;
      width: 100vw;
      max-width: 375px;
      height: 40px;
      border: 1px solid #868e9c;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
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
