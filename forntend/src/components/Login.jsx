// frontend/src/components/Login.js
import  { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const data = response.data;

      if (data.success) {
        const token = data.token;
        localStorage.setItem('token', token);

        const userResponse = await axios.get('http://localhost:5000/api/user-data', {
          headers: {
            'x-auth-token': token,
          },
        });

        const userData = userResponse.data;

        if (userData.success) {
          setUserData(userData.userData);
          console.log('Login successful');
        } else {
          console.log('Failed to fetch user data');
        }
      } else {
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {userData && (
        <div>
          <h3>Welcome, {userData.email}!</h3>
          {/* Display other user data as needed */}
        </div>
      )}
    </div>
  );
}

export default Login;
