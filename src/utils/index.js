import dayjs from "dayjs";

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
  const startDay = dateInfo.firstDayOfMonth.day();
  const previousMonth = dateInfo.currentMonth.subtract(1, "month");
  const previousMonthDays = [];

  for (let i = startDay - 1; i > 0; i--) {
    const day = previousMonth.date(previousMonth.daysInMonth() - i + 1);
    previousMonthDays.push(day);
  }

  return previousMonthDays.map((day) => ({
    key: `prev-${day.format("D")}`,
    value: day,
    content: day.format("D"),
  }));
};

export const getCurrentMonthDays = (month) => {
  const currentMonthDays = [];
  const dateInfo = getDateInfo(month);
  for (let i = 1; i <= dateInfo.totalDaysInMonth; i++) {
    const day = dateInfo.currentMonth.date(i);
    currentMonthDays.push(day);
  }

  return currentMonthDays.map((day) => ({
    key: day.format("D"),
    value: day,
    content: day.format("D"),
  }));
};

export const getNextMonthDays = (month) => {
  const dateInfo = getDateInfo(month);
  const endDay = dateInfo.endDayOfWeek === 0 ? 7 : dateInfo.endDayOfWeek;
  const remainingEmptySlots =
    dateInfo.startDayOfWeek > 0 ? 7 - endDay : 6 - endDay;
  const nextMonth = dateInfo.currentMonth.add(1, "month");
  const nextMonthDays = [];

  for (let i = 1; i <= remainingEmptySlots; i++) {
    const day = nextMonth.date(i);
    nextMonthDays.push(day);
  }

  return nextMonthDays.map((day) => ({
    key: `next-${day.format("D")}`,
    value: day,
    content: day.format("D"),
  }));
};