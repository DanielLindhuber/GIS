import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import '../styles/Signin.css';

class Signin extends Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push('/home');
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div id="login">
        <h3 className="text-center text-white pt-5">Htl-Braunau GIS</h3>
        <div className="container">
        <div id="login-row" className="row justify-content-center align-items-center">
        <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
                
                <form id="login-form" className="form" onSubmit={handleSubmit(this.onSubmit)} >

                 <h3 className="text-center text-info">Login</h3>
     
                    <div className="form-group">
                    <label htmlFor="username" className="text-info">Username:</label><br/>
                            <Field name="username" type="text" id="username" className="form-control" component="input" autoComplete="none" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="text-info">Password:</label><br/>
                        <Field name="password" type="password" id="password" className="form-control" component="input" autoComplete="none" />
                    </div>

                    <div className="form-group">
                      <button type="submit" name="submit" className="btn btn-info btn-md" value="submit">Sign In!</button>
                    </div>

                    <div>{this.props.errorMessage}</div>
                </form>

                </div>
                </div>
                </div>
                </div>
                </div>
            
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(Signin);



