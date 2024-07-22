import React,{useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import M from "materialize-css"
import { UserContext } from "../../App"
import { loginFormConfig,authConfig } from '../config';

 
const Login = () => {
 
  const navigate=useNavigate();
  const { state, dispatch } = useContext(UserContext)
 
  const [formData, setFormData]=useState({
    username: '',
    password: ''
  })
 
  const handleChange = (field, value)=>{
    setFormData({
      ...formData,
      [field]: value
    })
  }
 
  const handleSubmit = async (event) => {
    event.preventDefault()
 
    try {
      const data = await authConfig.handleSubmit( formData, 'login' )
     
      if(data.message){
        M.toast({ html: data.message, classes: 'rounded #757575 grey darken-1' })
      }
      else if(data.error){
        M.toast({ html: data.error, classes: '#f06292 pink lighten-2' })
      }
      else if (data.user) {
        // Ensure the user object and name property exist
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        M.toast({ html: "Logged in", classes: "rounded #757575 grey darken-1" });
        dispatch( {type: "USER", payload: data.user} )
        navigate('/home');
    }
     
    } catch (error) {
      M.toast({ html: 'Error logging up', classes: '#f06292 pink lighten-2' });
      console.error('Login error:', error);
    }
  }
 
 
 
  return (
    <div className="row gradient" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <div className="col s12">
        <h4 className='playfair-regular' style={{ textAlign: 'center' }}>Log in</h4>
        <form className="col s12" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="row" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {loginFormConfig.map((field, index) => (
              <div className={field.classname} key={index} style={{ width: '100%' }}>
                <div className="input-field col s12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <input
                    id={field.field}
                    type={field.type}
                    className='validate'
                    value={formData[field.field]}
                    onChange={(e) => handleChange(field.field, e.target.value)}
                    placeholder={field.placeholder}
                    readOnly={field.readonly}
                  />
                  <label htmlFor={field.field}>{field.label}</label>
                </div>
              </div>
            ))}
            <div className="input-field col s12 center-align" style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn waves-effect waves-light grey darken-1" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;