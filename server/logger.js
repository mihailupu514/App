import http from "http";

const PORT = 8787;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  if (req.method === "POST" && req.url === "/log") {
    try {
      const bodyRaw = await readBody(req);
      const body = bodyRaw ? JSON.parse(bodyRaw) : {};

      const ts = new Date().toISOString();
      const ip =
        req.socket.remoteAddress?.replace("::ffff:", "") || "unknown-ip";

      // log format in terminal
      console.log(
        `[${ts}] ${ip} -> choice=${body.choice} noCount=${body.noCount} path=${body.path}`
      );

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      return res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      console.error("Log server error:", e);
      res.writeHead(400, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      return res.end(JSON.stringify({ ok: false }));
    }
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Logger server running on http://localhost:${PORT}`);
  console.log(`POST logs to http://localhost:${PORT}/log`);
});
