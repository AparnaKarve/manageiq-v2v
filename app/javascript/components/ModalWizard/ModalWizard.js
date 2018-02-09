import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { noop, Modal, Wizard, Icon, Button } from 'patternfly-react';

const ModalWizard = props => {
  const {
    title,
    showWizard,
    onHide,
    onExited,
    onBack,
    onNext,
    activeStepIndex,
    activeStep,
    numSteps,
    goToStep,
    children,
    formError,
    form
  } = props;
  const disableNextStep = formError ? true : false;
  const onFirstStep = activeStepIndex === 0;
  const onFinalStep = activeStepIndex === numSteps - 1;

  const onCancel = () => {
    // form.generalInfrastructureMapping.forceUnregisterOnUnmount = true;
    form.generalInfrastructureMapping.values = {};
    onHide();
  };

  const onClose = onCancel;

  return (
    <Modal
      show={showWizard}
      onHide={onHide}
      onExited={onExited}
      dialogClassName="modal-lg wizard-pf"
    >
      <Wizard>
        <Modal.Header>
          <button
            className="close"
            onClick={onClose}
            aria-hidden="true"
            aria-label="Close"
          >
            <Icon type="pf" name="close" />
          </button>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="wizard-pf-body clearfix">
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              activeStepIndex,
              activeStep,
              goToStep
            })
          )}
        </Modal.Body>
        <Modal.Footer className="wizard-pf-footer">
          <Button bsStyle="default" className="btn-cancel" onClick={onCancel}>
            <FormattedMessage id="wizard.cancel" />
          </Button>
          <Button bsStyle="default" onClick={onBack} disabled={onFirstStep}>
            <Icon type="fa" name="angle-left" />
            <FormattedMessage id="wizard.back" />
          </Button>
          <Button bsStyle="primary" onClick={onFinalStep ? onHide : onNext} disabled={disableNextStep}>
            {onFinalStep ? (
              <FormattedMessage id="wizard.close" />
            ) : (
              <FormattedMessage id="wizard.next" />
            )}
            <Icon type="fa" name="angle-right" />
          </Button>
        </Modal.Footer>
      </Wizard>
    </Modal>
  );
};

ModalWizard.propTypes = {
  showWizard: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onHide: PropTypes.func,
  onExited: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string,
  numSteps: PropTypes.number,
  goToStep: PropTypes.func,
  children: PropTypes.node
};

ModalWizard.defaultProps = {
  showWizard: false,
  title: '',
  onHide: PropTypes.func,
  onExited: noop,
  onBack: noop,
  onNext: noop,
  activeStepIndex: 0,
  activeStep: '1',
  numSteps: 1,
  goToStep: PropTypes.func,
  children: null
};

const mapStateToProps = state => ({
  formError: state.form.generalInfrastructureMapping && state.form.generalInfrastructureMapping.syncErrors,
  form: state.form
});

export default connect(mapStateToProps)(
  ModalWizard
);
