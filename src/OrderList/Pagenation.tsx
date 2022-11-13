import styled from "styled-components";

interface Props {
  total: number;
  limit?: number;
  page: number;
  setPage: (page: number) => void;
}

export const LIMIT = 20;

function Pagination({ total, limit = LIMIT, page, setPage }: Props) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <ArrowButton onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </ArrowButton>
        {Array(numPages)
          .fill("")
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : false}
              isCurrent={page === i + 1 ? true : false}
            >
              {i + 1}
            </Button>
          ))}
        <ArrowButton
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          &gt;
        </ArrowButton>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button<{ isCurrent: boolean }>`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  color: #111;
  font-size: 1rem;

  &:hover {
    background: #111;
    color: #111;
    ${(props) => !props.isCurrent && "color:#eb9077;"}
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: #a2a2a2;
    color: #111;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    font-weight: bold;
    cursor: revert;
    transform: revert;
    border: 1px solid transparent;
    ${(props) =>
      props.isCurrent ? "background-color: #a9b6e4; " : "background-color:#fff"}
  }
`;

const ArrowButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: #fff;
  border: 1px solid #868e9c;
  color: #111;
  font-size: 1rem;
  margin: 0 15px;

  &:hover {
    background: #111;
    color: #ffffff;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: #a2a2a2;
    border: 1px solid transparent;
    color: #868686;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #fff;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
