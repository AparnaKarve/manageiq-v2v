import { connect } from 'react-redux';

import PlanWizardAdvancedOptionsStep from './PlanWizardAdvancedOptionsStep';
import * as PlanWizardAdvancedOptionsStepActions from './PlanWizardAdvancedOptionsStepActions';
import { getVMStepSelectedVms } from './PlanWizardAdvancedOptionsStepSelectors';
import reducer from './PlanWizardAdvancedOptionsStepReducer';

export const reducers = { planWizardAdvancedOptionsStep: reducer };

const mapStateToProps = (
  {
    planWizardAdvancedOptionsStep,
    planWizardVMStep: { valid_vms },
    form: {
      planWizardVMStep: {
        values: { selectedVms }
      },
      planWizardAdvancedOptionsStep: advancedOptionsStepForm
    }
  },
  ownProps
) => ({
  ...planWizardAdvancedOptionsStep,
  ...ownProps.data,
  advancedOptionsStepForm,
  vmStepSelectedVms: getVMStepSelectedVms(valid_vms, selectedVms)
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps.data,
  ...dispatchProps
});

export default connect(
  mapStateToProps,
  PlanWizardAdvancedOptionsStepActions,
  mergeProps
)(PlanWizardAdvancedOptionsStep);
