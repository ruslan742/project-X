import React from "react";
import CustomButton from "../ui/CustomButton";

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex items-center flex-col">
        <input id="file-upload" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <label htmlFor="file-upload" className="filepicker-label   text-white">
          Загрузить файл
        </label>
        <p className="mt-2 text-white  text-lg truncate">{file === "" ? "No file selected" : file.name}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton type="outline" title="Logo" handleClick={() => readFile("logo")} customStyles="text-lg font-bold" />
        <CustomButton type="filled" title="Texture" handleClick={() => readFile("full")} customStyles="text-lg font-bold  " />
      </div>
    </div>
  );
};

export default FilePicker;
