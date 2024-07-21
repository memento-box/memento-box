import { combineReducers } from 'redux';

const email = (state = [], action) => {
    switch (action.type) {
      case 'SET_EMAIL_DETAILS':
        return action.payload;
      default:
        return state;
    }
  }

export default combineReducers({
    email,
  });