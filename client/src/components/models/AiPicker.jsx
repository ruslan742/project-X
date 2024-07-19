import React from "react";
import CustomButton from "../ui/CustomButton";

const AiPicker = ({ prompt, setPrompt, generatingImg, handleSubmit, loading }) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea text-white"
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3 ">
        {generatingImg ? (
          <CustomButton type="outline" title="Asking AI..." customStyles="text-lg " />
        ) : (
          <>
            <CustomButton type="outline" title="AI logo" handleClick={() => handleSubmit("logo")} customStyles="text-lg font-bold" />
            <CustomButton type="filled" title="AI full" handleClick={() => handleSubmit("full")} customStyles="text-lg font-bold" />
          </>
        )}
      </div>
    </div>
  );
};

export default AiPicker;
