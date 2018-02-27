import React from 'react';
import { Form, Icon } from 'patternfly-react';
import PropTypes from 'prop-types';

const PlanWizardResultsStep = props => {
  const { migrationPlanName } = props;
  const migrationPlan = sprintf(
    __(" Migration Plan: '%s' is in progress"),
    migrationPlanName
  );

  return (
    <div className="wizard-pf-complete blank-slate-pf">
      <div className="plan-wizard-results-step-icon">
        <span className="fa fa-clock-o" />
      </div>
      <h3 className="blank-slate-pf-main-action">
        {migrationPlan}
      </h3>
      <p className="blank-slate-pf-secondary-action">
        {__('This may take a long time. Progress of the plan will be shown in the Migration area')}
      </p>
    </div>
  );
};

PlanWizardResultsStep.propTypes = {
  migrationPlanName: PropTypes.string
};

export default PlanWizardResultsStep;
