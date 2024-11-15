import { app } from "./app.js";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
