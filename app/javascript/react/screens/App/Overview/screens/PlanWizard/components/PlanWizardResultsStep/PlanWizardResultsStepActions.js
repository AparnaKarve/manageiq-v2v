import API from '../../../../../../../../common/API';
import { POST_V2V_TRANSFORM_PLANS } from './PlanWizardResultsStepConstants';
// import {
//   HIDE_MAPPING_WIZARD,
//   SHOW_PLAN_WIZARD
// } from '../../../../OverviewConstants';
import { requestTransformationPlansData } from './planWizardResultsStep.fixtures';

// export const continueToPlanAction = id => dispatch => {
//   dispatch({
//     type: HIDE_MAPPING_WIZARD
//   });
//   dispatch({
//     type: SHOW_PLAN_WIZARD,
//     payload: { id }
//   });
// };

const _postTransformPlansActionCreator = (url, transformPlans) => dispatch =>
  dispatch({
    type: POST_V2V_TRANSFORM_PLANS,
    payload: API.post(url, transformPlans)
  }).catch(error => {
    // to enable UI development without the backend ready, i'm catching the error
    // and passing some mock data thru the FULFILLED action after the REJECTED action is finished.
    dispatch({
      type: `${POST_V2V_TRANSFORM_PLANS}_FULFILLED`,
      payload: requestTransformationPlansData.response
    });
  });

export const postTransformMappingsAction = (url, transformPlans) =>
  _postTransformPlansActionCreator(url, transformPlans);
