import URI from 'urijs';
import { saveAs } from 'file-saver';
import API from '../../../../common/API';

import {
  FETCH_V2V_PLAN_REQUEST,
  FETCH_V2V_PLAN,
  QUERY_V2V_PLAN_VMS,
  RESET_PLAN_STATE,
  FETCH_V2V_MIGRATION_TASK_LOG
} from './PlanConstants';

// *****************************************************************************
// * FETCH_V2V_PLAN_REQUEST
// *****************************************************************************
const _getPlanRequestActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_PLAN_REQUEST,
    payload: API.get(url)
  });

export const fetchPlanRequestAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  uri.addSearch({ attributes: 'miq_request_tasks' });
  return _getPlanRequestActionCreator(uri.toString());
};

// *****************************************************************************
// * QUERY_V2V_PLAN_VMS
// *****************************************************************************
const _queryPlanVmsActionCreator = ids => dispatch => {
  const resources = ids.map(id => ({
    id
  }));

  return dispatch({
    type: QUERY_V2V_PLAN_VMS,
    payload: API.post('/api/vms', {
      action: 'query',
      resources
    })
  });
};

export const queryPlanVmsAction = ids => _queryPlanVmsActionCreator(ids);

// *****************************************************************************
// * FETCH_V2V_PLAN
// *****************************************************************************
export const _getPlanActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_PLAN,
    payload: new Promise((resolve, reject) => {
      API.get(url)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    })
  });

export const fetchPlanAction = (url, id) => {
  const uri = new URI(`${url}/${id}`);
  uri.addSearch({ attributes: 'miq_requests' });
  return _getPlanActionCreator(uri.toString());
};

// *****************************************************************************
// * RESET_PLAN_STATE
// *****************************************************************************
export const resetPlanStateAction = () => ({
  type: RESET_PLAN_STATE
});

export const downloadLogAction = task => dispatch =>
  // todo: write download log api logic
  dispatch({
    type: FETCH_V2V_MIGRATION_TASK_LOG,
    payload: new Promise((resolve, reject) => {
      API.get(`/migration_log/download_migration_log/${task.id}`)
        .then(response => {
          resolve(response);
          if (response.data.status === 'Ok') {
            const blob = new Blob([response.data.log_contents], {
              type: 'text/plain;charset=utf-8'
            });
            saveAs(blob, `v2v_${taskId}.log`);
          } else {
            const file = new File(
              [response.data.status_message],
              `${task.options.virtv2v_wrapper.v2v_log.substr(
                task.options.virtv2v_wrapper.v2v_log.lastIndexOf('/') + 1
              )}`,
              { type: 'text/plain;charset=utf-8' }
            );
            saveAs(file);
          }
        })
        .catch(e => {
          reject(e);
        });
    })
  });
