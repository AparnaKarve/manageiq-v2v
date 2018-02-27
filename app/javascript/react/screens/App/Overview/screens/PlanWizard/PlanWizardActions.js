import { reset } from 'redux-form';
// import API from '../../../../../../../../common/API';
import {
  CLOSE_PLAN_WIZARD,
  HIDE_PLAN_WIZARD,
  PLAN_WIZARD_EXITED
} from '../../OverviewConstants';

export const closePlanWizardAction = () => dispatch => {
  // dispatch({
  //   type: FETCH_V2V_SOURCE_CLUSTERS,
  //   payload: API.get(url)
  // }).catch(error => {
  //   // redux-promise-middleware will automatically send:
  //   // FETCH_V2V_SOURCE_CLUSTERS_PENDING, FETCH_V2V_SOURCE_CLUSTERS_FULFILLED, FETCH_V2V_SOURCE_CLUSTERS_REJECTED
  //
  //   // to enable UI development without the backend ready, i'm catching the error
  //   // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
  //   dispatch({
  //     type: `${FETCH_V2V_SOURCE_CLUSTERS}_FULFILLED`,
  //     payload: requestSourceClustersData.response
  //   });
  dispatch({
    type: CLOSE_PLAN_WIZARD
  });
};

export const hidePlanWizardAction = () => dispatch => {
  dispatch({
    type: HIDE_PLAN_WIZARD
  });
};

export const planWizardExitedAction = () => dispatch => {
  dispatch({
    type: PLAN_WIZARD_EXITED
  });
  // Dispatch reset for all the wizard step forms here
  dispatch(reset('planWizardGeneralStep'));
  dispatch(reset('planWizardCSVStep'));
};
