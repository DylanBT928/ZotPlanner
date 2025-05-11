import React, { useState } from "react";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { HttpRequest } from "@aws-sdk/protocol-http";

const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID as string;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY as string;
if (!accessKeyId || !secretAccessKey) {
  throw new Error("Missing AWS credentials – check your .env");
}

const region = "us-west-2";
const apiHost = "d52lrc4a8e.execute-api.us-west-2.amazonaws.com";
const apiBasePath = "/v2/zotplanner-syllabi";

const Settings: React.FC = () => {
  const [file, setFile] = useState<File>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first");
      return;
    }
    try {
      // 1) build and sign the HTTP request
      const signer = new SignatureV4({
        credentials: { accessKeyId, secretAccessKey },
        region,
        service: "execute-api",
        sha256: Sha256,
      });
      const path = `${apiBasePath}/${encodeURIComponent(file.name)}`;
      const request = new HttpRequest({
        protocol: "https:",
        hostname: apiHost,
        method: "PUT",
        path,
        headers: { "content-type": file.type },
        body: file,
      });
      const signed = await signer.sign(request);

      // 2) send the signed request with binary body
      const res = await fetch(`https://${apiHost}${path}`, {
        method: request.method,
        headers: signed.headers,
        body: file,
      });
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      alert("Upload successful!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed, see console");
    }
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFile(target.files?.[0]);
  };

  return (
    <div className="tab-content">
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".txt,.pdf" onChange={handleOnChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Settings;
