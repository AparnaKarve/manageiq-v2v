import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import ModalWizard from '../../components/ModalWizard';
import componentRegistry from '../../../../../../components/componentRegistry';
import PlanWizardGeneralStep from '../PlanWizard/components/PlanWizardGeneralStep';
import PlanWizardCSVStep from '../PlanWizard/components/PlanWizardCSVStep';

class PlanWizardBody extends React.Component {
  constructor(props) {
    super(props);

    this.planWizardResultsStepContainer = componentRegistry.markup(
      'PlanWizardResultsStepContainer'
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
  render() {
    return (
      <ModalWizard.Body
        {...this.props}
        loadingTitle={__('Loading Migration Plans...')}
        loadingMessage={__('This may take a minute.')}
        steps={[
          {
            title: __('General'),
            render: () => <PlanWizardGeneralStep />,
            onClick: () => console.log('on step 1 click')
          },
          {
            title: __('VMs'),
            render: () => <PlanWizardCSVStep />,
            onClick: () => console.log('on step 2 click')
          },
          {
            title: __('Results'),
            render: () => this.planWizardResultsStepContainer,
            onClick: () => console.log('on step 3 click')
          }
        ]}
      />
    );
  }
}

PlanWizardBody.propTypes = {
  loaded: PropTypes.bool,
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string,
  goToStep: PropTypes.func,
  disableNextStep: PropTypes.bool,
  plansBody: PropTypes.object
};

PlanWizardBody.defaultProps = {
  loaded: false,
  activeStepIndex: 0,
  activeStep: '1',
  goToStep: noop,
  disableNextStep: true,
  plansBody: {}
};

export default PlanWizardBody;

// const PlanWizardBody = props => (
//   <ModalWizard.Body
//     {...props}
//     loadingTitle={__('Loading Clusters...')}
//     loadingMessage={__('This may take a minute.')}
//     steps={[
//       {
//         title: __('General'),
//         render: () => <PlanWizardGeneralStep />
//       },
//       {
//         title: __('VMs'),
//         render: () => <PlanWizardCSVStep />
//       },
//       {
//         title: __('Results'),
//         render: () => todo('Display Progress and Results')
//       }
//     ]}
//   />
// );
//
// PlanWizardBody.propTypes = {
//   loaded: PropTypes.bool,
//   activeStepIndex: PropTypes.number,
//   activeStep: PropTypes.string
// };
//
// PlanWizardBody.defaultProps = {
//   loaded: false,
//   activeStepIndex: 0,
//   activeStep: '1'
// };
//
// export default PlanWizardBody;
