import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../components/Table";
import { deleteItem, fetchData } from "../helpers";
import { Expense } from "../components/ExpenseItem"; // Import the Expense type from your ExpenseItem component

interface LoaderData {
  expenses: Expense[];
}

export async function expensesLoader(): Promise<LoaderData> {
  const expenses = fetchData("expenses");
  return { expenses };
}

const ExpensesPage: React.FC = () => {
  const { expenses } = useLoaderData() as LoaderData;

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
