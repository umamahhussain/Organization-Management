import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import M from 'materialize-css';
import { fetchRoleName, RolesEditConfig, rolesConfig } from '../config';
import { uuids } from '../uuid';

const RolesProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the ID from URL parameters
  const [roleDetails, setRoleDetails] = useState(null); // State to store role details

  useEffect(() => {
    M.AutoInit(); // Initialize all Materialize components

    // Define the async function inside useEffect
    const fetchRoleDetails = async () => {
      try {
        const response = await fetchRoleName.handleSubmit(id); // Fetch role details
        if (response.role) { // Handle the correct response structure
          setRoleDetails(response); // Update the state with role details
        } else if (response.message) {
          M.toast({ html: response.message, classes: 'rounded #757575 grey darken-1' });
        } else if (response.error) {
          M.toast({ html: response.error, classes: '#e91e63 pink' });
        }
      } catch (error) {
        M.toast({ html: 'Error fetching role details', classes: '#e91e63 pink' });
      }
    };

    fetchRoleDetails(); // Call the async function

  }, [id]); // Dependency array includes 'id' to refetch if it changes

  const handleCheckboxChange = async (field, isChecked) => {
    const uuid = uuids[field]; // Get the corresponding UUID for the field
    const method = isChecked ? 'PUT' : 'DELETE';
    const formData = {
      action: method === 'PUT' ? 'add' : 'remove',
      field: uuid, // Send the UUID to the backend
    };

    try {
      const response = await rolesConfig.handleSubmit(formData, `roles/${id}`);
      if (response.success) {
        M.toast({ html: response.message, classes: 'rounded #4caf50 green' });
        setRoleDetails((prevDetails) => {
          if (isChecked) {
            return {
              ...prevDetails,
              allowedPages: [...prevDetails.allowedPages, uuid],
            };
          } else {
            return {
              ...prevDetails,
              allowedPages: prevDetails.allowedPages.filter((page) => page !== uuid),
            };
          }
        });
      } else {
        M.toast({ html: response.message, classes: 'rounded #e91e63 pink' });
      }
    } catch (error) {
      M.toast({ html: 'Error updating role permissions', classes: '#e91e63 pink' });
    }
  };

  return (
    <div className="row gradient" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="col s12" style={{ marginTop: '120px', height: '60vh' }}>
        <h4 className='playfair-regular' style={{ textAlign: 'center' }}>Role Profile</h4>
        <h6 className='playfair-regular' style={{ textAlign: 'left' }}>{roleDetails ? roleDetails.role : 'Loading...'}</h6>
        <p className='playfair-regular' style={{ textAlign: 'left' }}>{roleDetails ? roleDetails.allowedPages.join(', ') : 'Loading...'}</p>

        {RolesEditConfig.map((parameter, index) => (
          <div className='col s12' key={index}>
            <label>
              <input
                id={parameter.field}
                type={parameter.type}
                className={parameter.classname}
                defaultChecked={roleDetails?.allowedPages.includes(uuids[parameter.field])}
                onChange={(e) => handleCheckboxChange(parameter.field, e.target.checked)}
              />
              <span>{parameter.label}</span>
            </label>
          </div>
        ))}

      </div>
    </div>
  );
};

export default RolesProfile;
