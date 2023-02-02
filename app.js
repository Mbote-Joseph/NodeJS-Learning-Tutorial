const express = require("express");
const morgan = require("morgan");

// Connect to mongodb server
const dbURL =
  "mongodb+srv://Mbote:sct211-0011/2018@cluster0.q1hpyda.mongodb.net/?retryWrites=true&w=majority";

// Express app
const app = express();

// Register vies engine
app.set("view engine", "ejs");

// Listen for requests
app.listen(3000);

// Middleware
// app.use((req, res, next) => {
//   console.log("New request Made:");
//   console.log("Host: ", req.hostname);
//   console.log("Path: ", req.path);
//   console.log("Method: ", req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("In the next middleware");
//   next();
// });
app.use(morgan("dev"));

// Static files
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile("./views/index.html", { root: __dirname });
// });

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "To Kill a Mockingbird",
      snippet:
        "A classic novel that explores issues of racial injustice and prejudice in the deep South.",
    },
    {
      title: "The Great Gatsby",
      snippet:
        "A novel that captures the decadence and excess of the Roaring Twenties through the eyes of narrator Nick Carraway.",
    },
    {
      title: "Pride and Prejudice",
      snippet:
        "A novel that explores themes of love, societal expectations, and class in early 19th century England.",
    },
    {
      title: "The Catcher in the Rye",
      snippet:
        "A novel that follows the journey of teenage protagonist Holden Caulfield as he struggles with alienation and growing up.",
    },
  ];

  res.render("index", { title: "Home", blogs });
  //   console.log(blogs);
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blog/create", (req, res) => {
  res.render("create", { title: "Blogs" });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
