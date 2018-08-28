import { OSP_TENANT, EMS_CLUSTER } from '../../../../OverviewConstants';

export const getTenantsById = tenants =>
  tenants.reduce(
    (tenantsById, tenant) => ({
      ...tenantsById,
      [tenant.id]: { ...tenant }
    }),
    {}
  );

export const getDestinationTenantIdsBySourceClusterId = transformation_mapping_items => {
  const relevantMappings = transformation_mapping_items.filter(
    item => item.destination_type === OSP_TENANT && item.source_type === EMS_CLUSTER
  );
  return relevantMappings.reduce(
    (newObject, mapping) => ({
      ...newObject,
      [mapping.source_id]: mapping.destination_id
    }),
    {}
  );
};

// const flavorIdForVM = (bestFitFlavors, vmId) => bestFitFlavors.find(row => row.source_href === `vms/${vmId}`).best_fit.slice(8);

export const getVmsWithTargetClusterName = (vms, destinationTenantIdsBySourceClusterId, tenantsWithAttributesById, instancePropertiesStepForm) =>
  vms.map(vm => {
    const destinationTenantId = destinationTenantIdsBySourceClusterId[vm.ems_cluster_id];
    const tenant = destinationTenantId && tenantsWithAttributesById[destinationTenantId];

    let flavorName = '';
    let securityGroupName = '';

    if (instancePropertiesStepForm && instancePropertiesStepForm.values && instancePropertiesStepForm.values[`osp_flavor_${vm.id}`]) {
      const flavorId = instancePropertiesStepForm.values[`osp_flavor_${vm.id}`];
      flavorName = tenant.flavors.find(flavor => flavor.id === flavorId).name;
    }

    if (instancePropertiesStepForm && instancePropertiesStepForm.values && instancePropertiesStepForm.values[`osp_security_group_${vm.id}`]) {
      const securityGroupId = instancePropertiesStepForm.values[`osp_security_group_${vm.id}`];
      securityGroupName = tenant.security_groups.find(security_group => security_group.id === securityGroupId).name;
    }
    return {
      ...vm,
      osp_security_group: {name: securityGroupName},
      osp_flavor: {name: flavorName},
      target_cluster_name: tenant ? tenant.name : '',
      target_cluster_id: tenant ? tenant.id : ''
    };
  });
