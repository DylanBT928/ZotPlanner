import React, { useState } from "react";

const Settings: React.FC = () => {
  const [file, setFile] = useState<File | undefined>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { url } = await fetch("http://localhost:8080/S3Url").then((res) =>
        res.json()
      );
    } catch (e) {
      console.log(e);
    }
    /*
    console.log(url);

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
      */
  };

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  }

  return (
    <div className="tab-content">
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleOnChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Settings;
