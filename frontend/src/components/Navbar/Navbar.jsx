import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../App';
 
const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext( UserContext )

  const RenderNavbar = () =>{
    if( state ){
      return[
        <li> <Link Link to = "/home" > Home </Link> </li>,
        <li> <Link Link to = "/invoice" > Invoice </Link> </li>,
        <li> <Link Link to = "/role" > Roles </Link> </li>,
        <li>
        <a className="btn-floating btn-large pulse #616161 grey darken-2" type="submit" name="action" onClick={() => {
          localStorage.clear();
          dispatch( {type: "CLEAR"} )
          navigate('/login');
        }}>
        <i class="material-icons">exit_to_app</i>
        </a>
      </li>
      ]}
      else {
        return[
          <li> <Link to = "/signup" > Signup </Link> </li>,
          <li> <Link to = "/login" > Login </Link> </li>
        ]
      }
  }
 
  return (
    <div >
      <nav style={{ backgroundColor: 'gray'}}>
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
 