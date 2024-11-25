import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    try {
      const response = await fetch('http://localhost:8080/Users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login successful!');
        // Optionally store a token or user data
        // localStorage.setItem('token', data.token); // Example of storing a token
        navigate('/home'); // Redirect to the home page
      } else if (response.status === 401) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <form id="loginForm" className="form" onSubmit={handleLogin}>
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account?{' '}
        <a href="#" onClick={() => navigate('/signup')}>
          Signup
        </a>
      </p>
    </form>
  );
};

export default Login;
