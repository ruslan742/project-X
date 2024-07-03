import React from "react";
import { Logos } from "../config/constants";
import state from "../store";
import { useSnapshot } from "valtio";
export default function LogoPicker() {
  const snap = useSnapshot(state);
  return (
    <div
      className="logopicker-container overflow-y-auto"
      style={{
        scrollbarColor: `${snap.color} #fcfcfc`,

        // scrollbarWidth: "thin",
        // scrollbarTrackColor: "#f233f1f1",
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Logos.map((image, index) => (
          <div key={index}>
            <img className=" w-full max-w-full rounded-lg object-cover object-center" src={image.image} alt="gallery-photo" />
          </div>
        ))}
      </div>
    </div>
  );
}
