import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:8080/signup', { username, password }, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                setMessage('Signup successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');  // Redirect to login after signup
                }, 2000);
            }
        } catch (error) {
            setMessage('Signup failed');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleSignup}>Signup</button>
            
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignUp;
