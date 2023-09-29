import styled from "@emotion/styled";
import { weekDays } from "../utils/index";

const WeekDaysList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;

  & li {
    font-weight: 700;
    color: rgb(56, 56, 56);
    user-select: none;
  }
`;

const WeekDays = () => {
  return (
    //retrieves and renders each weekday as li from index.js weekDays array
    <WeekDaysList>
      {weekDays.map((weekDay) => (
        <li key={weekDay.key}>{weekDay.name}</li>
      ))}
    </WeekDaysList>
  );
};

export default WeekDays;
