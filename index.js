import express from "express";
import { PORT } from "./src/config/config.service.js";
import { bootstrap } from "./app.controler.js";
const app = express();

const port = PORT;

await bootstrap(app, express);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
