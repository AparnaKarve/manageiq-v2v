import { connect } from 'react-redux';
import PlanWizardResultsStep from './PlanWizardResultsStep';
import * as PlanWizardResultsStepActions from './PlanWizardResultsStepActions';

import reducer from './PlanWizardResultsStepReducer';

export const reducers = { planWizardResultsStep: reducer };

const mapStateToProps = ({ planWizardResultsStep, planWizard }, ownProps) => ({
  ...planWizardResultsStep,
  ...planWizard,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  PlanWizardResultsStepActions,
  mergeProps
)(PlanWizardResultsStep);

// import { connect } from 'react-redux';
// import PlanWizardResultsStep from './PlanWizardResultsStep';
// import * as PlanWizardResultsStepActions from './PlanWizardResultsStepActions';
//
// const mapStateToProps = state => ({
//   migrationPlanName: state.form.planWizardGeneralStep.values.name
// });
//
// export default connect(mapStateToProps, PlanWizardResultsStepActions)(PlanWizardResultsStep);
