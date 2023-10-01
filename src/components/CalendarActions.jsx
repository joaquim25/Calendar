import styled from "@emotion/styled";
import { MdClear } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

const ActionsContainer = styled.div`
  cursor: pointer;
  height: 25px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;

  margin: 0.37rem auto 0 auto;
  background-color: transparent;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 0 150% 150%;
  z-index: 2;
  transition: all 0.2s ease-out;

  & p {
    display: none;
    position: relative;
    top: -6px;
    margin: 0;
    font-size: 0.85rem;
    color: ${(props) => props.theme.primTextColor};
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    overflow: hidden;

    & svg {
      position: relative;
      top: 5px;
      color: rgb(105, 74, 225);
      width: 20px;
      height: 20px;
    }
  }

  :hover {
    background-color: ${(props) => props.theme.backgroundColor};
    box-shadow: 0 6px 5px 2px rgba(0, 0, 0, 0.3);
    width: 200px;

    & p {
      display: block;

      :hover {
        transform: scale(1.05);
        font-weight: 600;
      }
    }

    & div svg {
      display: none;
    }
  }
`;

const SliderIndicator = styled.div`
  display: flex;
  justify-content: center;
  color: rgb(60, 60, 60);

  & svg {
    background-color: rgba(220,220,220);
    border-radius: 50%;
    padding: 5px 3px 2px 3px;
    position: relative;
    top: -10px;
    cursor: pointer;
    z-index: 1;
  }

  :hover {
    display: none;
  }
`;

const CalendarActions = ({ clearDays }) => {
  return (
    <>
      <ActionsContainer>
        <p onClick={clearDays}>
          <MdClear />
          Clear selection
        </p>
        <SliderIndicator>
          <FaChevronDown />
        </SliderIndicator>
      </ActionsContainer>
    </>
  );
};

export default CalendarActions;
