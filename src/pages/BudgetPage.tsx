import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem, { Budget } from "../components/BudgetItem";
import Table from "../components/Table";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";
import { Expense } from "../components/ExpenseItem";

interface Params {
  id: string;
}

interface BudgetLoaderData {
  budget: Budget; // Replace 'any' with the appropriate type for your budget object
  expenses: Expense[]; // Replace 'any[]' with the appropriate type for your expenses array
}

export async function budgetLoader({
  params,
}: {
  params: Params;
}): Promise<BudgetLoaderData> {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
}

const BudgetPage: React.FC = () => {
  const { budget, expenses } = useLoaderData() as BudgetLoaderData;

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
