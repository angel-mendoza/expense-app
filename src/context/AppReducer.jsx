const AppReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      const test = [...state.transactions]
      test.unshift(action.payload)
      return {
        ...state,
        transactions: test
      }

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    default:
      return state
  }
}

export default AppReducer