import Immutable from 'seamless-immutable';
import { QUERY_V2V_OSP_TENANT_ATTRIBUTES, QUERY_V2V_OSP_BEST_FIT_FLAVOR, SAVE_PREVIOUS_ROW_FOR_UNDO, SET_SECURITY_GROUPS_FOR_VMS } from './PlanWizardInstancePropertiesStepConstants';

const initialState = Immutable({
  tenantsWithAttributes: [],
  isFetchingTenantsWithAttributes: false,
  isRejectedTenantsWithAttributes: false,
  errorTenantsWithAttributes: null,
  bestFitFlavors: [],
  isFetchingBestFitFlavor: false,
  isRejectedBestFitFlavor: false,
  errorBestFitFlavor: null,
  securityGroupsForVMs: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${QUERY_V2V_OSP_TENANT_ATTRIBUTES}_PENDING`:
      return state.set('isFetchingTenantsWithAttributes', true).set('isRejectedTenantsWithAttributes', false);
    case `${QUERY_V2V_OSP_TENANT_ATTRIBUTES}_FULFILLED`:
      return state
        .set('tenantsWithAttributes', action.payload.data.results)
        .set('isFetchingTenantsWithAttributes', false)
        .set('isRejectedTenantsWithAttributes', false)
        .set('errorTenantsWithAttributes', null);
    case `${QUERY_V2V_OSP_TENANT_ATTRIBUTES}_REJECTED`:
      return state
        .set('errorTenantsWithAttributes', action.payload)
        .set('isFetchingTenantsWithAttributes', false)
        .set('isRejectedTenantsWithAttributes', true);
    case `${QUERY_V2V_OSP_BEST_FIT_FLAVOR}_PENDING`:
      return state.set('isFetchingBestFitFlavor', true).set('isRejectedBestFitFlavor', false);
    case `${QUERY_V2V_OSP_BEST_FIT_FLAVOR}_FULFILLED`:
      return state
        .set('bestFitFlavors', action.payload.data.results)
        .set('isFetchingBestFitFlavor', false)
        .set('isRejectedBestFitFlavor', false)
        .set('errorBestFitFlavor', null);
    case `${QUERY_V2V_OSP_BEST_FIT_FLAVOR}_REJECTED`:
      return state
        .set('errorBestFitFlavor', action.payload)
        .set('isFetchingBestFitFlavor', false)
        .set('isRejectedBestFitFlavor', true);
    case SAVE_PREVIOUS_ROW_FOR_UNDO:
      return state
        .set('previousRowForUndo', action.payload);
    case SET_SECURITY_GROUPS_FOR_VMS:
      return state
        .set('securityGroupsForVMs', action.payload);
    default:
      return state;
  }
};
