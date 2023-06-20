// RRD imports
import { Link, useFetcher } from "react-router-dom";

// Library import
import { TrashIcon } from "@heroicons/react/24/solid";

// Helper imports
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";

export interface Expense {
  budgetId: string;
  name: string;
  amount: number;
  createdAt: number;
  id: string;
}

interface Budget {
  id: string;
  name: string;
  color: string;
}

interface ExpenseItemProps {
  expense: Expense;
  showBudget: boolean;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, showBudget }) => {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0] as Budget;

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={
              {
                "--accent": budget.color,
              } as React.CSSProperties
            }
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
