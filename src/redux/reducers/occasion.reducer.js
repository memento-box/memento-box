const initialState = [];

const occasionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OCCASIONS':
      return action.payload;
    default:
      return state;
  }
};

export default occasionReducer;
