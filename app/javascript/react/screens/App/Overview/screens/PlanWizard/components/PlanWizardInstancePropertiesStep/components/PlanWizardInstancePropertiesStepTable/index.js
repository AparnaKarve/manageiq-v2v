import { connect } from 'react-redux';
import PlanWizardInstancePropertiesStepTable from './PlanWizardInstancePropertiesStepTable';

const mapStateToProps = () => ({
  // transformationMappings: overview.transformationMappings,
  // transformationPlans: overview.transformationPlans,
  // archivedTransformationPlans: overview.archivedTransformationPlans,
  initialValues: {
    osp_security_group_69: 'default'
  }
});

export default connect(
  mapStateToProps
)(PlanWizardInstancePropertiesStepTable);