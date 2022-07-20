import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Landing from './Pages/Landing.js';
import TheAppBar from './Component/Navbar.js';
import Home from './Pages/Home.js';


function App() {
  return (
    <BrowserRouter>
       <Routes>
       
          <Route exact path="/" element={ <Landing/> } />
         
          <Route path= "/bae" element = {<TheAppBar />} >
            
            <Route index element= {<Home />} />
          
          </Route>
        
          

       </Routes>
    </BrowserRouter>
  );
}

export default App;
