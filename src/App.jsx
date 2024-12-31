import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import necessary components
import Sidebar from './Components/Sidebar.jsx';

import Records from './Components/Records.jsx';
import Analytics from './Components/Analytics.jsx';
import History from './Components/History.jsx';

import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('dataRegisterUsers');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Main content that changes based on routes */}
        <Sidebar className='w-max '/>
        <div className="w-full">
        <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/records" element={<Records />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/history" element={<History />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={ <Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
          </Routes>


        </div>
      </div>
    </Router>
  );
}
