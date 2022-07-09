import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './Pages/Landing.js';
import ResponsiveAppBar from './Component/Navbar.js';

function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route exact path='/' element={ <Landing/> } />
          <Route path= '/' element={<ResponsiveAppBar />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
