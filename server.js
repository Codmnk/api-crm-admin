import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const PORT = process.env.PORT || 8000;

//connect to db
import mongoClient from "./src/config/db.js";
mongoClient();

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//load routes
import adminRouter from "./src/routers/admin.router.js";

// user routes
app.use("/api/v1/admin-user", adminRouter);

app.use("/", (req, res, next) => {
	res.json("ok");
});

//global error handler
app.use((error, req, res, next) => {
	console.log(error.message);
	res.status(error.status || 500);
	res.json({
		status: "error",
		message: error.message,
	});
});

app.listen(PORT, error => {
	if (error) console.log(error);

	console.log(`Server is ready at http://localhost:${PORT}`);
});
