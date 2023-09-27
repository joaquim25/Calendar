import { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import EventPannel from "./components/EventPannel";

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <>
      <Calendar
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <EventPannel startDate={startDate} endDate={endDate} />
    </>
  );
}

export default App;
