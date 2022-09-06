import express from "express";
// import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
// import devErrorhandler from "errorhandler";
import { loggerPlain } from "@/middlewares/loggerPlain.middleware";
import { notFound } from "@/middlewares/notFound.middleware";
import path from "path";
// import { clientErrorHandler } from "@/middlewares/clientErrorHandler.middleware";
// import userRouter from "@/domains/user/user.router";

// const isDevelopment = () => process.env.NODE_ENV === "development";
const app = express();

// // app.use(helmet()); not works in codesandbox
app.use(cors());

app.use(loggerPlain("--------------------"));
app.use(morgan("dev"));

app.use(express.json());

// app.use("/api/user", userRouter);
// app.get("/", (req, res) => {
//   res.send("Hello from homepage!");
// });

app.use(express.static(path.resolve('../')));

app.use(notFound);

// if (isDevelopment()) {
//   app.use(devErrorhandler());
// } else {
//   app.use(clientErrorHandler);
// }

export default app;
