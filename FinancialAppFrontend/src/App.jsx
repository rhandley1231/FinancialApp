import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Route - Login Page */}
          <Route path="/" element={<Login />} />

          {/* Route for SignUp */}
          <Route path="/signup" element={<SignUp />} />

          {/* Route for Home */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
