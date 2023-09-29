import { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import EventPannel from "./components/EventPannel";
import dayjs from "dayjs";
import { getDateInfo } from "./utils/index";

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const clearDays = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const showEvent = (startDate, endDate) => {
    //set the start and end date states to clicked event dates
    setStartDate(startDate);
    setEndDate(endDate);
    //use getDateInfo helper function to get month of start date
    const targetMonth = getDateInfo(startDate).currentMonth;

    //replace the currentMonth state to event month (start)
    setCurrentMonth(targetMonth);
  };

  return (
    <>
      <Calendar
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        clearDays={clearDays}
      />
      <EventPannel
        startDate={startDate}
        endDate={endDate}
        clearDays={clearDays}
        showEvent={showEvent}
      />
    </>
  );
}

export default App;
