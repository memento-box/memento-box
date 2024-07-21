import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './RegisterForm.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        birthday: birthday,
      },
    });
  }; // end registerUser

  return (
    <div className="form-container">
      <form className="formPanel" onSubmit={registerUser}>
        <h2 className="form-title">Join Memento Today!</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div className="form-group">
          <label htmlFor="username">
            Email:
            <input
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="first_name">
            First Name:
            <input
              type="text"
              name="first_name"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="last_name">
            Last Name:
            <input
              type="text"
              name="last_name"
              value={lastName}
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="birthday">
            Birthday:
            <input
              type="date"
              name="birthday"
              value={birthday}
              required
              onChange={(event) => setBirthday(event.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <input className="btn submit-btn" type="submit" name="submit" value="Register" />
        </div>
        <div className="form-footer">
          Already Have a Memento Account?
          <button
            type="button"
            className="btn link-btn"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
