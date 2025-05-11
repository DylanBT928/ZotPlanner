import React from "react";

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

  return (
    <div className="tab-content">
      {detail ? (
        <h2>{detail.className}</h2>
      ) : (
        <p>No class data found. Please upload a syllabus in Settings.</p>
      )}
    </div>
  );
};

export default ClassDetails;
