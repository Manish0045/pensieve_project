// import { useState } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './pages/Product';

function App() {
  // const [isloggedin, setIsloggedin] = useState(false);
  // console.log(isloggedin);
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
