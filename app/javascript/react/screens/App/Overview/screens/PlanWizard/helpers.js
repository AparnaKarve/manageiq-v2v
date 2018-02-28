export const createMigrationPlans = (
  planWizardGeneralStep,
  planWizardCSVStep
) => {
  const planName = planWizardGeneralStep.values.name;
  const planDescription = planWizardGeneralStep.values.description;
  const infrastructureMapping =
    planWizardGeneralStep.values.infrastructure_mapping;

  return {
    name: planName,
    description: planDescription,
    type: 'ServiceTemplateTransformationPlan',
    display: false,
    options: {
      config_info: {
        transformation_mapping_id: infrastructureMapping,
        vms: ['1', '2']
      }
    }
  };
};
