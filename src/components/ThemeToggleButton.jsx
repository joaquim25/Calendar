import styled from "@emotion/styled";
import { BsFillSunFill } from "react-icons/bs";
import { MdModeNight } from "react-icons/md";

const ButtonContainer = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  position: absolute;
  right: 15px;
  top: 15px;
  display: flex;
  align-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 15px;
  width: 65px;
  height: 30px;
  transition: all 0.3s linear;
  border: 1px solid #333;

  & svg {
    background-color: ${(props) => props.theme.primTextColor};
    opacity: 0.7;
    padding: 3px;
    border-radius: 50%;
    margin: auto 0;
    position: absolute;
    top: 3.5px;
    ${(props) => (props.theme.name === "light" ? "left: 4px;" : "right: 4px;")};
    color: ${(props) => props.theme.backgroundColor};
  }
`;
const ThemeToggleButton = ({ theme, handleThemeChange }) => {
  return (
    <ButtonContainer onClick={handleThemeChange}>
      {theme.name === "light" ? <BsFillSunFill /> : <MdModeNight />}
    </ButtonContainer>
  );
};

export default ThemeToggleButton;
