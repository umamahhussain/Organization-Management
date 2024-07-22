 const bodyValidator = {
    'signup': ['firstname', 'lastname', 'password', 'username', 'supervisor', 'department', 'role'],
    'login': ['password', 'username'],
}
 
module.exports = {
    bodyValidator
}