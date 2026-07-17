import { useState, useEffect } from "react";

function AddExpense({ onAddExpense, editExpense }) {

    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState("");

    useEffect(() => {

        if (editExpense) {

            setExpenseName(editExpense.name);
            setAmount(editExpense.amount);
            setCategory(editExpense.category);
            setDate(editExpense.date);

        }

    }, [editExpense]);

    const resetForm = () => {

        setExpenseName("");
        setAmount("");
        setCategory("Food");
        setDate("");

    };

    const handleAddExpense = (e) => {

        e.preventDefault();

        if (
            expenseName.trim() === "" ||
            amount.trim() === "" ||
            date === ""
        ) {

            alert("Please fill all fields.");
            return;

        }

        if (Number(amount) <= 0) {

            alert("Amount should be greater than 0.");
            return;

        }

        const today = new Date().toISOString().split("T")[0];

        if (date > today) {

            alert("Future date is not allowed.");
            return;

        }

        const newExpense = {

            name: expenseName,
            amount: amount,
            category: category,
            date: date

        };

        onAddExpense(newExpense);

        resetForm();

    };

    return (

        <div className="card shadow mb-4">

            <div className="card-body">

                <h4 className="text-primary mb-4">

                    {editExpense ? "✏️ Update Expense" : "➕ Add New Expense"}

                </h4>

                <form onSubmit={handleAddExpense}>

                    <div className="mb-3">

                        <label className="form-label">
                            Expense Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Expense Name"
                            value={expenseName}
                            onChange={(e) => setExpenseName(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Amount
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Category
                        </label>

                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >

                            <option>Food</option>
                            <option>Travel</option>
                            <option>Shopping</option>
                            <option>Bills</option>

                        </select>

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                    </div>

                    <div className="d-flex gap-2">

                        <button
                            type="submit"
                            className={`btn w-100 ${editExpense ? "btn-warning" : "btn-primary"}`}
                        >

                            {editExpense ? "Update Expense" : "Add Expense"}

                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={resetForm}
                        >

                            Reset

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddExpense;