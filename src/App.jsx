import { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import EventPannel from "./components/EventPannel";
import dayjs from "dayjs";
import { getDateInfo } from "./utils/index";

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs().format("MMMM YYYY"));

  const clearDays = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const showEvent = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    const target = getDateInfo(startDate);
    const formattedMonth = target.currentMonth.format("MMMM YYYY");

    setCurrentMonth(formattedMonth);
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
        clearDays = {clearDays}
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
