import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../App';
import M from "materialize-css"
 
const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
 
  useEffect(() => {
    M.AutoInit(); //
  })
 
 
  const navigations = [
    {
      path: '/home',
      label: 'Home',
      type: 'link'
    },
    {
      path: '/invoice',
      label: 'Invoice',
      type: 'link'
    },
    {
      path: '/roles',
      label: 'Roles',
      type: 'link'
    },
    {
      path: '/logout',
      label: 'Log Out',
      type: 'button',
      fn: () => {
        localStorage.clear();
        dispatch({ type: 'CLEAR' });
        navigate('/login');
      }
    }
  ];
 
  const RenderNavbar = () => {
    if (state) {
      return navigations.map( ( navItem, index ) => {
        if ( navItem.type === 'link' ) {
          return (
            <li key = {index}>
              <Link to= { navItem.path } > { navItem.label } </Link>
            </li>
          );
        } else if ( navItem.type === 'button' ) {
          return (
            <li key = { index } >
              <a
                className="btn-floating btn-small btn tooltipped pulse #616161 grey darken-2"
                type="submit"
                name="action"
                data-position="bottom" data-tooltip="Log Out"
                onClick={navItem.fn}
              >
                <i className="material-icons">exit_to_app</i>
              </a>
            </li>
          );
        }
        return null; // Return null if the type does not match
      });
    } else {
      return (
        <>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
        </>
      );
    }
  };
 
  return (
    <div>
      <nav style={{ backgroundColor: 'gray' }}>
        <div className="nav-wrapper" style={{ backgroundColor: 'gray', marginLeft: '6px' }}>
          <a className="brand-logo audiowide-regular"><Link to="/home">Systems</Link></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {RenderNavbar()}
          </ul>
        </div>
      </nav>
    </div>
  );
};
 
export default Navbar;