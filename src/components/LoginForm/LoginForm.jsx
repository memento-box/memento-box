import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      }).then(() => {
        if (onLoginSuccess) {
          onLoginSuccess(); // Trigger success handler
        }
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div className="form-container">
      <form className="formPanel" onSubmit={login}>
        <h2 className="form-title">Welcome Back to Memento!</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div className="form-group">
          <label htmlFor="username">
            Email:
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <input className="btn submit-btn" type="submit" name="submit" value="Log In" />
        </div>
        <div className="form-footer">
          Don't Have a Memento Account?
          <button
            type="button"
            className="btn link-btn"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
