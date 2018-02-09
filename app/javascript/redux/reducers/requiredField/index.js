import Immutable from 'seamless-immutable';
import {
  INPUT_VALUE_EXISTS,
} from '../../consts';

const initialState = Immutable({
  userInput: {
    exists: false,
  },
});

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case INPUT_VALUE_EXISTS: {
      return state.setIn(['userInput', 'exists'], payload);
    }

    default: {
      return state;
    }
  }
};

/**
 * Simulates data loaded into this reducer from somewhere
 */
export const load = data => ({ type: INPUT_VALUE_EXISTS, data });

