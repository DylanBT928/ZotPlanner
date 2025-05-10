import React, { useState } from "react";
import "./Todo.css";

type Status = "inProgress" | "notStarted" | "completed";
interface TodoItem {
  id: string;
  title: string;
  endDate: string; // YYYY-MM-DD
  dueTime?: string; // HH:MM
  status: Status;
}

const Todo: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [title, setTitle] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [includeTime, setIncludeTime] = useState(false);
  // default endDate to today in YYYY-MM-DD
  const getToday = () => new Date().toISOString().slice(0, 10);
  const [endDate, setEndDate] = useState<string>(getToday());

  const addItem = () => {
    if (!title || !endDate) return;
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        title,
        dueTime: includeTime ? dueTime : undefined,
        endDate,
        status: "notStarted",
      },
    ]);

    setTitle("");
    setDueTime("");
    setIncludeTime(false);
    // reset endDate back to today
    setEndDate(getToday());
  };

  const move = (id: string, status: Status) =>
    setItems(items.map((i) => (i.id === id ? { ...i, status } : i)));

  const sections: { label: string; key: Status }[] = [
    { label: "In Progress", key: "inProgress" },
    { label: "Not Started", key: "notStarted" },
    { label: "Completed", key: "completed" },
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        {/* Row 2: End date + time */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
          {includeTime && (
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="border rounded px-2 py-1"
            />
          )}
          {/* force this checkbox onto its own line */}
          <label className="include-time flex items-center space-x-1">
            <input
              type="checkbox"
              checked={includeTime}
              onChange={(e) => setIncludeTime(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-sm">Include time</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Add
        </button>
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
                  className="flex justify-between items-center border rounded px-3 py-2"
                >
                  <div>
                    <div className="font-medium">{i.title}</div>
                    <div className="text-sm text-gray-500">
                      {i.dueTime ?? ""} {i.endDate}
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
