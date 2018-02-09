import React from 'react';
import PropTypes from 'prop-types';
// import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { store } from '../../redux';
import { bindMethods, noop, EmptyState, Spinner, Wizard } from 'patternfly-react';

class ModalWizardBody extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['onStepClick', 'stepProps', 'renderLoading']);
  }

  onStepClick(stepIndex) {
    const { steps, goToStep, formError } = this.props;
    if (formError) {
      return;
    }
    const step = steps[stepIndex];
    goToStep(stepIndex);
    if (step && step.onClick) {
      step.onClick();
    }
    console.log('on step index click: ', stepIndex);
  }

  stepProps(stepIndex, titleId) {
    const { activeStep } = this.props;
    const label = (stepIndex + 1).toString();
    const title = this.props.title; //.intl.formatMessage({ id: titleId });
    return {
      key: `wizard-step-${title}`,
      stepIndex,
      label,
      step: label,
      title,
      activeStep
    };
  }

  renderLoading() {
    const { loadingTitle, loadingMessage } = this.props;
    return (
      <Wizard.Row>
        <Wizard.Main>
          <EmptyState>
            <Spinner size="lg" className="blank-slate-pf-icon" loading />
            <EmptyState.Action>
              <h3>
                {loadingTitle}
              </h3>
            </EmptyState.Action>
            <EmptyState.Action secondary>
              <p>
                {loadingMessage}
              </p>
            </EmptyState.Action>
          </EmptyState>
        </Wizard.Main>
      </Wizard.Row>
    );
  }

  render() {
    const { loaded, steps, activeStepIndex } = this.props;
    const step = steps[activeStepIndex];

    if (!loaded) {
      return this.renderLoading();
    }

    const renderedStep =
      step && step.render && step.render(activeStepIndex, step.title);

    return (
      <React.Fragment>
        <Wizard.Steps
          steps={steps.map((stepObj, index) => (
            <Wizard.Step
              {...this.stepProps(index, stepObj.title)}
              onClick={() => this.onStepClick(index)}
            />
          ))}
        />
        <Wizard.Row>
          <Wizard.Main>
            <Wizard.Contents>{renderedStep}</Wizard.Contents>
          </Wizard.Main>
        </Wizard.Row>
      </React.Fragment>
    );
  }
}

ModalWizardBody.propTypes = {
  loadingTitle: PropTypes.string,
  loadingMessage: PropTypes.string,
  loaded: PropTypes.bool,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      render: PropTypes.func,
      onClick: PropTypes.func
    })
  ),
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string,
  onClick: PropTypes.func,
  goToStep: PropTypes.func,
  // intl: PropTypes.object.isRequired
};

ModalWizardBody.defaultProps = {
  loadingTitle: 'Loading Wizard...',
  loadingMessage: 'Lorem ipsum dolor sit amet...',
  loaded: false,
  steps: [{ title: 'General', render: () => <p>General</p> }],
  activeStepIndex: 0,
  activeStep: '1',
  onClick: noop,
  goToStep: noop
};

const mapStateToProps = state => ({
  formError: state.form.generalInfrastructureMapping && state.form.generalInfrastructureMapping.syncErrors,
  form: state.form
});

export default connect(mapStateToProps)(
  ModalWizardBody
);

// export default injectIntl(ModalWizardBody);
