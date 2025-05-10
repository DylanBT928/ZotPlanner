import express from "express";
import { generateUploadURL } from "./S3.tsx";

const app = express();

app.use(express.static("front"));

app.get("/S3Url", async (_req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

app.listen(8080, () => console.log("listening on port 8080"));
