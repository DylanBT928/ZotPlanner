import React, { useState } from "react";

const Settings: React.FC = () => {
  const [file, setFile] = useState<File | undefined>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("file", file);
  };

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  }

  return (
    <div className="tab-content">
      Settings Details go here
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleOnChange} />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default Settings;
