import React, { useState, useMemo } from "react";
import "./GradeCalculator.css";

type Category = {
  id: string;
  name: string;
  weight: number; // percent (0–100)
};

type Assignment = {
  id: string;
  name: string;
  categoryId: string;
  score: number;
  total: number;
};

const GradeCalculator: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [catName, setCatName] = useState("");
  const [catWeight, setCatWeight] = useState<string>("0");
  const [asgName, setAsgName] = useState("");
  const [asgCat, setAsgCat] = useState<string>("");
  const [asgScore, setAsgScore] = useState<string>("0");
  const [asgTotal, setAsgTotal] = useState<string>("100");

  const totalWeight = useMemo(
    () => categories.reduce((s, c) => s + c.weight, 0),
    [categories]
  );

  const finalGrade = useMemo(() => {
    const activeCats = categories.filter(
      (cat) =>
        cat.weight > 0 && assignments.some((a) => a.categoryId === cat.id)
    );
    const totalActiveWeight = activeCats.reduce(
      (sum, cat) => sum + cat.weight,
      0
    );
    if (totalActiveWeight === 0) return 0;

    const weighted = activeCats.reduce((sum, cat) => {
      const catAsgs = assignments.filter((a) => a.categoryId === cat.id);
      const avg =
        catAsgs.reduce((s, a) => s + a.score / a.total, 0) / catAsgs.length;
      return sum + avg * (cat.weight / totalActiveWeight);
    }, 0);

    return weighted * 100;
  }, [categories, assignments]);

  const addCategory = () => {
    const weightNum = parseFloat(catWeight) || 0;
    if (!catName || weightNum <= 0) return;
    setCategories([
      ...categories,
      { id: Date.now().toString(), name: catName, weight: weightNum },
    ]);
    setCatName("");
    setCatWeight("0");
  };

  const addAssignment = () => {
    if (!asgName || !asgCat) return;
    const scoreNum = parseFloat(asgScore) || 0;
    const totalNum = parseFloat(asgTotal) || 0;
    setAssignments([
      ...assignments,
      {
        id: Date.now().toString(),
        name: asgName,
        categoryId: asgCat,
        score: scoreNum,
        total: totalNum,
      },
    ]);
    setAsgName("");
    setAsgScore("0");
    setAsgTotal("100");
  };

  return (
    <div className="tab-content space-y-6">
      <h2 className="text-xl font-semibold">Grade Calculator</h2>

      {/* Category form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCategory();
        }}
        className="p-4 border rounded space-y-2"
      >
        <h3 className="font-medium">Add Category</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            className="border px-2 py-1 rounded flex-1"
          />
          <input
            type="number"
            placeholder="% Weight"
            value={catWeight}
            onChange={(e) => setCatWeight(e.target.value)}
            onBlur={() => catWeight.trim() === "" && setCatWeight("0")}
            className="border px-2 py-1 rounded w-24"
          />
          <button
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
        <div>
          Total weight: {totalWeight}%{" "}
          {totalWeight !== 100 && (
            <span className="text-red-500">(should equal 100%)</span>
          )}
        </div>
      </form>

      {/* Categories list */}
      {categories.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Category</th>
              <th className="border p-2">Weight %</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Assignment form */}
      {categories.length > 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addAssignment();
          }}
          className="p-4 border rounded space-y-2"
        >
          <h3 className="font-medium">Add Assignment</h3>
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="Name"
              value={asgName}
              onChange={(e) => setAsgName(e.target.value)}
              className="border px-2 py-1 rounded flex-1"
            />
            <select
              value={asgCat}
              onChange={(e) => {
                const selectedId = e.target.value;
                setAsgCat(selectedId);
                if (asgName.trim() === "") {
                  const cat = categories.find((c) => c.id === selectedId);
                  if (cat) setAsgName(cat.name);
                }
              }}
              className="border px-2 py-1 rounded"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Score"
              value={asgScore}
              onChange={(e) => setAsgScore(e.target.value)}
              onBlur={() => asgScore.trim() === "" && setAsgScore("0")}
              className="border px-2 py-1 rounded w-20"
            />
            <span>/</span>
            <input
              type="number"
              placeholder="Total"
              value={asgTotal}
              onChange={(e) => setAsgTotal(e.target.value)}
              onBlur={() => asgTotal.trim() === "" && setAsgTotal("100")}
              className="border px-2 py-1 rounded w-20"
            />
            <button
              type="submit"
              className="px-4 py-1 bg-green-600 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      )}

      {/* Assignments table */}
      {assignments.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Assignment</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Score</th>
              <th className="border p-2">%</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => {
              const cat = categories.find((c) => c.id === a.categoryId);
              const pct = ((a.score / a.total) * 100).toFixed(1);
              return (
                <tr key={a.id}>
                  <td className="border p-2">{a.name}</td>
                  <td className="border p-2">{cat?.name}</td>
                  <td className="border p-2">
                    {a.score} / {a.total}
                  </td>
                  <td className="border p-2">{pct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Final grade */}
      <div className="text-lg font-semibold">
        Final Grade: {finalGrade.toFixed(2)}%
      </div>
    </div>
  );
};

export default GradeCalculator;
