import dayjs from "dayjs";

//helper object for weekDays (Sunday as 7 instead of 0)
export const weekDays = [
  { key: 1, name: "MON" },
  { key: 2, name: "TUE" },
  { key: 3, name: "WED" },
  { key: 4, name: "THU" },
  { key: 5, name: "FRI" },
  { key: 6, name: "SAT" },
  { key: 7, name: "SUN" },
];

// Helper function to get date info (current month, first day & weekday of the month, last day & weekday of the month,
// total days in that month)
export function getDateInfo(date) {
  const currentMonth = dayjs(date, "MMMM YYYY");
  const firstDayOfMonth = currentMonth.startOf("month");
  const lastDayOfMonth = currentMonth.endOf("month");
  const startDayOfWeek = firstDayOfMonth.day();
  const endDayOfWeek = lastDayOfMonth.day();
  const totalDaysInMonth = currentMonth.daysInMonth();

  return {
    currentMonth,
    firstDayOfMonth,
    lastDayOfMonth,
    totalDaysInMonth,
    startDayOfWeek,
    endDayOfWeek,
  };
}

// Render month days in the calendar (including past month and next month) ------------------------------------
export const getPreviousMonthDays = (month) => {
  const dateInfo = getDateInfo(month);
  // weekday for first day of the month
  const startDay = dateInfo.firstDayOfMonth.day();
  const previousMonth = dateInfo.currentMonth.subtract(1, "month");
  const previousMonthDays = [];

  //Iterate back from from starting weekday of month until start of the week
  //pushing those day objects to previousMonthDays array
  for (let i = startDay - 1; i > 0; i--) {
    const day = previousMonth.date(previousMonth.daysInMonth() - i + 1);
    previousMonthDays.push(day);
  }

  // create and return a new array of day objects
  //(with manipulated key, *value and formatted content)
  return previousMonthDays.map((day) => ({
    key: `prev-${day.format("D")}`,
    value: day,
    content: day.format("D"),
  }));
};

export const getCurrentMonthDays = (month) => {
  const currentMonthDays = [];
  const dateInfo = getDateInfo(month);

  //start from 1 and iterate until totalDaysof current month
  //pushing those day objects to currentMonthDays array
  for (let i = 1; i <= dateInfo.totalDaysInMonth; i++) {
    const day = dateInfo.currentMonth.date(i);
    currentMonthDays.push(day);
  }

  // create and return a new array of day objects
  //(with manipulated key, *value and formatted content)
  return currentMonthDays.map((day) => ({
    key: day.format("D"),
    value: day,
    content: day.format("D"),
  }));
};

export const getNextMonthDays = (month) => {
  const dateInfo = getDateInfo(month);
  // Determine the last day of the current month (endDayOfWeek)
  // handle Sunday (0) as 7
  const endDay = dateInfo.endDayOfWeek === 0 ? 7 : dateInfo.endDayOfWeek;
  //Determine the remaining slots
  const remainingEmptySlots =
    dateInfo.startDayOfWeek > 0 ? 7 - endDay : 6 - endDay;
  //get hold of the next month object
  const nextMonth = dateInfo.currentMonth.add(1, "month");
  const nextMonthDays = [];

  //Iterate from 1 to the number of remaining slots
  for (let i = 1; i <= remainingEmptySlots; i++) {
    //get hold of the object of (i) day of next month
    const day = nextMonth.date(i);
    nextMonthDays.push(day);
  }

  // create and return a new array of day objects
  //(with manipulated key, *value and formatted content)
  return nextMonthDays.map((day) => ({
    key: `next-${day.format("D")}`,
    value: day,
    content: day.format("D"),
  }));
};
