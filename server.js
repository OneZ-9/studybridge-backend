import { app } from "./app.js";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;
app.listen(port, "0.0.0.0", () => {
  console.log(`App running on port ${port}...`);
});
