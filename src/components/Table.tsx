import React from 'react'
import ExpenseItem from './ExpenseItem'

interface Expense {
  id: string
  budgetId: string
  name: string
  amount: number
  createdAt: number
  // Add other properties of the expense object as needed
}

interface TableProps {
  expenses: Expense[]
  showBudget?: boolean
}

const Table: React.FC<TableProps> = ({ expenses, showBudget = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {['Name', 'Amount', 'Date', showBudget ? 'Budget' : '', ''].map(
              (i, index) => (
                <th key={index}>{i}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
