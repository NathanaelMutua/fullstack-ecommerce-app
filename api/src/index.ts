import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.send(`<h1>E-Commerce API</h1>`);
});

const port = process.env.PORT || 3000; // uses switch case to 3000 if environment variable is not set

app.listen(port, () => {
  console.log(`Ecommerce App is listening on port ${port}`);
});
