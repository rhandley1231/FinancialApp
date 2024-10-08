import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginData = {
                username: username,
                password: password
            };

            // Making the request to the backend with credentials (e.g. cookies)
            const response = await axios.post('http://localhost:8080/login', loginData, {
                withCredentials: true
            });

            // If the login is successful, navigate to the home page
            if (response.status === 200) {
                console.log(response.data);
                navigate('/home');
            }
        } catch (error) {
            // Handle error based on the type
            if (error.response && error.response.status === 401) {
                setError("Invalid username or password");
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signup'); // Redirects to the SignUp page
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <button onClick={handleSignUpRedirect}>Sign Up</button> {/* Button for sign up page */}
        </div>
    );
};

export default Login;
