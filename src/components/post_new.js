import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderInput(field) {
    const { meta: {touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : '' }`;

    return (
      <div className={className}>
        <label htmlFor="title">{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-danger">
          {touched ? error : ''}
        </div>
      </div>
    );
  };

  renderTextarea(field) {
    const { meta: {touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : '' }`;

    return (
      <div className={className}>
        <label htmlFor="title">{field.label}</label>
        <textarea
          className="form-control"
          {...field.input}>
        </textarea>
        <div className="text-danger">
          {touched ? error : ''}
        </div>
      </div>
    );
  };

  // this is where we call the action to make API call
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
    // this.props.reset();
  }

  render() {
    // handleSubmit is a reduxForm function, it triggers the validation (and perhaps
    // other things as well), and if the validation checks out then calls the
    // callback we provide
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderInput}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderInput}
        />
        <Field
          label="Content"
          name="content"
          component={this.renderTextarea}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-secondary">Cancel</Link>
      </form>
    )
  };
}

function validate(values) {
  // console.log(values);
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter a category";
  }
  if (!values.content) {
    errors.content = "Enter some content";
  }
  // if errors is empty the form is without error;
  // if errors has *any* property redux form won't submit
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
