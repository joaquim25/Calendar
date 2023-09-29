import styled from "@emotion/styled";
import { MdClear } from "react-icons/md";

const ActionsContainer = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 35px;
  margin: 0.37rem auto 0 auto;
  background-color: rgb(240, 240, 240);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 0 150% 150%;
  box-shadow: 0 6px 5px 2px rgba(0, 0, 0, 0.3);

  & p {
    position: relative;
    top: -6px;
    margin: 0;
    font-size: 0.85rem;
    color: black;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    & svg {
      position: relative;
      top: 5px;
      color: rgb(105, 74, 225);
      width: 20px;
      height: 20px;
    }

    :hover {
      transform: scale(1.05);
      font-weight: 500;
    }
  }
`;

const CalendarActions = ({ clearDays }) => {
  return (
    <ActionsContainer>
      <p onClick={clearDays}>
        <MdClear />
        Clear selection
      </p>
    </ActionsContainer>
  );
};

export default CalendarActions;
