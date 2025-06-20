import React from 'react';
import Layout from "./layout/Layout";
import LoginPage from './pages/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={
           <Layout>
            <HomePage />
           </Layout>
          
          } />
          <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
