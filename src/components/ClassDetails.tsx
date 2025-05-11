import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ParsedClass {
  classId: string;
  className: string;
  assignments: { name: string; weight: number; dueDate: string }[];
  grading: Record<string, number>;
}

const ClassDetails: React.FC = () => {
  const sessionId = localStorage.getItem("sessionId") || "";
  const classesJson = localStorage.getItem("classes") || "[]";
  const classes: ParsedClass[] = JSON.parse(classesJson);

  const detail: ParsedClass | null =
    classes.find((c) => c.classId === sessionId) ?? classes[0] ?? null;

  if (!detail) {
    return (
      <div className="tab-content">
        <p>No class data found. Please upload a syllabus in Settings.</p>
      </div>
    );
  }

  const gradingData = Object.entries(detail.grading).map(
    ([category, weight]) => ({ category, weight })
  );
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  return (
    <div className="tab-content class-details">
      <h2>{detail.className}</h2>

      {/* Assignments & Weights */}
      <ul className="assign-list">
        {detail.assignments.map((a) => (
          <li key={a.name}>
            {a.name}: {a.weight}%
          </li>
        ))}
      </ul>

      {/* Grading Breakdown Pie Chart */}
      <div className="grading-chart">
        <ResponsiveContainer width="100%" height={500}>
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={gradingData}
              dataKey="weight"
              nameKey="category"
              outerRadius={200}
              label
            >
              {gradingData.map((_entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(val: number) => `${val}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClassDetails;
