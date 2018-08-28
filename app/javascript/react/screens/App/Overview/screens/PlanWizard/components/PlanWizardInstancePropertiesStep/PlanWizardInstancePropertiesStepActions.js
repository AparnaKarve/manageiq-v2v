import URI from 'urijs';
import { change } from 'redux-form';
import API from '../../../../../../../../common/API';

import { QUERY_V2V_OSP_TENANT_ATTRIBUTES, QUERY_V2V_OSP_BEST_FIT_FLAVOR, SAVE_PREVIOUS_ROW_FOR_UNDO, SET_SECURITY_GROUPS_FOR_VMS } from './PlanWizardInstancePropertiesStepConstants';

export const setSecurityGroupValues = (response, vmRows, dispatch) => {
  vmRows.forEach((vmRow) => {
    const defaultSecurityGroup = response.data.results[0].security_groups.find(securityGroup => securityGroup.name === 'default');
    dispatch(change('planWizardInstancePropertiesStep', `osp_security_group_${vmRow.id}`, defaultSecurityGroup.id));
  });
  dispatch({
    type: SET_SECURITY_GROUPS_FOR_VMS,
    payload: true
  });
};

export const _getTenantWithAttributesActionCreator = (url, tenantIds, vmRows) => dispatch => {
  const postBody = {
    action: 'query',
    resources: tenantIds.map(id => ({ id }))
  };
  dispatch({
    type: QUERY_V2V_OSP_TENANT_ATTRIBUTES,
    payload: new Promise((resolve, reject) => {
      API.post(url, postBody)
        .then(response => {
          resolve(response);
          setSecurityGroupValues(response, vmRows, dispatch);
      })
        .catch(e => {
          reject(e);
        });
    })
  });
};

export const queryTenantsWithAttributesAction = (url, tenantIds, attributes, vmRows) => {
  const uri = new URI(url);
  // Creates url like /api/cloud_tenants?expand=resources&attributes=flavors,security_groups
  uri.addSearch({ expand: 'resources', attributes: attributes.join(',') });
  return _getTenantWithAttributesActionCreator(uri.toString(), tenantIds, vmRows);
};

export const setFlavorValues = (response, dispatch) => {
  response.data.results.forEach(result => {
    const vmId = result.source_href.slice(4);
    const flavorId = result.best_fit.slice(8);

    dispatch(change('planWizardInstancePropertiesStep', `osp_flavor_${vmId}`, flavorId));
  });
};

export const _getBestFitFlavorActionCreator = (url, mappings) => dispatch => {
  const postBody = {
    action: 'vm_flavor_fit',
    mappings: mappings
  };
  dispatch({
    type: QUERY_V2V_OSP_BEST_FIT_FLAVOR,
    payload: new Promise((resolve, reject) => {
      API.post(url, postBody)
        .then(response => {
          resolve(response);
          setFlavorValues(response, dispatch);
        })
        .catch(e => {
          reject(e);
        });
    })
  });
};

export const getBestFitFlavorAction = (url, mappings) => {
  const uri = new URI(url);
  return _getBestFitFlavorActionCreator(uri.toString(), mappings);
};

export const savePreviousRowAction = (rowData) => dispatch =>
  dispatch({
    type: SAVE_PREVIOUS_ROW_FOR_UNDO,
    payload: rowData
  });

export const restorePreviousRowAction = (rowData, id) => dispatch => {
  dispatch(change('planWizardInstancePropertiesStep', `osp_flavor_${id}`, rowData[`osp_flavor_${id}`]));
  dispatch(change('planWizardInstancePropertiesStep', `osp_security_group_${id}`, rowData[`osp_security_group_${id}`]));
};
