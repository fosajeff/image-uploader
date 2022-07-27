import UploadController from "./src/resources/upload.controller";
import App from "./app";
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = new App([new UploadController()]);

app.listen();

app.express.get("/", (req, res) => {
  res.send({ status: true, message: "Server up" });
});
