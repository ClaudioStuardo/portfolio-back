const app = require("./app");
const server = require("http").createServer(app);

const API_VERSION = process.env.API_VERSION;
const IP_SERVER = process.env.IP_SERVER;
const PORT = process.env.PORT || 8080;

server.listen(PORT,()=>{
  console.log("Server is running at");
  console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
});