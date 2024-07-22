const signupFormConfig = [
  { type: 'text', label: 'First Name', field: 'firstname', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'text', label: 'Last Name', field: 'lastname', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'text', label: 'Supervisor', field: 'supervisor', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'text', label: 'Department', field: 'department', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'text', label: 'Username', field: 'username', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'password', label: 'Password', field: 'password', options: {}, readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '', },
  { type: 'select', label: 'Role', field: 'role', options: [{ value: 'admin', label: 'Admin' }, { value: 'employee', label: 'Employee' }], readonly: false, classname: 'input-field col s6', validator: null, optionsExcluded: [], optionsValidator: null, placeholder: '' }
];

const loginFormConfig = [
  { type: 'text', label: 'Username', field: 'username', options: {}, readonly: false, classname: "input-field col s8", validator: null, optionsExcluded: [], optionsValidator: null, placeholder:'', },
  { type: 'password', label: 'Password', field: 'password', options: {}, readonly: false, classname: "input-field col s8", validator: null, optionsExcluded: [], optionsValidator: null, placeholder:'', },
];

const authConfig = {
  handleSubmit: async (formData, path) => {
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

export {
  authConfig,
  loginFormConfig,
  signupFormConfig
};
