import {
  BsChevronDoubleLeft,
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleRight,
} from "react-icons/bs";
import styled from "@emotion/styled";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  & p {
    flex-grow: 1;
    text-align: center;
    color: rgba(105, 74, 225, 0.9);
    color: ${(props) => props.theme.headerPrimColor};
    font-size: 1.2rem;
    font-weight: 500;
    user-select: none;
  }

  & svg {
    cursor: pointer;
    color: ${(props) => props.theme.headerPrimColor};
    stroke-width: 0.9;
    width: 13px;
    height: 13px;
  }
`;

const CalendarHeader = ({ children, onChangeCurrentMonth }) => {
  return (
    <HeaderContainer>
      <BsChevronDoubleLeft onClick={() => onChangeCurrentMonth(-1, "year")} />
      <BsChevronLeft onClick={() => onChangeCurrentMonth(-1, "month")} />
      <p>{children}</p>
      <BsChevronRight onClick={() => onChangeCurrentMonth(1, "month")} />
      <BsChevronDoubleRight onClick={() => onChangeCurrentMonth(1, "year")} />
    </HeaderContainer>
  );
};

export default CalendarHeader;
