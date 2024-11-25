import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setIsSignup }) => {

  const navigate = useNavigate(); // React Router navigation hook
  
  // Controlled form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    streetAddress: "",
    city: "",
    stateProvince: "",
    zipCode: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Other state variables
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/assets/countries.json"); // Adjust path if necessary
        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        } else {
          console.error("Failed to fetch countries");
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Trigger password strength or match checks dynamically
    if (name === "password") {
      checkPasswordStrength(value);
      checkPasswordMatch(value, formData.confirmPassword);
    } else if (name === "confirmPassword") {
      checkPasswordMatch(formData.password, value);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!_@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 10;

    // All conditions must be met for a strong password
    if (
      isLongEnough &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecial
    ) {
      setPasswordStrength("Strong");
    } else if (
      isLongEnough &&
      [hasUpperCase, hasLowerCase, hasNumbers, hasSpecial].filter(Boolean)
        .length >= 3
    ) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  // Check password match
  const checkPasswordMatch = (password, confirmPassword) => {
    setPasswordMatch(
      password === confirmPassword
        ? "Passwords match"
        : "Passwords do not match"
    );
  };

  // Handle form submission
  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/Users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Signup successful! Redirecting to login...');
        navigate('/'); // Redirect to login page
      } else if (response.status === 409) {
        const errorText = await response.text();
        setErrors({ email: errorText });
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form id="signupForm" className="form" onSubmit={handleSignupSubmit}>
      <h2>Signup</h2>
      <input
        name="firstName"
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
        className={errors.firstName ? "error" : ""}
      />
      {errors.firstName && <p className="error-message">{errors.firstName}</p>}

      <input
        name="lastName"
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
        className={errors.lastName ? "error" : ""}
      />
      {errors.lastName && <p className="error-message">{errors.lastName}</p>}

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className={errors.email ? "error" : ""}
      />
      {errors.email && <p className="error-message">{errors.email}</p>}

      <input
        name="phoneNumber"
        type="tel"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        pattern="[0-9]{10}"
        className={errors.phoneNumber ? "error" : ""}
      />
      {errors.phoneNumber && (
        <p className="error-message">{errors.phoneNumber}</p>
      )}

      <input
        name="dateOfBirth"
        type="date"
        placeholder="Date of Birth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required
        className={errors.dateOfBirth ? "error" : ""}
      />
      {errors.dateOfBirth && (
        <p className="error-message">{errors.dateOfBirth}</p>
      )}

      <input
        name="streetAddress"
        type="text"
        placeholder="Street Address"
        value={formData.streetAddress}
        onChange={handleChange}
        required
        className={errors.streetAddress ? "error" : ""}
      />
      {errors.streetAddress && (
        <p className="error-message">{errors.streetAddress}</p>
      )}

      <input
        name="city"
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
        className={errors.city ? "error" : ""}
      />
      {errors.city && <p className="error-message">{errors.city}</p>}

      <input
        name="stateProvince"
        type="text"
        placeholder="State/Province"
        value={formData.stateProvince}
        onChange={handleChange}
        required
        className={errors.stateProvince ? "error" : ""}
      />
      {errors.stateProvince && (
        <p className="error-message">{errors.stateProvince}</p>
      )}

      <input
        name="zipCode"
        type="text"
        placeholder="Zip Code"
        value={formData.zipCode}
        onChange={handleChange}
        required
        pattern="[0-9]{5}"
        className={errors.zipCode ? "error" : ""}
      />
      {errors.zipCode && <p className="error-message">{errors.zipCode}</p>}

      <select
        name="country"
        value={formData.country}
        onChange={handleChange}
        required
        className={errors.country ? "error" : ""}
      >
        <option value="" disabled>
          Select Region/Country
        </option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      {errors.country && <p className="error-message">{errors.country}</p>}

      <div className="password-field">
        <input
          name="password"
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className={errors.password ? "error" : ""}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {passwordVisible ? "Hide" : "Show"} Password
        </button>
      </div>

      <div className="password-field">
        <input
          name="confirmPassword"
          type={confirmPasswordVisible ? "text" : "password"}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={toggleConfirmPasswordVisibility}>
          {confirmPasswordVisible ? "Hide" : "Show"} Confirm Password
        </button>
      </div>

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

      <div className={`strength-indicator ${passwordStrength.toLowerCase()}`}>
        {passwordStrength && `Password Strength: ${passwordStrength}`}
      </div>
      <div
        className={`match-indicator ${
          passwordMatch.includes("match")
            ? "password-match"
            : "password-mismatch"
        }`}
      >
        {passwordMatch}
      </div>
      <button type="submit">Signup</button>
      <p>
        Already have an account?{" "}
        <a href="#" onClick={() => setIsSignup(false)}>
          Login
        </a>
      </p>
    </form>
  );
};

export default SignUp;
