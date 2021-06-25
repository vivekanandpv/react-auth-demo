import React, { useState, useEffect } from 'react';
import { login } from '../services/auth-service';
import { useHistory } from 'react-router';

const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkMeOut, setCheckMeOut] = useState(false);

  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegEx = /.{8,16}/;

  const [emailValidationError, setEmailValidationError] =
    useState('Email is empty');
  const [passwordValidationError, setPasswordValidationError] =
    useState('Password is empty');

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    validateForm();

    if (emailValidationError || passwordValidationError) {
      console.log(emailValidationError, passwordValidationError);
      alert('Cannot submit invalid or empty form');
      return;
    } else {
      const formData = {
        username: email,
        password,
      };

      login(formData)
        .then((v) => {
          const returnUrl = props.location?.state?.from?.pathname;
          history.push(returnUrl); //  programmatic navigation
        })
        .catch((e) => console.log('Login Component: Failure'));
    }
  };

  useEffect(() => {
    validateForm();
  });

  const validateForm = () => {
    if (emailRegEx.test(email)) {
      setEmailValidationError(null);
    } else {
      setEmailValidationError('Email is invalid');
    }

    if (passwordRegEx.test(password)) {
      setPasswordValidationError(null);
    } else {
      setPasswordValidationError('Invalid password (8-16 characters)');
    }
  };

  const inputHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        setEmailTouched(true);
        break;
      case 'password':
        setPassword(e.target.value);
        setPasswordTouched(true);
        break;
      case 'checkMeOut':
        setCheckMeOut(e.target.checked);
        break;
      default:
        break;
    }
  };

  const focusHandler = (e) => {};

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label>Email address</label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            onChange={inputHandler}
            onFocus={focusHandler}
            value={email}
            name='email'
          />
          {emailTouched && (
            <small className='form-text text-danger'>
              {emailValidationError}
            </small>
          )}
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            name='password'
            onChange={inputHandler}
            onFocus={focusHandler}
          />
          {passwordTouched && (
            <small className='form-text text-danger'>
              {passwordValidationError}
            </small>
          )}
        </div>
        <div className='form-group form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            id='exampleCheck1'
            name='checkMeOut'
            onChange={inputHandler}
          />
          <label className='form-check-label'>Check me out</label>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
