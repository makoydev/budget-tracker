// rrd imports
import { useLoaderData } from "react-router-dom";

// library import
import { toast } from "react-toastify";

// component imports
import Table from "../components/Table";
import { Expense } from "../components/ExpenseItem";

// helpers
import { deleteItem, fetchData } from "../helpers";

interface LoaderData {
  expenses: Expense[];
}

// loader
export async function expensesLoader(): Promise<LoaderData> {
  const expenses = fetchData("expenses") as Expense[];
  return { expenses };
}

// action
interface FormData {
  _action: string;
  [key: string]: string | File;
}

export async function expensesAction({ request }: { request: Request }) {
  const data = await request.formData();
  const { _action, ...values }: { _action: string } & FormData =
    Object.fromEntries(data) as { _action: string } & FormData;

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const ExpensesPage: React.FC = () => {
  const data = useLoaderData();
  const { expenses } = data as LoaderData;

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
