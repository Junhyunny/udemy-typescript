// require 로 해당 모듈을 임포트하는 경우 타입에 따른 자동 완성이 되지 않는다.
import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import todoRoutes from "./routes/todos";

const app = express();

app.use(json());

app.use("/todos", todoRoutes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(500).json({ message: error.message });
});

app.listen(3000, function () {
    console.log("info", "Server is running at port : " + 3000);
});
