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
  }
`;

const WeekDays = () => {
  return (
    <WeekDaysList>
      {weekDays.map((weekDay) => (
        <li key={weekDay.key}>{weekDay.name}</li>
      ))}
    </WeekDaysList>
  );
};

export default WeekDays;
