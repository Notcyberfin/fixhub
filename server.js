const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "out");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split("?")[0]);
  if (reqPath === "/" || reqPath === "") {
    reqPath = "/index.html";
  }

  let filePath = path.join(PUBLIC_DIR, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Try appending .html
      const htmlPath = filePath + ".html";
      fs.stat(htmlPath, (htmlErr, htmlStats) => {
        if (!htmlErr && htmlStats.isFile()) {
          serveFile(htmlPath, res);
        } else {
          // Serve 404
          const notFoundPath = path.join(PUBLIC_DIR, "404.html");
          if (fs.existsSync(notFoundPath)) {
            res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
            fs.createReadStream(notFoundPath).pipe(res);
          } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
          }
        }
      });
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  res.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  });

  fs.createReadStream(filePath).pipe(res);
}

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
