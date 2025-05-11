import React, { useState } from "react";
import "./Todo.css";

export type Status = "inProgress" | "notStarted" | "completed";

export interface TodoItem {
  id: string;
  title: string;
  endDate: string; // YYYY-MM-DD
  time?: string; // HH:MM
  status: Status;
}

interface TodoProps {
  items: TodoItem[];
  setItems: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}
const Todo: React.FC<TodoProps> = ({ items, setItems }) => {
  const [title, setTitle] = useState("");
  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const [endDate, setEndDate] = useState(getTomorrow());
  const [time, setTime] = useState("00:00");

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const formatTime = (t: string) =>
    new Date(`1970-01-01T${t}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

  const addItem = () => {
    if (!title || !endDate) return;
    setItems([
      ...items,
      { id: Date.now().toString(), title, endDate, time, status: "notStarted" },
    ]);
    setTitle("");
    setEndDate(getTomorrow());
    setTime("00:00");
  };

  const move = (id: string, status: Status) =>
    setItems(items.map((i) => (i.id === id ? { ...i, status } : i)));

  const sections = [
    { label: "In Progress", key: "inProgress" as Status },
    { label: "Not Started", key: "notStarted" as Status },
    { label: "Completed", key: "completed" as Status },
  ];

  return (
    <div className="tab-content p-4 space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addItem();
        }}
        className="flex flex-wrap items-end gap-2 border p-4 rounded"
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addItem())
            }
            className="border rounded px-2 py-1 flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>

      {sections.map((sec) => (
        <div key={sec.key} className="space-y-2">
          <h3 className="font-semibold">{sec.label}</h3>
          <div className="space-y-1">
            {items
              .filter((i) => i.status === sec.key)
              .map((i) => (
                <div
                  key={i.id}
                  className="relative flex justify-between items-center border rounded px-3 py-2"
                >
                  <div>
                    <div className="font-medium">{i.title}</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(i.endDate)} {formatTime(i.time!)}
                    </div>
                  </div>
                  <div className="space-x-1">
                    {sec.key !== "notStarted" && (
                      <button
                        onClick={() => move(i.id, "notStarted")}
                        className="text-sm text-yellow-600"
                      >
                        ↺ Not Started
                      </button>
                    )}
                    {sec.key !== "inProgress" && (
                      <button
                        onClick={() => move(i.id, "inProgress")}
                        className="text-sm text-blue-600"
                      >
                        ▶ In Progress
                      </button>
                    )}
                    {sec.key !== "completed" && (
                      <button
                        onClick={() => move(i.id, "completed")}
                        className="text-sm text-green-600"
                      >
                        ✔ Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
