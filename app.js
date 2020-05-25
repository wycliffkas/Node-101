const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Hello</title></head>");
    res.write(
      "<body><form method='POST' action='/message'><input type='text' name='message'/><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chuck) => {
      body.push(chuck);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      //   fs.writeFileSync("message.text", message);
      fs.writeFile("message.text", message, (err) => {
        res.statusCode = "302";
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Hello</title></head>");
  res.write("<body>Hello Node..</body>");
  res.write("</html>");
  res.end();
});

server.listen(4000);
