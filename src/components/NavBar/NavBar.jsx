import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App'; // import the AuthedUserContext
import { useContext } from 'react';

import styles from './NavBar.module.css';
import Logo from '../../assets/images/logo.svg';

const NavBar = ({ handleLogout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <nav className={styles.container}>
      <Link to='/'><img src={Logo} alt="A cute owl" /></Link>
      {user ?
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/hoots'>HOOTS</Link></li>
          <li><Link to="/hoots/new">NEW HOOT</Link></li>
          <li><Link to='' onClick={handleLogout}>LOG OUT</Link></li>
        </ul>
        :
        <ul>
          <li><Link to='/signin'>SIGN IN</Link></li>
          <li><Link to='/signup'>SIGN UP</Link></li>
        </ul>
      }
    </nav>
  );
};

export default NavBar;