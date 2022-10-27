const port = process.env.PORT || 3302;
const start = () => console.log(`Server on http://localhost:${port}`);
module.exports = {port,start};