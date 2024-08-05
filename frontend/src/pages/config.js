const signupFormConfig = [
  { type: 'text', label: 'First Name', field: 'firstname', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'text', label: 'Last Name', field: 'lastname', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'text', label: 'Supervisor', field: 'supervisor', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'text', label: 'Department', field: 'department', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'text', label: 'Username', field: 'username', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'password', label: 'Password', field: 'password', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'select', label: 'Role', field: 'role', options: [{ value: 'admin', label: 'Admin' }, { value: 'employee', label: 'Employee' }, { value: 'internee', label: 'Internee'}, { value: 'IT Support', label: 'IT Support' } ], readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '' }
];

const RolesEditConfig = [
  { type: 'checkbox', label: 'Home', field: 'home', options: {}, readonly: false, classname: 'input-field col s4', validator: null, optionsExcluded: [] },
  { type: 'checkbox', label: 'Invoice', field: 'invoice', options: {}, readonly: false, classname: 'input-field col s4', validator: null, optionsExcluded: [] },
  { type: 'checkbox', label: 'Roles', field: 'roles', options: {}, readonly: false, classname: 'input-field col s4', validator: null, optionsExcluded: [] }
];
 
const loginFormConfig = [
  { type: 'text', label: 'Username', field: 'username', options: {}, readonly: false, classname: "input-field col s8", validator: null, optionsExcluded: [], optionsValidator: null, placeholder:'', },
  { type: 'password', label: 'Password', field: 'password', options: {}, readonly: false, classname: "input-field col s8", validator: null, optionsExcluded: [], optionsValidator: null, placeholder:'', },
];
 
 
const authConfig = {
  handleSubmit: async (formData, path) => {
    console.log(formData)
      try {
          const response = await fetch(`/${path}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });
 
          if (response.status !== 200) {
              throw new Error('Authentication Failed!');
          }
 
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Authentication error:', error);
          throw error;
      }
  }
};
 
const rolesConfig = {
  handleSubmit: async (formData, path) => {
    try {
      let method = formData.action === 'add' ? 'PUT' : 'DELETE';
 
      const response = await fetch(`/${path}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify(formData),
      });
 
      const data = await response.json();
      return data;
 
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
 
const fetchRolesConfig = {
  handleSubmit: async (formData, path) => {
    console.log(path)
    try {
      const response = await fetch(`/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify(formData),
      });
 
      const data = await response.json();
      return data;
 
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
 
const fetchRoleName = {
  handleSubmit: async (id) => {  
    try {
      const response = await fetch(`/roles/${id}`, {  
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem("jwt")
        },
      });
 
      const data = await response.json();
      console.log(data)
      return data;
 
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
 
 
export {
  authConfig,
  loginFormConfig,
  signupFormConfig,
  rolesConfig,
  fetchRolesConfig,
  fetchRoleName,
  RolesEditConfig
};