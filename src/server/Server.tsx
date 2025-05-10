import express from "express";
import { generateUploadURL } from "./S3.tsx";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.static("components"));

app.put("/S3Url", async (_req, res) => {
  console.log("Am I here?");

  const url = await generateUploadURL();
  res.send({ url });
});

app.listen(8080, () => console.log("listening on port 8080"));
