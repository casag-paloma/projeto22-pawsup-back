import express, {json} from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares.ts/errorHandlerMiddleware";
import route from "./routes/route";

const app = express();
app.use(json());

app.use(route);
app.use(errorHandlerMiddleware);


export default app;