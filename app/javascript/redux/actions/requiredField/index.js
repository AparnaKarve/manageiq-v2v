import {
  INPUT_VALUE_EXISTS,
} from '../../consts';

export const checkInputValueExistence = (value) => {
  const exists = !(value === '');

  return {
    type: INPUT_VALUE_EXISTS,
    payload: exists,
  };
};
