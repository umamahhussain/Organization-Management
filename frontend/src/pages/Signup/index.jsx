import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { signupFormConfig, authConfig } from '../config';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    supervisor: '',
    department: '',
    role: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize MaterializeCSS for select elements
    M.AutoInit();
  }, []);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await authConfig.handleSubmit(formData, 'signup');
      if (data.message) {
        M.toast({ html: data.message, classes: 'rounded #757575 grey darken-1' });
        navigate('/login');
      } else if (data.error) {
        M.toast({ html: data.error, classes: '#f06292 pink lighten-2' });
      }
    } catch (error) {
      M.toast({ html: 'Error signing up', classes: '#f06292 pink lighten-2' });
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="row gradient" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="col s12">
        <h4 className='playfair-regular' style={{textAlign:'center'}}>Sign up</h4>
            <form className="col s12 " onSubmit={handleSubmit}>
              <div className="row">
                {signupFormConfig.map((field, index) => (
                  <div className={field.classname} key={index}>
                    {field.type === 'select' ? (
                      <div className="input-field col s12">
                        <select
                          id={field.field}
                          value={formData[field.field]}
                          onChange={(e) => handleChange(field.field, e.target.value)}>
                          <option value="" disabled selected>{field.placeholder}</option>
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <label>{field.label}</label>
                      </div>
                    ) : (
                      <div className="input-field">
                        <input
                          id={field.field}
                          type={field.type}
                          className="validate"
                          value={formData[field.field]}
                          onChange={(e) => handleChange(field.field, e.target.value)}
                          placeholder={field.placeholder}
                          readOnly={field.readonly}
                        />
                        <label htmlFor={field.field}>{field.label}</label>
                      </div>
                    )}
                  </div>
                ))}
                <div className="input-field col s12 center-align">
                  <button className="btn waves-effect waves-light grey darken-1" type="submit" name="action">
                    Submit
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
      </div>
    </div>
  );
};

export default Signup;
