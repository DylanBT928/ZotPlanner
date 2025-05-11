import express from "express";
import { generateUploadURL } from "./S3.tsx";
import cors from "cors";

const app = express();

// allow your front-end origin
app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json());

app.put("/S3Url", async (_req, res) => {
  console.log("Am I here?");

  const url = await generateUploadURL();
  res.json({ url });
});

app.listen(8080, () => console.log("listening on port 8080"));
