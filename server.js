const http = require("node:http");
const { readFile } = require("node:fs");
const { join } = require("node:path");

const page = join(__dirname, "index.html");

http
  .createServer((request, response) => {
    if (request.url !== "/") {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found\n");
      return;
    }

    readFile(page, (error, content) => {
      if (error) {
        response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Unable to load page\n");
        return;
      }

      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(content);
    });
  })
  .listen(3000, "0.0.0.0", () => {
    console.log("Server listening on http://localhost:3000");
  });
