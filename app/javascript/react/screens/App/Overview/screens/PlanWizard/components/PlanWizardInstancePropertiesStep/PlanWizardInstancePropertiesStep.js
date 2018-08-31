import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import PlanWizardInstancePropertiesStepTable from './components/PlanWizardInstancePropertiesStepTable';
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
      bestFitFlavorAction,
      bestFitFlavorUrl,
    } = this.props;

    const targetTenants =
      selectedMapping &&
      selectedMapping.transformation_mapping_items &&
      selectedMapping.transformation_mapping_items.filter(item => item.destination_type === OSP_TENANT);

    if (targetTenants) {
      const targetTenantIds = targetTenants.map(tenant => tenant.destination_id);
      queryTenantsWithAttributesAction(queryOpenstackTenantUrl, targetTenantIds, queryOpenstackTenantAttributes);

      let sourceAndDestinationHrefSlugsForBestFit = [];

      vmStepSelectedVms.forEach((vm) => {
        const destinationTenantId = targetTenants.filter(tenant => tenant.source_id === vm.ems_cluster_id)[0].destination_id;
        sourceAndDestinationHrefSlugsForBestFit.push({
          source_href_slug: `vms/${vm.id}`,
          destination_href_slug: `cloud_tenants/${destinationTenantId}`
        });
      });

      bestFitFlavorAction(bestFitFlavorUrl, sourceAndDestinationHrefSlugsForBestFit);
    }

    const { tenantsWithAttributes, instancePropertiesRowsAction } = this.props;

    // if (tenantsWithAttributes.length > 0) {
      const tenantsWithAttributesById = getTenantsById(tenantsWithAttributes);
      const destinationTenantIdsBySourceClusterId = getDestinationTenantIdsBySourceClusterId(
        selectedMapping.transformation_mapping_items
      );
      const rows = getVmsWithTargetClusterName(
        vmStepSelectedVms,
        destinationTenantIdsBySourceClusterId,
        tenantsWithAttributesById
      );

      instancePropertiesRowsAction(rows);
    // }
  }

  render() {
    const { vmStepSelectedVms, tenantsWithAttributes, isFetchingTenantsWithAttributes, selectedMapping, instancePropertiesRowsAction, instancePropertiesRows, setInstancePropertiesSingleRowAction, updatedInstancePropertiesRow, isSettingSecurityGroupsAndBestFitFlavors } = this.props;

    if (isFetchingTenantsWithAttributes || isSettingSecurityGroupsAndBestFitFlavors) {
      return (
        <div className="blank-slate-pf">
          <div className="spinner spinner-lg blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">{__('Loading...')}</h3>
        </div>
      );
    }

    const tenantsWithAttributesById = getTenantsById(tenantsWithAttributes);
    const destinationTenantIdsBySourceClusterId = getDestinationTenantIdsBySourceClusterId(
      selectedMapping.transformation_mapping_items
    );
    // const rows = getVmsWithTargetClusterName(
    //   vmStepSelectedVms,
    //   destinationTenantIdsBySourceClusterId,
    //   tenantsWithAttributesById
    // );
    //
    // instancePropertiesRowsAction(rows);

    return (

      <PlanWizardInstancePropertiesStepTable
        rows={instancePropertiesRows}
        tenantsWithAttributesById={tenantsWithAttributesById}
        destinationTenantIdsBySourceClusterId={destinationTenantIdsBySourceClusterId}
        instancePropertiesRowsAction={instancePropertiesRowsAction}
        setInstancePropertiesSingleRowAction={setInstancePropertiesSingleRowAction}
        updatedInstancePropertiesRow={updatedInstancePropertiesRow}
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
  bestFitFlavorAction: PropTypes.func,
  instancePropertiesRowsAction: PropTypes.func,
  setInstancePropertiesSingleRowAction: PropTypes.func,
  updatedInstancePropertiesRow: PropTypes.object
};

PlanWizardInstancePropertiesStep.defaultProps = {
  queryOpenstackTenantUrl: '/api/cloud_tenants',
  bestFitFlavorUrl: 'api/transformation_mappings',
  queryOpenstackTenantAttributes: ['flavors', 'security_groups']
};

export default reduxForm({
  form: 'planWizardInstancePropertiesStep',
  // initialValues: { ospInstanceProperties: [] },
  destroyOnUnmount: false
})(PlanWizardInstancePropertiesStep);
