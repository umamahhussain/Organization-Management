import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';
 
const Home = () => {
 
  const navigate = useNavigate();
 
  useEffect(() => {
    M.AutoInit(); // Initialize MaterializeCSS
 
    // Fetch user role from the server or local storage
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/home', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("jwt")
          },
        });
 
        // Parse response body as JSON
        const data = await response.json();
 
        // Check for HTTP status
        if (!response.ok) {
          // If status is not OK (200-299), show an error toast and navigate to unauthorized
          M.toast({ html: data.error || 'An error occurred', classes: '#e91e63 pink' });
          navigate('/unauthorized');
        } else {
          // If status is OK, process the successful response (if needed)
          if (data.message) {
            M.toast({ html: data.message, classes: 'rounded #757575 grey darken-1' });
          }
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        navigate('/login');
      }
    };
 
    fetchUserRole();
  }, [navigate]);
 
  return (
    <div className="row gradient" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="col s12">
        <h2 className='playfair-regular' style={{ textAlign: 'center' }}>home</h2>
      </div>
      <div className="parallax-container">
        <div className="parallax"><img src='/images/home.png' alt="Home" style={{ width: '100px'}}/></div>
      </div>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas unde nulla corrupti. Maxime nemo ducimus commodi animi consectetur. Doloribus illum corporis, reiciendis temporibus sit molestias. Cupiditate laudantium libero magnam doloribus?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas unde nulla corrupti. Maxime nemo ducimus commodi animi consectetur. Doloribus illum corporis, reiciendis temporibus sit molestias. Cupiditate laudantium libero magnam doloribus?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas unde nulla corrupti. Maxime nemo ducimus commodi animi consectetur. Doloribus illum corporis, reiciendis temporibus sit molestias. Cupiditate laudantium libero magnam doloribus?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas unde nulla corrupti. Maxime nemo ducimus commodi animi consectetur. Doloribus illum corporis, reiciendis temporibus sit molestias. Cupiditate laudantium libero magnam doloribus?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas unde nulla corrupti. Maxime nemo ducimus commodi animi consectetur. Doloribus illum corporis, reiciendis temporibus sit molestias. Cupiditate laudantium libero magnam doloribus?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas unde nulla corrupti. Maxime nemo ducimus commodi animi consectetur. Doloribus illum corporis, reiciendis temporibus sit molestias. Cupiditate laudantium libero magnam doloribus?
      </p>
      
    </div>
  );
};
 
export default Home;























