import {
  BsChevronDoubleLeft,
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleRight,
} from "react-icons/bs";
import styled from "@emotion/styled";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  & p {
    flex-grow: 1;
    text-align: center;
    color: rgb(139, 120, 233);
    font-size: 1.2rem;
    font-weight: 500;
    user-select: none;
  }

  & svg {
    cursor: pointer;
    color: rgb(139, 120, 233);
    stroke-width: 0.8;
    width: 13px;
  }
`;

const CalendarHeader = ({
  children,
  changecurrentMonth,
}) => {
  return (
    <HeaderContainer>
      <BsChevronDoubleLeft onClick={() => changecurrentMonth(-1, "year")} />
      <BsChevronLeft onClick={() => changecurrentMonth(-1, "month")} />
      <p>{children}</p>
      <BsChevronRight onClick={() => changecurrentMonth(1, "month")} />
      <BsChevronDoubleRight onClick={() => changecurrentMonth(1, "year")} />
    </HeaderContainer>
  );
};

export default CalendarHeader;
