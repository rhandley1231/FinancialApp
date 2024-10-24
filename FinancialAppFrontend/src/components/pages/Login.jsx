import React from 'react';

const Login = ({ setIsSignup }) => {
  return (
    <form id="loginForm" className="form" onSubmit={(e) => e.preventDefault()}>
      <h2>Login</h2>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p>Don't have an account? <a href="#" onClick={() => setIsSignup(true)}>Signup</a></p>
    </form>
  );
};

export default Login;
