export const updateBalance = (balance) => {
    return {
      type: 'UPDATE_BALANCE',
      payload: balance
    };
  };
  
  export const addTransaction = (transaction) => {
    return {
      type: 'ADD_TRANSACTION',
      payload: transaction
    };
  };

  export const generateNewAddress = () => async (dispatch) => {
    try {
      const userId = localStorage.getItem('activeUserID');
      const response = await fetch(`http://localhost:3200/api/v1/users/${userId}`);
      const data = await response.json();
      const address = data.address;
      dispatch({ type: 'GENERATE_NEW_ADDRESS_SUCCESS', payload: address });
      return address;
    } catch (error) {
      dispatch({ type: 'GENERATE_NEW_ADDRESS_ERROR', payload: error.message });
      throw error;
    }
  };

  export const setTransactions = (transactions) => ({
    type: 'SET_TRANSACTIONS',
    payload: transactions,
  });
  
  
  export const fetchTransactions = (page) => async (dispatch) => {
    try {
      const userId = localStorage.getItem('activeUserID');
      const response = await fetch(`http://localhost:3200/api/v1/transactions/${userId}?page=${page}`);
      const data = await response.json();
      console.log(data)
      dispatch(setTransactions(data));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const initialState = {
    transactions: [],
  };
  
  export const walletReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TRANSACTIONS':
        return {
          ...state,
          transactions: action.payload,
        };
      default:
        return state;
    }
  };
  
  
  
  
    