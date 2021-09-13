import BootstrapNavbar from 'react-bootstrap/Navbar';
import React from 'react';
import logo from '../../assets/logo.png';
import { Nav } from 'react-bootstrap';
import './NavBar.scss';
import { Link, useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { signOut } from '../../redux/action-creators/auth';

const Navbar = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const router = useHistory();
  const isSignedIn = !!auth.uid;

  const NavbarItem = ({ name, path }) => (
    <li>
      <Nav.Link
        onClick={() => {
          router.push(path);
        }}
        className={`nav-bar-items ${
          path === router.location.pathname ? 'active' : ''
        }`}
        style={{ cursor: 'pointer' }}
      >
        {name}
      </Nav.Link>
    </li>
  );

  return (
    <BootstrapNavbar
      bg={'light'}
      className={'navContainer'}
      expand={'lg'}
      collapseOnSelect={true}
    >
      <BootstrapNavbar.Brand
        style={{ display: 'flex', alignContent: 'center' }}
      >
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <img alt={'examsecure'} src={logo} width={40} />
        </Link>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <span className={'logo'}>ExamSecure</span>
        </Link>
      </BootstrapNavbar.Brand>

      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse
        id="basic-navbar-nav"
        className={'justify-content-end'}
      >
        <Nav>
          {isSignedIn ? (
            <>
              <NavbarItem name={'Your Tests'} path={'/'} />
              <NavbarItem name={'Create New Test'} path={'/create-new-test'} />
              <NavbarItem name={'Proctor Mode'} path={'/proctor-mode'} />

              <li>
                <Nav.Link
                  onClick={props.signOut}
                  className="nav-bar-items"
                  style={{ cursor: 'pointer' }}
                >
                  Sign Out
                </Nav.Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Nav.Link
                  onClick={router.push('/sign-in')}
                  className="nav-bar-items"
                  style={{ cursor: 'pointer' }}
                >
                  Sign In
                </Nav.Link>
              </li>
            </>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
