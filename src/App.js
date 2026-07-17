import { useState, useEffect } from "react";
import "./App.css";

import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import TotalExpense from "./components/TotalExpense";
import ExpenseChart from "./components/ExpenseChart";

function App() {

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [editIndex, setEditIndex] = useState(null);
  const [editExpense, setEditExpense] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {

    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

  }, [darkMode]);

  const addExpense = (expense) => {

    if (editIndex !== null) {

      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = expense;

      setExpenses(updatedExpenses);
      setEditIndex(null);
      setEditExpense(null);

    } else {

      setExpenses([...expenses, expense]);

    }

  };

  const deleteExpense = (index) => {

    const updatedExpenses = expenses.filter((expense, i) => i !== index);

    setExpenses(updatedExpenses);

  };

  const startEdit = (index) => {

    setEditIndex(index);
    setEditExpense(expenses[index]);

  };

  const exportCSV = () => {

    if (expenses.length === 0) {
      alert("No Expense Found");
      return;
    }

    const headers = ["Expense", "Amount", "Category", "Date"];

    const rows = expenses.map((expense) => [
      expense.name,
      expense.amount,
      expense.category,
      expense.date
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "expenses.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  };

  const filteredExpenses = expenses.filter((expense) => {

    const searchMatch = expense.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    return searchMatch && categoryMatch;

  });

  return (

    <div className="container mt-5">

      <div className="card shadow mb-4">

        <div className="card-body d-flex justify-content-between align-items-center">

          <h2 className="text-primary mb-0">
            Expense Tracker
          </h2>

          <button
            className="btn btn-dark"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

        </div>

      </div>

      <div className="card shadow mb-4">

        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-5">

              <input
                type="text"
                className="form-control"
                placeholder="Search Expense..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <div className="col-md-3">

              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >

                <option value="All">All Categories</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>

              </select>

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-success w-100"
                onClick={exportCSV}
              >
                Export CSV
              </button>

            </div>

          </div>

        </div>

      </div>

      <AddExpense
        onAddExpense={addExpense}
        editExpense={editExpense}
      />

      <TotalExpense expenses={filteredExpenses} />

      <ExpenseChart expenses={filteredExpenses} />

      <ExpenseList
        expenses={filteredExpenses}
        deleteExpense={deleteExpense}
        startEdit={startEdit}
      />

    </div>

  );

}

export default App;