const Role= require('./models/roles')
 
 
const bodyValidator = {
    'signup': ['firstname', 'lastname', 'password', 'username', 'supervisor', 'department', 'role'],
    'login': ['password', 'username'],
}
// Define the roles to be created
const rolesToCreate = [
  { role: 'employee', allowedPages: [] },
  { role: 'admin', allowedPages: ['926aa7ca-1a54-4b82-9fac-02108cff6374', 'f2be7dea-4f07-4cb5-9ecb-b3ca070128a9', '85001a21-3ff2-4c70-910e-6f85962c9012', 'a3245811-a95e-493b-8597-79b07b7ca565'] },
  { role: 'internee', allowedPages: [] },
  { role: 'IT Support', allowedPages: [] },
];

 
async function createRoles() {
    try {
      // Check if roles already exist in the database
      for (const roleData of rolesToCreate) {
        const existingRole = await Role.findOne({ role: roleData.role });
 
        // If role does not exist, create it
        if (!existingRole) {
          const newRole = new Role(roleData);
          await newRole.save();
          console.log(`Role '${roleData.role}' created successfully.`);
        } else {
          console.log(`Role '${roleData.role}' already exists, skipping creation.`);
        }
      }
    } catch (error) {
      console.error('Error creating roles:', error);
    }
  }
 
module.exports = {
    bodyValidator,
    createRoles
}
 