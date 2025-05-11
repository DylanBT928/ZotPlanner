import React, { useState } from "react";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const Settings: React.FC = () => {
  const [file, setFile] = useState<File | undefined>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFile(target.files?.[0]);
  };

  return (
    <div className="tab-content">
      <form onSubmit={handleSubmit}>
        <input type="file" name=".txt,.pdf" onChange={handleOnChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Settings;
