import React, { useEffect, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import styled from "@emotion/styled";
import {
  getPreviousMonthDays,
  getCurrentMonthDays,
  getNextMonthDays,
  getDateInfo,
} from "../utils/index";
import WeekDays from "./WeekDays";
import CalendarActions from "./CalendarActions";

const CalendarContainer = styled.div`
  background-color: rgb(240, 240, 240);
  box-sizing: border-box;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 0.4rem 1rem;
  width: 450px;
  max-height: 350px;
`;

const CalendarDaysGrid = styled.div`
  padding: 0.7rem 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 5px;
  height: 220px;
  margin-top: 10px;
  text-align: center;
`;

const CalendarDay = styled.div`
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ startDate, endDate, value }) => {
    if (startDate && value.isSame(startDate, "day")) {
      //start
      return "rgb(139, 120, 233)";
    } else if (endDate && value.isSame(endDate, "day")) {
      //end
      return "rgb(139, 120, 233)";
    } else if (
      startDate &&
      endDate &&
      value.isAfter(startDate) &&
      value.isBefore(endDate)
    ) {
      //interval
      return "rgba(173, 173, 173, 0.2)";
    }
  }};

  border-radius: ${({ startDate, endDate, value }) => {
    if (startDate && value.isSame(startDate, "day")) {
      //start
      return "5px 0 0 5px";
    } else if (endDate && value.isSame(endDate, "day")) {
      //end
      return "0 5px 5px 0";
    }
  }};

  color: ${({ startDate, endDate, value }) => {
    if (startDate && value.isSame(startDate, "day")) {
      //start
      return "white";
    } else if (endDate && value.isSame(endDate, "day")) {
      //end
      return "white";
    } else if (
      //interval
      startDate &&
      endDate &&
      value.isAfter(startDate) &&
      value.isBefore(endDate)
    ) {
      return "rgb(139, 120, 233)";
    }
  }};
`;

const PlaceholderDay = styled(CalendarDay)`
  color: ${({ startDate, endDate, value }) => {
    if (startDate && value.isSame(startDate, "day")) {
      //start
      return "white";
    } else if (endDate && value.isSame(endDate, "day")) {
      //end
      return "white";
    } else {
      //default
      return "grey";
    }
  }};
`;

const Calendar = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  currentMonth,
  setCurrentMonth,
  clearDays,
}) => {
  const [currentMonthDays, setCurrentMonthDays] = useState("Loading...");

  //handle day click, sets start and end date for events
  const handleDayClick = (day) => {
    if (!startDate) {
      setStartDate(day);
    } else {
      if (!endDate) {
        if (day.isBefore(startDate)) {
          setStartDate(day);
        } else if (day.isAfter(startDate)) {
          setEndDate(day);
        } else {
          setStartDate(null);
        }
      } else {
        if (day.isAfter(startDate)) {
          setEndDate(day);
        } else if (day.isBefore(startDate)) {
          setStartDate(day);
        } else {
          setStartDate(null);
          setEndDate(null);
        }
      }
    }
  };

  //handle month or year change (+1 || -1)
  const changecurrentMonth = (modifier, type) => {
    const dateInfo = getDateInfo(currentMonth);
    const updatedMonth = dateInfo.currentMonth.add(modifier, type);
    setCurrentMonth(updatedMonth.format("MMMM YYYY"));
  };

  // Renders the current month days (prev, current, next)
  // Re-renders on change from start event date, end event date and month change
  useEffect(() => {
    const previousMonthDays = getPreviousMonthDays(currentMonth).map(
      ({ key, content, value }) => (
        <PlaceholderDay
          value={value}
          key={key}
          onClick={() => handleDayClick(value)}
          startDate={startDate}
          endDate={endDate}
        >
          {content}
        </PlaceholderDay>
      )
    );
    // Determine the current days of the month
    const currentMonthDays = getCurrentMonthDays(currentMonth).map(
      ({ key, content, value }) => (
        <CalendarDay
          key={key}
          value={value}
          onClick={() => handleDayClick(value)}
          startDate={startDate}
          endDate={endDate}
        >
          {content}
        </CalendarDay>
      )
    );

    // Determine the next days of the month that need to be filled
    const nextMonthDays = getNextMonthDays(currentMonth).map(
      ({ key, content, value }) => (
        <PlaceholderDay
          value={value}
          key={key}
          onClick={() => handleDayClick(value)}
          startDate={startDate}
          endDate={endDate}
        >
          {content}
        </PlaceholderDay>
      )
    );

    const result = [
      ...previousMonthDays,
      ...currentMonthDays,
      ...nextMonthDays,
    ];

    setCurrentMonthDays(result);
  }, [startDate, endDate, currentMonth]);

  return (
    <CalendarContainer>
      <CalendarHeader changecurrentMonth={changecurrentMonth}>
        {currentMonth}
      </CalendarHeader>
      <WeekDays />
      <CalendarDaysGrid>{currentMonthDays}</CalendarDaysGrid>
      <CalendarActions clearDays={clearDays} />
    </CalendarContainer>
  );
};

export default Calendar;
