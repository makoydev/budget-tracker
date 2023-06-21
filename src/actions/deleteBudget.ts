import { ActionFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";

interface Params {
  id: string;
}

type ActionFunctionResult = ReturnType<typeof redirect>;

export async function deleteBudget(
  args: ActionFunctionArgs
): Promise<ActionFunctionResult> {
  const { params } = args;

  if (typeof params.id !== "string") {
    throw new Error("Invalid budget ID");
  }

  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = await getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense: { id: string }) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your budget.");
  }

  return redirect("/");
}
