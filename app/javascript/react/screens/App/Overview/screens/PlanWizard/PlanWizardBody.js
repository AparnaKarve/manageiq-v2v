import React from 'react';
import PropTypes from 'prop-types';
import ModalWizard from '../../components/ModalWizard';
import PlanWizardGeneralStep from '../PlanWizard/components/PlanWizardGeneralStep';
import PlanWizardCSVStep from '../PlanWizard/components/PlanWizardCSVStep';
import PlanWizardResultsStep from '../PlanWizard/components/PlanWizardResultsStep';

// TODO remove these, they are space fillers
const t = str => (
  <div align="center">
    <h1>TODO: {str}!</h1>
  </div>
);
const todo = str => (
  <div>
    {t(str)}
    {t(str)}
    {t(str)}
    {t(str)}
    {t(str)}
  </div>
);

const PlanWizardBody = props => (
  <ModalWizard.Body
    {...props}
    loadingTitle={__('Loading Clusters...')}
    loadingMessage={__('This may take a minute.')}
    steps={[
      {
        title: __('General'),
        render: () => <PlanWizardGeneralStep />
      },
      {
        title: __('VMs'),
        render: () => <PlanWizardCSVStep />
      },
      {
        title: __('Results'),
        render: () => <PlanWizardResultsStep />
      }
    ]}
  />
);

PlanWizardBody.propTypes = {
  loaded: PropTypes.bool,
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string,
  plansBody: PropTypes.object
};

PlanWizardBody.defaultProps = {
  loaded: false,
  activeStepIndex: 0,
  activeStep: '1',
  plansBody: {}
};

export default PlanWizardBody;
