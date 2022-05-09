import React, { useContext, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

const BudgetsContext = React.createContext()
export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export function useBudgets() {
  return useContext(BudgetsContext)
}
export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])

  const getBudgetExpenses = (budgetID) => {
    return expenses.filter((expense) => expense.budgetId === budgetID)
  }

  const addExpense = ({ description, amount, budgetId }) => {
    setBudgets((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
    })
  }
  const addBudget = (name, max) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidV4(), name, max }]
    })
  }

  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.find((expense) => expense.id !== id)
    })
  }
  const deleteBudget = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })

    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id)
    })
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}
