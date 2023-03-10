const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const port = 3000;
const hostname = "localhost";

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  // lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log("Hello");
  });

  greet();
  greet();

  // Set header content type
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //   Send a html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    }
    // res.write(data);

    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`listening on the port ${port}`);
});
