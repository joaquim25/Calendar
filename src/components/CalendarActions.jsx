import styled from "@emotion/styled";
import { MdClear } from "react-icons/md";

const ActionsContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  z-index: ;
  background-color: rgb(191,180,243);
  box-shadow: 0 6px 5px 2px rgba(0, 0, 0, 0.3);
  margin: 0.37rem auto 0 auto;
  padding: 0 16px;
  width: 200px;
  height: 20px;
  border-radius: 0 0 30px 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  & p {
    cursor: pointer;
    margin: 0;
    color: black;
    font-size: 0.85rem;
    position: relative;
    top: -2px;
    transition: all 0.2s ease-in-out;

    & svg {
      top: 3.5px;
      position: relative;
      width: 15px;
      height: 15px;
      color: red;
      margin-right: 3px;
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
