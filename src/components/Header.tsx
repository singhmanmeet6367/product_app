import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TUser } from '../store/auth/types';
import { IRootState } from '../store/store';
import styles from './Header.module.css'; // Import styles
import * as AuthActionCreator from "../store/auth/auth.action"
interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const dispatch = useDispatch();
  const user = useSelector<IRootState>((state) => state.auth.user) as TUser
  const handleLogout = () => {
    dispatch(AuthActionCreator.logoutUser())
  }
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Product app
      </Link> <nav>
        <Link to="/products/1/10" className={styles.navLink}>
          Products
        </Link>
        <Link to="/cart" className={styles.navLink}>
          Cart
          {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </Link>
        {user && user.id ?
          <a onClick={handleLogout} className={styles.navLink}>
            Logout
          </a> :

          <Link to="/auth" className={styles.navLink}>
            Login
          </Link>}
      </nav>

    </header>
  );
};

export default Header;
