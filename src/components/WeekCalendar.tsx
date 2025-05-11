import React, { useState } from "react";
import type { TodoItem } from "./Todo";
import "./WeekCalendar.css";

function getStartOfWeek(date: Date) {
  const day = date.getDay(); // 0 = Sunday
  const diff = date.getDate() - day; // back up to Sunday
  return new Date(date.getFullYear(), date.getMonth(), diff);
}

function formatDateRange(start: Date, end: Date) {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${start.toLocaleDateString(
    undefined,
    opts
  )} – ${end.toLocaleDateString(undefined, opts)}`;
}

interface WeekCalendarProps {
  items: TodoItem[];
}
const WeekCalendar: React.FC<WeekCalendarProps> = ({ items }) => {
  const [start, setStart] = useState(getStartOfWeek(new Date()));
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });

  const prevWeek = () =>
    setStart((s) => {
      const d = new Date(s);
      d.setDate(s.getDate() - 7);
      return d;
    });
  const nextWeek = () =>
    setStart((s) => {
      const d = new Date(s);
      d.setDate(s.getDate() + 7);
      return d;
    });

  return (
    <div className="week-calendar">
      <div className="calendar-header">
        <button onClick={prevWeek}>&lt;</button>
        <span className="date-range">{formatDateRange(days[0], days[6])}</span>
        <button onClick={nextWeek}>&gt;</button>
      </div>
      <div className="calendar-days">
        {days.map((d, i) => {
          const iso = d.toISOString().slice(0, 10);
          const dayTasks = items.filter((t) => t.endDate === iso);
          return (
            <div key={i} className="day">
              <div className="weekday">
                {d.toLocaleDateString(undefined, { weekday: "short" })}
              </div>
              <div className="day-number">{d.getDate()}</div>
              {dayTasks.map((t) => (
                <div key={t.id} className="todo-item">
                  {t.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendar;
