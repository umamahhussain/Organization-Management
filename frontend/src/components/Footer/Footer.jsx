import React from 'react';
 
const Footer = () => (
  <footer className="page-footer" style={{ backgroundColor: 'gray', marginTop: 'auto' }}>
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">Systems Limited</h5>
          <p className="grey-text text-lighten-4">Multi-national public technology company, involved in mortgage, apparel, retail and BPO services</p>
        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text">Links</h5>
          <ul>
            <li><a className="grey-text text-lighten-3" href="/login">Login</a></li>
            <li><a className="grey-text text-lighten-3" href="/signup">Signup</a></li>
            <li><a className="grey-text text-lighten-3" href="/home">Home</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
        © 2024 Copyright Text
      </div>
    </div>
  </footer>
);
 
export default Footer;