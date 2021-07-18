// require your server and launch it
require('dotenv').config()
const port = process.env.PORT || 5000
const server = require('./api/server')

server.listen(port, () => { console.log(`\n *** API Server listening on port ${port} *** \n`) })