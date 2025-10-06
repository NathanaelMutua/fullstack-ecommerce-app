import express, { urlencoded } from "express";
import productRouter from "./routes/products/productRouter";
import authRouter from "./routes/authentication/authRouter";

const app = express();

app.use(urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send(`<h1>E-Commerce API</h1>`);
});

// product router
app.use("/api/products", productRouter);

// authentication router
app.use("/api/auth", authRouter);

const port = process.env.PORT || 3000; // uses switch case to 3000 if environment variable is not set

app.listen(port, () => {
  console.log(`E-commerce App is listening on port ${port}`);
});
