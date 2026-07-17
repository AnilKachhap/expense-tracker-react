import { useState } from "react";

function ExpenseList({ expenses, deleteExpense, startEdit }) {

    const [sortType, setSortType] = useState("default");

    const sortedExpenses = [...expenses];

    if (sortType === "amountLow") {
        sortedExpenses.sort((a, b) => Number(a.amount) - Number(b.amount));
    }

    if (sortType === "amountHigh") {
        sortedExpenses.sort((a, b) => Number(b.amount) - Number(a.amount));
    }

    if (sortType === "dateNew") {
        sortedExpenses.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    }

    if (sortType === "dateOld") {
        sortedExpenses.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
    }

    return (

        <div className="card shadow mt-4">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h4 className="text-primary mb-0">
                        Expense List
                    </h4>

                    <select
                        className="form-select"
                        style={{ width: "220px" }}
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                    >

                        <option value="default">Sort By</option>
                        <option value="amountLow">Amount Low → High</option>
                        <option value="amountHigh">Amount High → Low</option>
                        <option value="dateNew">Newest First</option>
                        <option value="dateOld">Oldest First</option>

                    </select>

                </div>

                <div className="table-responsive">

                    <table className="table table-bordered table-hover align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>S.No.</th>
                                <th>Expense</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                sortedExpenses.length === 0 ?

                                    (
                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center text-danger fw-bold"
                                            >

                                                No Expenses Found

                                            </td>

                                        </tr>
                                    )

                                    :

                                    sortedExpenses.map((expense, index) => (

                                        <tr key={index}>

                                            <td>{index + 1}</td>

                                            <td>{expense.name}</td>

                                            <td>₹ {expense.amount}</td>

                                            <td>{expense.category}</td>

                                            <td>{expense.date}</td>

                                            <td>

                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => startEdit(index)}
                                                >
                                                    ✏️ Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => {

                                                        if (window.confirm("Delete this expense?")) {

                                                            deleteExpense(index);

                                                        }

                                                    }}
                                                >
                                                    🗑 Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default ExpenseList;