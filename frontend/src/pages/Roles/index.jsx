import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { fetchRolesConfig } from '../config';
 
const Roles = () => {
  const [search, setSearch] = useState('');
  const [roleDetails, setRoleDetails] = useState([]);
  const searchModal = useRef(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    M.AutoInit(); // Initialize all Materialize components
    if (searchModal.current) {
      M.Modal.init(searchModal.current); // Initialize the modal
    }
 
    const fetchUserRole = async () => {
      try {
        const jwtRole = JSON.parse(localStorage.getItem("user"));
        const role = jwtRole?.role;
 
        if (!role) {
          console.log('Role not found, redirecting to login');
          navigate('/login');
          return;
        }
 
        if (role !== 'admin') {
          navigate('/unauthorized');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        navigate('/login');
      }
    };
 
    fetchUserRole();
  }, [navigate]);
 
  const fetchUsers = async (data) => {
    setSearch(data);
    try {
      const response = await fetchRolesConfig.handleSubmit({ query: data }, 'search');
      if (response.roles) { // Handle the correct response structure
        setRoleDetails(response.roles);
      } else if (response.message) {
        M.toast({ html: response.message, classes: 'rounded #757575 grey darken-1' });
      } else if (response.error) {
        M.toast({ html: response.error, classes: '#e91e63 pink' });
      }
    } catch (error) {
      M.toast({ html: 'Error fetching roles', classes: '#e91e63 pink' });
    }
  };
 
  return (
    <div className="row gradient" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="col s12" style={{ marginTop: '120px', height: '60vh' }}>
        <h4 className='playfair-regular' style={{ textAlign: 'center' }}>Admin Dashboard</h4>
 
        <button data-target="search" className="btn modal-trigger">Enter Role Name</button>
 
        <div id="search" className="modal" ref={searchModal}>
          <div className="modal-content">
            <h4>Enter Role Name</h4>
            <input type='text' placeholder='Role Name' onChange={(e) => fetchUsers(e.target.value)} />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
 
        <ul className='collection'>
          {roleDetails.map(item => (
            <li key={item._id} className='collection-item' style={{ color: 'gray' }}>
              <a href={`/roles/${item._id}`} onClick={() => {
                M.Modal.getInstance(searchModal.current).close();
                setSearch('');
              }}>
                {item.role}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
 
export default Roles;