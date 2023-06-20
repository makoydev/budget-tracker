import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteItem, getAllMatchingItems } from '../helpers'

interface Params {
  id: string
}

export function deleteBudget({ params }: { params: Params }) {
  try {
    deleteItem({
      key: 'budgets',
      id: params.id,
    })

    const associatedExpenses = getAllMatchingItems({
      category: 'expenses',
      key: 'budgetId',
      value: params.id,
    })

    associatedExpenses.forEach((expense: { id: string }) => {
      deleteItem({
        key: 'expenses',
        id: expense.id,
      })
    })

    toast.success('Budget deleted successfully!')
  } catch (e) {
    throw new Error('There was a problem deleting your budget.')
  }
  return redirect('/')
}
