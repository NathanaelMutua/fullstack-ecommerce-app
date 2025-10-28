import express, { urlencoded } from "express";
import productRouter from "./routes/products/productRouter";
import authRouter from "./routes/authentication/authRouter";
import ordersRouter from "./routes/orders/ordersRouter";

const app = express();

app.use(urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send(`<h1>E-Commerce API</h1>`);
});

// authentication router
app.use("/api/auth", authRouter);

// product router
app.use("/api/products", productRouter);

// order router
app.use("/api/orders", ordersRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`E-commerce App is listening on port ${port}`);
});
