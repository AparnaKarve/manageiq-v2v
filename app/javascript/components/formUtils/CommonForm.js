import React from 'react';

const CommonForm = ({
                      className = '',
                      label = '',
                      touched = false,
                      error = undefined,
                      required = false,
                      children,
                      inputClassName = 'col-md-4',
                    }) => (
  <div className={`form-group ${className} ${touched && error ? 'has-error' : ''}`}>
    <label className="col-md-2 control-label">
      {label}
    </label>
    <div className={inputClassName}>{children}</div>
    {touched &&
    error && (
      <span className="help-block">
        <span className="error-message">{error}</span>
      </span>
    )}
  </div>
);

export default CommonForm;

// const loadingContents = (name) => (
//   <form className="form-horizontal">
//     <div className="form-group has-error">
//       <label className="col-sm-2 control-label">{name}</label>
//       <div className="col-sm-10">
//         <input type="text" className="form-control" required/>
//         <span class="help-block">
//           Required
//          </span>
//       </div>
//     </div>
//     <div className="form-group">
//       <label className="col-sm-2 control-label">Description</label>
//       <div className="col-sm-10">
//         <textarea className="form-control" rows="2" />
//       </div>
//     </div>
//   </form>
// );

