const validateBody = (body, requiredFields) => {
    const bodyFields = Object.keys(body)
    const missingFields = requiredFields.filter(field => !bodyFields.includes(field))
    return missingFields;
}
 
module.exports = {
    validateBody
}