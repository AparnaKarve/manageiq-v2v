import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, Spinner } from 'patternfly-react';

// class PlanWizardResultsStep extends React.Component {
  // constructor() {
  //   super();
  //   const { postPlansUrl, postTransformPlansAction, plansBody } = this.props;
  //   postTransformPlansAction(postPlansUrl, plansBody);
  // }
  // componentDidMount() {
  //   const { postPlansUrl, postTransformPlansAction, plansBody } = this.props;
  //
  //   postTransformPlansAction(postPlansUrl, plansBody);
  // }
const PlanWizardResultsStep = props => {
  const {
    isPostingPlans,
    isRejectedPostingPlans,
    transformationPlansResult,
    // plansBody,
    errorPostingPlans // eslint-disable-line no-unused-vars
  } = props;

  const { postPlansUrl, postTransformPlansAction, plansBody } = props;

  // return(
  postTransformPlansAction(postPlansUrl, plansBody);


    if (isPostingPlans) {
      return (
        <div className="wizard-pf-process blank-slate-pf">
          <Spinner loading size="lg" className="blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">
            {__('Creating Migration Plan...')}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            {__('Please wait while migration plan is created.')}
          </p>
        </div>
      );
    } else if (isRejectedPostingPlans) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="pficon pficon-error-circle-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">
            {__('Error Creating Migration Plan')}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            {__("We're sorry, something went wrong. Please try again.")}
          </p>
          <button type="button" className="btn btn-lg btn-primary">
            {__('Retry')}
          </button>
        </div>
      );
    } else if (transformationPlansResult) {
      const migrationPlan = sprintf(
        __(" Migration Plan: '%s' is in progress"),
        plansBody.name
      );
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="plan-wizard-results-step-icon">
            <span className="fa fa-clock-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">{migrationPlan}</h3>
          <p className="blank-slate-pf-secondary-action">
            {__(
              'This may take a long time. Progress of the plan will be shown in the Migration area'
            )}
          </p>
        </div>
      );
    }
    return null;
// );
}
PlanWizardResultsStep.propTypes = {
  postPlansUrl: PropTypes.string,
  postTransformPlansAction: PropTypes.func,
  plansBody: PropTypes.object,
  isPostingPlans: PropTypes.bool,
  isRejectedPostingPlans: PropTypes.bool,
  errorPostingPlans: PropTypes.object,
  transformationPlansResult: PropTypes.object
};
PlanWizardResultsStep.defaultProps = {
  postPlansUrl: '',//'/api/migrationPlans',
  postTransformPlansAction: noop,
  plansBody: {},
  isPostingPlans: true,
  isRejectedPostingPlans: false,
  errorPostingPlans: null,
  transformationPlansResult: null
};
export default PlanWizardResultsStep;

// const PlanWizardResultsStep = props => {
//   const { migrationPlanName } = props;
//   const migrationPlan = sprintf(
//     __(" Migration Plan: '%s' is in progress"),
//     migrationPlanName
//   );
//
//   return (
//     <div className="wizard-pf-complete blank-slate-pf">
//       <div className="plan-wizard-results-step-icon">
//         <span className="fa fa-clock-o" />
//       </div>
//       <h3 className="blank-slate-pf-main-action">{migrationPlan}</h3>
//       <p className="blank-slate-pf-secondary-action">
//         {__(
//           'This may take a long time. Progress of the plan will be shown in the Migration area'
//         )}
//       </p>
//     </div>
//   );
// };
//
// PlanWizardResultsStep.propTypes = {
//   migrationPlanName: PropTypes.string
// };
//
// export default PlanWizardResultsStep;
