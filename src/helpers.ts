export interface ExpenseData {
  name: string | File;
  amount: number | string;
  budgetId: string | File;
}

interface DeleteItemData {
  key: string;
  id?: string | undefined | File;
}

export const waait = (): Promise<void> =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// colors
const generateRandomColor = (): string => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Local storage
export const fetchData = (key: string): any => {
  return JSON.parse(localStorage.getItem(key) || "null");
};

// Get all items from local storage
export const getAllMatchingItems = ({
  category,
  key,
  value,
}: {
  category: string;
  key: string;
  value: string;
}): any[] => {
  const data = fetchData(category) ?? [];
  return data.filter((item: any) => item[key] === value);
};

// delete item from local storage
export const deleteItem = ({ key, id }: DeleteItemData): void => {
  const existingData = fetchData(key);
  if (id) {
    if (typeof id === "string" || typeof id === "undefined") {
      const newData = existingData.filter((item: any) => item.id !== id);
      return localStorage.setItem(key, JSON.stringify(newData));
    } else {
      const file = id as File;
      const newData = existingData.filter((item: any) => item.id !== file.name);
      return localStorage.setItem(key, JSON.stringify(newData));
    }
  }
  return localStorage.removeItem(key);
};

// create budget
export const createBudget = ({
  name,
  amount,
}: {
  name: string | File;
  amount: number;
}): void => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// create expense
export const createExpense = ({
  name,
  amount,
  budgetId,
}: ExpenseData): void => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// total spent by budget
export const calculateSpentByBudget = (budgetId: string): number => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc: number, expense: any) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// FORMATTING
export const formatDateToLocaleString = (epoch: number): string =>
  new Date(epoch).toLocaleDateString();

// Formating percentages
export const formatPercentage = (amt: number): string => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amt: number): string => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};
