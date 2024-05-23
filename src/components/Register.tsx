import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './Register.module.css';
import * as AuthActionCreators from "../store/auth/auth.action";
import { useDispatch } from 'react-redux';
interface IRegisterProps {
  setReg: Dispatch<SetStateAction<boolean>>
}
function Register({ setReg }: IRegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError('Email and password and name are required.');
      return;
    }

    // Email validation using regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    dispatch(AuthActionCreators.registerUser(name, email, password))

  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerTitle}>Register</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <input
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className={styles.registerInput}
      />
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
      <button onClick={handleRegister} className={styles.registerButton}>
        Register
      </button>
      <div className={styles.or}>or</div>
      <button onClick={() => setReg(false)} className={styles.registerButton}>
        Login
      </button>
    </div>
  );
}

export default Register;
