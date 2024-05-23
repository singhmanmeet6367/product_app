
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import styles from './Register.module.css';
import * as AuthActionCreators from "../store/auth/auth.action";
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { TUser } from '../store/auth/types';
interface LoginProps {
  setReg: Dispatch<SetStateAction<boolean>>;
}

function Login({ setReg }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector<IRootState>((state) => state.auth.user) as TUser
  console.log("user", user)

  useEffect(() => {
    if (user && user?.id) {
      navigate("/")
    }
  }, [user])
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    // Email validation using regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    dispatch(AuthActionCreators.loginUser(email, password))
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerTitle}>Login</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={styles.registerInput}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={styles.registerInput}
      />
      <button onClick={handleLogin} className={styles.registerButton}>
        Login
      </button>
      <div className={styles.or}>or</div>
      <button onClick={() => setReg(true)} className={styles.registerButton}>
        Register
      </button>  {/* {message && <p className={styles.register-message}>{message}</p>} */}
    </div>
  );
}

export default Login;
