import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function ExpenseChart({ expenses }) {

  const categoryData = [];

  expenses.forEach((expense) => {

    const index = categoryData.findIndex(
      (item) => item.name === expense.category
    );

    if (index === -1) {

      categoryData.push({
        name: expense.category,
        value: Number(expense.amount)
      });

    } else {

      categoryData[index].value += Number(expense.amount);

    }

  });

  const COLORS = [
    "#0d6efd",
    "#198754",
    "#ffc107",
    "#dc3545",
    "#6f42c1",
    "#20c997",
    "#fd7e14",
    "#6610f2"
  ];

  if (categoryData.length === 0) {

    return (

      <div className="card shadow mt-4">

        <div className="card-body text-center">

          <h4 className="text-primary mb-3">
            Expense By Category
          </h4>

          <p className="text-muted">
            No expense data available.
          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="card shadow mt-4">

      <div className="card-body">

        <h4 className="text-center text-primary mb-4">

          📊 Expense By Category

        </h4>

        <ResponsiveContainer width="100%" height={350}>

          <PieChart>

            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={3}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              isAnimationActive={true}
            >

              {
                categoryData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))
              }

            </Pie>

            <Tooltip />

            <Legend verticalAlign="bottom" />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default ExpenseChart;