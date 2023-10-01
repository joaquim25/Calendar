import { useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import EventPannel from "./components/EventPannel";
import dayjs from "dayjs";
import { getDateInfo } from "./utils/index";
import { ThemeProvider } from "@emotion/react";
import ThemeToggleButton from "./components/ThemeToggleButton";

const lightTheme = {
  name: "light",
  backgroundColor: "rgb(240, 240, 240)",
  primColor: "rgba(105, 74, 225, 0.9)",
  headerPrimColor: "rgba(105, 74, 225, 0.9)",
  headerSecColor: "rgb(56, 56, 56)",
  primTextColor: "rgba(33,33,33)",
};

const darkTheme = {
  name: "dark",
  backgroundColor: "rgb(60, 60, 60)",
  primColor: "rgba(220,220,220)",
  headerPrimColor: "rgb(44, 134, 161)",
  headerSecColor: "rgb(44, 134, 161 , .7)",
  primTextColor: "rgba(220,220,220)",
};

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handleThemeChange = () => {
    theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  };

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
    <ThemeProvider theme={theme}>
      <ThemeToggleButton theme={theme} handleThemeChange={handleThemeChange} />
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
    </ThemeProvider>
  );
}

export default App;
