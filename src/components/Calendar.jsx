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
  box-sizing: border-box;
  background-color: rgb(240, 240, 240);
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.4);
  width: 450px;
  height: 350px;
  padding: 0.4rem 1rem;
  border-radius: 5px;
`;

const CalendarDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 5px;
  height: 220px;
  padding: 0.7rem 0;
  margin-top: 10px;
`;

const CurrentMonthDay = styled.div`
  display: flex;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;

  /* Background of Day div is highlighted if start or end dates matches cell*/
  /* Or is grayed-out if it sits in between */
  background-color: ${({ startDate, endDate, value }) => {
    if (
      (startDate && value.isSame(startDate, "day")) ||
      (endDate && value.isSame(endDate, "day"))
    ) {
      //start
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

  /* Border radius for days matching start or end dates*/
  border-radius: ${({ startDate, endDate, value }) => {
    if (startDate && value.isSame(startDate, "day")) {
      //start
      return "5px 0 0 5px";
    } else if (endDate && value.isSame(endDate, "day")) {
      //end
      return "0 5px 5px 0";
    }
  }};

  /* Font color of Day div chenges to "white" if start or end dates matches cell*/
  /* Or changes to a lighter blue if it sits in between */
  color: ${({ startDate, endDate, value }) => {
    if (
      (startDate && value.isSame(startDate, "day")) ||
      (endDate && value.isSame(endDate, "day"))
    ) {
      //start or end
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

const NonCurrentMonthDay = styled(CurrentMonthDay)`
  /* Override currentMonthDay font color, but also account for selected dates */
  /* in previous or next month being displayed */
  color: ${({ startDate, endDate, value }) => {
    if (
      (startDate && value.isSame(startDate, "day")) ||
      (endDate && value.isSame(endDate, "day"))
    ) {
      //start
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

  // Renders the current month days (prev, current, next)
  // Re-renders on change from start event date, end event date and month change
  useEffect(() => {
    const previousMonthDays = getPreviousMonthDays(currentMonth).map(
      ({ key, content, value }) => (
        <NonCurrentMonthDay
          value={value}
          key={key}
          onClick={() => handleDayClick(value)}
          startDate={startDate}
          endDate={endDate}
        >
          {content}
        </NonCurrentMonthDay>
      )
    );
    // Determine the current days of the month
    const currentMonthDays = getCurrentMonthDays(currentMonth).map(
      ({ key, content, value }) => (
        <CurrentMonthDay
          key={key}
          value={value}
          onClick={() => handleDayClick(value)}
          startDate={startDate}
          endDate={endDate}
        >
          {content}
        </CurrentMonthDay>
      )
    );

    // Determine the next days of the month that need to be filled
    const nextMonthDays = getNextMonthDays(currentMonth).map(
      ({ key, content, value }) => (
        <NonCurrentMonthDay
          value={value}
          key={key}
          onClick={() => handleDayClick(value)}
          startDate={startDate}
          endDate={endDate}
        >
          {content}
        </NonCurrentMonthDay>
      )
    );

    const result = [
      ...previousMonthDays,
      ...currentMonthDays,
      ...nextMonthDays,
    ];

    setCurrentMonthDays(result);
  }, [startDate, endDate, currentMonth]);

  //handle day click, sets start and end date for events
  const handleDayClick = (day) => {
    // Case 1: Start date is not set
    if (!startDate) {
      setStartDate(day);
    } else {
      // Case 2: Start date is set, but end date is not set
      if (!endDate) {
        if (day.isBefore(startDate)) {
          setStartDate(day);
        } else if (day.isAfter(startDate)) {
          setEndDate(day);
        } else {
          // Reset start date if start date is clicked again
          setStartDate(null);
        }
      } else {
        // Case 3: Both start and end dates are set
        if (day.isAfter(startDate)) {
          setEndDate(day);
        } else if (day.isBefore(startDate)) {
          setStartDate(day);
        } else {
          // Reset both start and end dates if start date is clicked again
          setStartDate(null);
          setEndDate(null);
        }
      }
    }
  };

  //Base function to handle month or year change (+1 || -1) [CalendarHeader]
  const changecurrentMonth = (modifier, type) => {
    const dateInfo = getDateInfo(currentMonth);
    const updatedMonth = dateInfo.currentMonth.add(modifier, type);
    setCurrentMonth(updatedMonth);
  };

  return (
    <CalendarContainer>
      <CalendarHeader changecurrentMonth={changecurrentMonth}>
        {currentMonth.format("MMMM YYYY")}
      </CalendarHeader>
      <WeekDays />
      <CalendarDaysGrid>{currentMonthDays}</CalendarDaysGrid>
      <CalendarActions clearDays={clearDays} />
    </CalendarContainer>
  );
};

export default Calendar;
