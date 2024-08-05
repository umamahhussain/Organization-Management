import React,{useContext, useState} from 'react';
import M from "materialize-css"
 
 
const Unauthorized = () => {
 
  return (
    <div className="row gradient" >
      <div className="col s12">
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>
            <h1 className='playfair-regular' >Unauthorized Access: 401</h1>
            <i className="material-icons" style={{ fontSize: '60px', padding: '10px' }}>lock</i>
        </div>
      </div>
    </div>
  );
};
 
export default Unauthorized;