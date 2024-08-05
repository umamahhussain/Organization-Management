const express = require('express');
const mongoose = require('mongoose');
const { createRoles } = require('./config'); // Import createRoles function
const app = express();
const port = 5000;
 
app.use(express.json());
 
async function startServer() {
  try {
    // Connecting to the database
    
    await mongoose.connect("mongodb+srv://umamahhussain:umamah@cluster0.erk21jo.mongodb.net/org");
    console.log('Connected successfully to DB');
 
    // Initialize roles
    await createRoles();
    console.log('Roles initialization complete.');
 
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (error) {
    console.error('Error during server startup:', error);
    process.exit(1); // Exit the process if an error occurs
  }
}
 
// Call startServer to initiate server startup
startServer();
 
// Importing models and routes
require('./models/User');
require('./models/Roles');
app.use(require('./routes/authentication'));
app.use(require('./routes/allowedPages'));
app.use(require('./routes/home'));
app.use(require('./routes/invoice'));