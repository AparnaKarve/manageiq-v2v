import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import PlanWizardInstancePropertiesStepTable from './components/PlanWizardInstancePropertiesStepTable/PlanWizardInstancePropertiesStepTable';
import { OSP_TENANT } from '../../../../OverviewConstants';
import {
  getTenantsById,
  getDestinationTenantIdsBySourceClusterId,
  getVmsWithTargetClusterName
} from './PlanWizardInstancePropertiesStepSelectors';

class PlanWizardInstancePropertiesStep extends Component {
  componentDidMount() {
    const {
      selectedMapping,
      queryOpenstackTenantUrl,
      queryOpenstackTenantAttributes,
      queryTenantsWithAttributesAction,
      vmStepSelectedVms,
      getBestFitFlavorAction,
      bestFitFlavorUrl,
      tenantsWithAttributes
    } = this.props;

    const targetTenants =
      selectedMapping &&
      selectedMapping.transformation_mapping_items &&
      selectedMapping.transformation_mapping_items.filter(item => item.destination_type === OSP_TENANT);

    if (targetTenants) {
      const targetTenantIds = targetTenants.map(tenant => tenant.destination_id);
      // this is more handy for security groups

      const tenantsWithAttributesById = getTenantsById(tenantsWithAttributes);
      const destinationTenantIdsBySourceClusterId = getDestinationTenantIdsBySourceClusterId(
        selectedMapping.transformation_mapping_items
      );

      queryTenantsWithAttributesAction(queryOpenstackTenantUrl, targetTenantIds, queryOpenstackTenantAttributes, vmStepSelectedVms);

      let sourceAndDestinationMappingsForBestFit = [];

      vmStepSelectedVms.forEach((vm) => {
        targetTenantIds.forEach((tenant_id) => {
          sourceAndDestinationMappingsForBestFit.push({
            source_href: `vms/${vm.id}`,
            destination_href: `cloud_tenants/${tenant_id}`
          });
        });
      });

      //for flavors use this
      getBestFitFlavorAction(bestFitFlavorUrl, sourceAndDestinationMappingsForBestFit);
    }
  }

  render() {
    const { vmStepSelectedVms, tenantsWithAttributes, isFetchingTenantsWithAttributes, isFetchingBestFitFlavor, selectedMapping, bestFitFlavors, instancePropertiesStepForm, savePreviousRowAction, restorePreviousRowAction, previousRowForUndo, securityGroupsForVMs } = this.props;

    if (isFetchingBestFitFlavor || !securityGroupsForVMs) {
      return (
        <div className="blank-slate-pf">
          <div className="spinner spinner-lg blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">{__('Loading Security Groups and best fit flavors...')}</h3>
        </div>
      );
    }

    const tenantsWithAttributesById = getTenantsById(tenantsWithAttributes);
    const destinationTenantIdsBySourceClusterId = getDestinationTenantIdsBySourceClusterId(
      selectedMapping.transformation_mapping_items
    );
    const rows = getVmsWithTargetClusterName(
      vmStepSelectedVms,
      destinationTenantIdsBySourceClusterId,
      tenantsWithAttributesById,
      instancePropertiesStepForm
    );

    return (
      <Field
        name="ospInstanceProperties"
        component={PlanWizardInstancePropertiesStepTable}
        rows={rows}
        tenantsWithAttributesById={tenantsWithAttributesById}
        destinationTenantIdsBySourceClusterId={destinationTenantIdsBySourceClusterId}
        bestFitFlavors={bestFitFlavors}
        instancePropertiesStepForm={instancePropertiesStepForm}
        savePreviousRowAction={savePreviousRowAction}
        restorePreviousRowAction={restorePreviousRowAction}
        previousRowForUndo={previousRowForUndo}
      />
    );
  }
}

PlanWizardInstancePropertiesStep.propTypes = {
  vmStepSelectedVms: PropTypes.array,
  selectedMapping: PropTypes.object,
  queryOpenstackTenantUrl: PropTypes.string,
  queryOpenstackTenantAttributes: PropTypes.arrayOf(PropTypes.string),
  queryTenantsWithAttributesAction: PropTypes.func,
  tenantsWithAttributes: PropTypes.array,
  isFetchingTenantsWithAttributes: PropTypes.bool,
  getBestFitFlavorAction: PropTypes.func,
  bestFitFlavors: PropTypes.array,
  instancePropertiesStepForm: PropTypes.object,
  savePreviousRowAction: PropTypes.func,
  restorePreviousRowAction: PropTypes.func,
  previousRowForUndo: PropTypes.object
};

PlanWizardInstancePropertiesStep.defaultProps = {
  queryOpenstackTenantUrl: '/api/cloud_tenants',
  bestFitFlavorUrl: 'api/transformation_mappings',
  queryOpenstackTenantAttributes: ['flavors', 'security_groups']
};

export default reduxForm({
  form: 'planWizardInstancePropertiesStep',
  destroyOnUnmount: false
})(PlanWizardInstancePropertiesStep);
