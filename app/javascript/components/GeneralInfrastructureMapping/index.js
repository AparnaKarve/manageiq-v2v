import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Form, Grid } from 'patternfly-react';
import { bindActionCreators } from 'redux';
// import { bindMethods } from 'patternfly-react';
import {
  checkInputValueExistence,
} from '../../redux/actions/requiredField';
// import { required, length } from 'redux-form-validators';
// import Form from '../../common/forms/Form';
import TextField from '../formUtils/TextField';
// import { Field } from 'redux-form';
// import requiredField from '../../redux/actions';
import { load as loadAccount } from '../../redux/reducers/fieldData';
// import {Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col} from 'react-bootstrap';

class GeneralInfrastructureMappingContainer extends React.Component {
  constructor(props) {
    super(props);
    const { handleSubmit, pristine, reset, submitting } = props;
    bindMethods(this, ['checkInput']);
  }
  checkInput(event) {
    this.props.checkInputValueExistence(event.target.value);
  }

  render() {
    const {
      userInputExists,
    } = this.props;

    return (
      <Form horizontal>
        <Field
          name="name"
          controlId="name"
          label={__("Name")}
          component={renderField}
          validate={[required]}
          type="text" />
        <Field name="description" controlId="description" label={__("Description")} component={renderField} type="textarea" rows="2" />
      </Form>
    );
  }
}

GeneralInfrastructureMappingContainer.propTypes = {
  loaded: PropTypes.bool,
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string
};

GeneralInfrastructureMappingContainer.defaultProps = {
  loaded: false,
  activeStepIndex: 0,
  activeStep: '1'
};

const mapStateToProps = state => ({
  userInputExists: state.requiredField.userInput.exists,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    checkInputValueExistence,
  },
  dispatch,
);

const bindMethods = (context, methods) => {
  methods.forEach((method) => {
    // eslint-disable-next-line no-param-reassign
    context[method] = context[method].bind(context);
  });
};

// export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfrastructureMappingContainer);

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const GeneralInfrastructureMappingForm = reduxForm({
  form: 'generalInfrastructureMapping', // a unique identifier for this form
  destroyOnUnmount: false, // <------ preserve form data
  // forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(GeneralInfrastructureMappingContainer);

// You have to connect() to any reducers that you wish to connect to yourself
// GeneralInfrastructureMappingForm = connect(
//   state => ({
//     initialValues: state.requiredField.userInput // pull initial values from account reducer
//   }),
//   { load: loadAccount }               // bind account loading action creator
// )(GeneralInfrastructureMappingForm);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  ({ fieldData }) => ({
    initialValues: { name: '' },
  }),
  // { load: loadAccount},
)(GeneralInfrastructureMappingForm);

// export default reduxForm({
//   form: 'simple' // a unique identifier for this form
// })(GeneralInfrastructureMappingContainer)


////////////////////////////////////
const required = value => (value ? undefined : 'Required');
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

const renderField = ({
                       input,
                       label,
                       controlId,
                       type,
                       meta: { pristine, touched, error, warning },
                       ...props
                     }) => {

  const formGroupProps = {key: {label}, controlId, ...props};

  if (error) formGroupProps.validationState = 'error';

  return (
    <Form.FormGroup {...formGroupProps}>
      <Grid.Col componentClass={Form.ControlLabel} sm={2}>
        {label}
      </Grid.Col>
      <Grid.Col sm={9}>
        <Form.FormControl {...input} type={type} componentClass={type === 'text' ? undefined : type} />
        {pristine && error && <Form.HelpBlock>{error}</Form.HelpBlock>}
      </Grid.Col>
    </Form.FormGroup>
  );
};
