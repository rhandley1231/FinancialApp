import React, { useState } from 'react';

const Signup = ({ setIsSignup }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');

  const checkPasswordStrength = (password) => {
    let strength = '';
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 10 || !(hasUpperCase && hasLowerCase && hasNumbers && hasSpecial)) {
      strength = 'Weak';
    } else if (password.length < 12) {
      strength = 'Medium';
    } else {
      strength = 'Strong';
    }
    setPasswordStrength(strength);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setPasswordMatch('Passwords match');
    } else {
      setPasswordMatch('Passwords do not match');
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      alert('Email is already in use. Please use a different email.');
    } else {
      alert('Signup successful!'); // Replace this with actual signup logic
    }
  };

  const checkEmailExists = async (email) => {
    // Simulating an API call to check if the email is already in use.
    const usedEmails = ['test@example.com', 'user@example.com']; // Example emails
    return usedEmails.includes(email);
  };

  return (
    <form id="signupForm" className="form" onSubmit={handleSignupSubmit}>
      <h2>Signup</h2>
      <input type="text" placeholder="First Name" required />
      <input type="text" placeholder="Last Name" required />
      <input type="tel" placeholder="Phone Number" required pattern="[0-9]{10}" />
      <input type="date" placeholder="Date of Birth" required />
      <input type="text" placeholder="Street Address" required />
      <input type="text" placeholder="City" required />
      <input type="text" placeholder="State/Province" required />
      <input type="text" placeholder="Zip Code" required pattern="[0-9]{5}" />
      <select required>
        <option value="" disabled selected>Select Region/Country</option>
        <option value="USA">USA</option>
        <option value="Canada">Canada</option>
        <option value="UK">UK</option>
        <option value="Australia">Australia</option>
        <option value="China">China</option>
        <option value="Korea">Korea</option>
      </select>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={(e) => checkEmailExists(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => {
          setPassword(e.target.value);
          checkPasswordStrength(e.target.value);
        }}
      />
      <div className="password-requirements">
        <p>Password must include:</p>
        <ul>
          <li>Minimum 10 characters</li>
          <li>At least 1 uppercase letter</li>
          <li>At least 1 lowercase letter</li>
          <li>At least 1 number</li>
          <li>At least 1 special character</li>
        </ul>
      </div>
      <input
        type="password"
        placeholder="Confirm Password"
        required
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          checkPasswordMatch(password, e.target.value);
        }}
      />
      <div className={`strength-indicator ${passwordStrength.toLowerCase()} hidden`}>
        {passwordStrength && `Password Strength: ${passwordStrength}`}
      </div>
      <div className={`match-indicator ${passwordMatch.includes('match') ? 'password-match' : 'password-mismatch'} hidden`}>
        {passwordMatch}
      </div>
      <button type="submit">Signup</button>
      <p>Already have an account? <a href="#" onClick={() => setIsSignup(false)}>Login</a></p>
    </form>
  );
};

export default Signup;
