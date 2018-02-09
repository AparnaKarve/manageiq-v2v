import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import mappingWizard from './mappingWizard';
import requiredField from './requiredField';
import fieldData from './fieldData';

export function combineReducersAsync(asyncReducers) {
  return combineReducers({
    mappingWizard,
    requiredField,
    // fieldData,
    form: formReducer,
    ...asyncReducers
  });
}

export default combineReducersAsync();
