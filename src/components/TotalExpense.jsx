function TotalExpense({ expenses }) {

    const totalExpense = expenses.reduce((sum, expense) => {
        return sum + Number(expense.amount);
    }, 0);

    const totalTransactions = expenses.length;

    const highestExpense =
        expenses.length > 0
            ? Math.max(...expenses.map((expense) => Number(expense.amount)))
            : 0;

    const averageExpense =
        totalTransactions > 0
            ? (totalExpense / totalTransactions).toFixed(2)
            : 0;

    const totalCategories = new Set(
        expenses.map((expense) => expense.category)
    ).size;

    return (

        <div className="row mt-4">

            <div className="col-md-3 mb-3">

                <div className="card bg-primary text-white shadow">

                    <div className="card-body text-center">

                        <h6>💰 Total Expense</h6>

                        <h3>₹ {totalExpense}</h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3 mb-3">

                <div className="card bg-success text-white shadow">

                    <div className="card-body text-center">

                        <h6>📋 Transactions</h6>

                        <h3>{totalTransactions}</h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3 mb-3">

                <div className="card bg-warning text-dark shadow">

                    <div className="card-body text-center">

                        <h6>💸 Highest Expense</h6>

                        <h3>₹ {highestExpense}</h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3 mb-3">

                <div className="card bg-danger text-white shadow">

                    <div className="card-body text-center">

                        <h6>📊 Categories</h6>

                        <h3>{totalCategories}</h3>

                    </div>

                </div>

            </div>

            <div className="col-12 mt-3">

                <div className="card border-primary shadow">

                    <div className="card-body text-center">

                        <h5 className="text-primary">

                            📈 Average Expense : ₹ {averageExpense}

                        </h5>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default TotalExpense;