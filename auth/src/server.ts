import http from "http";
import App from "./app";

const port = process.env.PORT || 5000;

const server = http.createServer(App);
server.listen(port);
