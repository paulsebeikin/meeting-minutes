const http = require('http');
const app = require('./src');
const { PORT } = require('./src/config');

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${ PORT }...`);
});