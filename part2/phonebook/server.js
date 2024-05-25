const jsonServer = require('json-server');
const server = jsonServer.create();
const dbFile = process.env.JSON_SERVER_DB || 'db.json'; 
const router = jsonServer.router(dbFile); 
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3001; // Puerto en el que se ejecutará el servidor

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

