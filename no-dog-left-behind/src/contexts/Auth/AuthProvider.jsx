import { AuthContext } from './AuthContext';
import { useNotification } from '../../hooks/useNotification';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const login = async (name, email) => {
    try {
      if (!name || !email) {
        throw new Error('Please enter both your name and e-mail address.');
      }

      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        const errorMessage = message || 'Login failed.';
        setError(errorMessage);
        addNotification('Login Failed', errorMessage, '', 'danger');
        return { success: false, error: errorMessage };
      }

      setSuccess(true);
      setUserInfo({ name, email });
      addNotification('Login Successful', 'You have successfully logged in.', '', 'success');
      return { success: true };
    } catch (err) {
      console.error('Login Error:', err.message);
      const fallbackError = err.message || 'Something went wrong during login.';
      setError(fallbackError);
      setSuccess(false);
      addNotification('Login Error', fallbackError, '', 'danger');
      return { success: false, error: fallbackError };
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        addNotification('Logout Failed', 'We were unable to log you out.', '', 'danger');
        return { success: false };
      }

      setUserInfo({ name: '', email: '' });
      setSuccess(false);
      addNotification('Logout Successful', 'You have been logged out.', '', 'success');
      return { success: true };
    } catch (err) {
      console.error('Logout Error:', err.message);
      addNotification('Logout Error', err.message, '', 'danger');
      return { success: false };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(userInfo.name, userInfo.email);

    if (result.success) {
      navigate('/dashboard');
    }
    // No need to duplicate notifications here — login handles that
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        error,
        success,
        login,
        logout,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
