const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!, ini backend mycoffee");
});

// Import Router
const routerv1 = require("./src/routes/Router");
app.use("/api", routerv1);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
