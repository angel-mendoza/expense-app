import { createContext, useContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
// initial state
const INITIAL_STATE = {
  transactions: []
}

//create context
export const Context = createContext()

//custom hook
export const useGlobalState = () => useContext(Context)

export const GlobalProvider = ({ children}) => {
  //reducer
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE, () => {
    const localData = localStorage.getItem("transactions")
    return localData ? JSON.parse(localData) : INITIAL_STATE
  })

  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state))
  }, [state]);

  return (
    <Context.Provider value={{
      state,
      addTransaction,
      deleteTransaction
    }}>
      {children}
    </Context.Provider>
  )
}