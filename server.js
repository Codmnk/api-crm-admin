import express, { application } from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
	res.send("ok");
});
console.log("server sdf sdf");

app.listen(PORT, error => {
	if (error) console.log(error);

	console.log(`Server is ready at http://localhost:${PORT}`);
});
