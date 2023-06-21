// rrd imports
import { useLoaderData, Params as RRParams } from "react-router-dom";

// library
import { toast } from "react-toastify";

// components
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem, { Budget } from "../components/BudgetItem";
import Table from "../components/Table";

// helpers
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";
import { Expense } from "../components/ExpenseItem";
import { LoaderFunction } from "react-router-dom";
import { LoaderFunctionArgs } from "react-router-dom";

// types

interface LoaderData {
  budget: Budget;
  expenses: Expense[];
}

interface Params {
  id: string;
}

interface FormData {
  _action: string;
  newExpense?: string;
  newExpenseAmount?: string;
  newExpenseBudget?: string;
  expenseId?: string;
}

// loader
export const budgetLoader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const { id } = params as RRParams; // Cast Params<string> to Params

  if (typeof id !== "string") {
    throw new Error("Invalid budget ID");
  }

  const budget = (
    await getAllMatchingItems({
      category: "budgets",
      key: "id",
      value: id,
    })
  )[0] as Budget;

  const expenses = (await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: id,
  })) as Expense[];

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
};
// action
export async function budgetAction({ request }: { request: Request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(
    data
  ) as unknown as FormData;

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense!,
        amount: values.newExpenseAmount!,
        budgetId: values.newExpenseBudget!,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId!,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const BudgetPage: React.FC = () => {
  const data = useLoaderData();
  const { budget, expenses } = data as LoaderData;

  return (
    <div
      className="grid-lg"
      style={
        {
          "--accent": budget.color,
        } as React.CSSProperties
      }
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};
export default BudgetPage;
