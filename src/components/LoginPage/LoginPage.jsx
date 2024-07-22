import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import './LoginPage.css'; 

function LoginPage() {
  const history = useHistory();

  // Handle redirect on successful login
  const handleLoginSuccess = () => {
    history.push('/home'); // Redirect to the landing page after login
  };

  return (
    <div className="page-container">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default LoginPage;
