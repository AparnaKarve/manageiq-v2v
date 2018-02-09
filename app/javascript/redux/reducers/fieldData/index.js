// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
const CHANGE = "@@redux-form/CHANGE";

export default (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    // case CHANGE: {
    //   return state.setIn(['userInput', 'exists'], payload);
    // }
    case CHANGE: {
      return {
        data: payload,
      }
    }

    default: {
      return state;
    }
  }
};

/**
 * Simulates data loaded into this reducer from somewhere
 */
export const load = data => ({ type: CHANGE, data });

