import React, { useState } from "react";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { HttpRequest } from "@aws-sdk/protocol-http";
import "./Settings.css";

const accessKeyIdPut = import.meta.env.VITE_AWS_ACCESS_KEY_ID_PUT as string;
const secretAccessKeyPut = import.meta.env
  .VITE_AWS_SECRET_ACCESS_KEY_PUT as string;
const accessKeyIdGet = import.meta.env.VITE_AWS_ACCESS_KEY_ID_GET as string;
const secretAccessKeyGet = import.meta.env
  .VITE_AWS_SECRET_ACCESS_KEY_GET as string;
if (
  !accessKeyIdPut ||
  !secretAccessKeyPut ||
  !accessKeyIdGet ||
  !secretAccessKeyGet
) {
  throw new Error("Missing AWS credentials – check your .env");
}

const region = "us-west-2";
const apiHostPut = "d52lrc4a8e.execute-api.us-west-2.amazonaws.com";
const apiBasePathPut = "/v2/zotplanner-syllabi";
const apiHostGet = "vc50an6o9e.execute-api.us-west-2.amazonaws.com";

interface ParsedClass {
  id: string;
  name: string;
}

const Settings: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [_sessionId, setSessionId] = useState<string>(
    () => localStorage.getItem("sessionId") || ""
  );
  const [classes, setClasses] = useState<ParsedClass[]>(() =>
    JSON.parse(localStorage.getItem("classes") || "[]")
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first");
      return;
    }
    try {
      // 1) build and sign the HTTP request for PUT
      const signer = new SignatureV4({
        credentials: {
          accessKeyId: accessKeyIdPut,
          secretAccessKey: secretAccessKeyPut,
        },
        region,
        service: "execute-api",
        sha256: Sha256,
      });
      const path = `${apiBasePathPut}/${encodeURIComponent(file.name)}`;
      const request = new HttpRequest({
        protocol: "https:",
        hostname: apiHostPut,
        method: "PUT",
        path,
        headers: { "content-type": file.type },
        body: file,
      });
      const signed = await signer.sign(request);

      // 2) send the signed PUT
      const res = await fetch(`https://${apiHostPut}${path}`, {
        method: request.method,
        headers: signed.headers,
        body: file,
      });
      if (!res.ok) throw new Error(`Upload failed (${res.status})`);

      // store session ID, persist it, and fetch classes
      const id = file.name;
      setSessionId(id);
      localStorage.setItem("sessionId", id);
      await fetchClasses(id);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed, see console");
    }
  };

  // GET classes from API Gateway & DynamoDB
  const fetchClasses = async (_userId: string) => {
    try {
      const signer = new SignatureV4({
        credentials: {
          accessKeyId: accessKeyIdGet,
          secretAccessKey: secretAccessKeyGet,
        },
        region,
        service: "execute-api",
        sha256: Sha256,
      });
      //const path = `/prod/classes?userId=${encodeURIComponent(userId)}`;
      const path = `/prod/classes?userId=test-user`;
      const request = new HttpRequest({
        protocol: "https:",
        hostname: apiHostGet,
        method: "GET",
        path,
      });
      const signed = await signer.sign(request);

      const res = await fetch(`https://${apiHostGet}${path}`, {
        method: "GET",
        headers: signed.headers,
      });
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const data = await res.json();
      setClasses(data);
      // persist classes JSON
      localStorage.setItem("classes", JSON.stringify(data));
    } catch (err) {
      console.error("Fetch classes error:", err);
    }
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFile(target.files?.[0]);
  };

  return (
    <div className="tab-content">
      <div className="settings-container">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".txt,.pdf"
            onChange={handleOnChange}
            className="settings-button"
          />
          <button type="submit" className="settings-button">
            Submit
          </button>
        </form>

        {classes.length > 0 && (
          <div className="settings-classes">
            <div className="settings-json-box">
              <textarea
                readOnly
                className="settings-json-textarea"
                value={JSON.stringify(classes, null, 2)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
