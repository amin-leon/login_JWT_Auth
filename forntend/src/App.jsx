// frontend/src/App.jsx
import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Login setUserData={setUserData} />}
          />
          <Route
            path="/home"
            element={<Home userData={userData} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
