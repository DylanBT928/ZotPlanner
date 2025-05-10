import React, { useState } from "react";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log();
};

function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
  const target = e.target as HTMLInputElement & {
    files: FileList;
  };
  console.log("target", target.files);
}

const Settings: React.FC = () => {
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
