import { connect } from 'react-redux';
import PlanWizardResultsStep from './PlanWizardResultsStep';

const mapStateToProps = state => ({
  migrationPlanName: state.form.planWizardGeneralStep.values.name
});

export default connect(mapStateToProps)(PlanWizardResultsStep);
