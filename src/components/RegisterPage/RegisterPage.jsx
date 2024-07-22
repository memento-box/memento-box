import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useHistory } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const history = useHistory();

  // Handle redirect on successful registration
  const handleRegisterSuccess = () => {
    history.push('/home'); // Redirect to the landing page after registration
  };

  return (
    <div className="page-container">
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
}

export default RegisterPage;
