import { combineReducers } from 'redux';

const initialState = {
  balance: 0,
  transactions: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BALANCE':
      return {
        ...state,
        balance: action.payload,
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'SET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  wallet: walletReducer,
  // Otros reducers
});

export default rootReducer;
