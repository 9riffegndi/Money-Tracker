import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components
import Sidebar from './Components/Sidebar.jsx';

import Records from './Components/Records.jsx';
import Analytics from './Components/Analytics.jsx';
import History from './Components/History.jsx';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Main content that changes based on routes */}
        <Sidebar className='w-max '/>
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Records />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
