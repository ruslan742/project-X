import React, { useEffect, useRef } from "react";
import { Textures } from "../config/constants";
import state from "../store";
import { useSnapshot } from "valtio";

export default function LogoPicker({ closeModal, tabRef }) {
  const snap = useSnapshot(state);
  const texturePickerRef = useRef(null);
  const handleClickTexture = (texture) => {
    state.fullDecal = texture;
  };

  const handleClickOutside = (event) => {
    if (texturePickerRef.current && !texturePickerRef.current.contains(event.target) && !tabRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={texturePickerRef}
      className="logopicker-container overflow-y-auto"
      style={{
        scrollbarColor: `${snap.color} #fcfcfc`,
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Textures.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer group"
            style={{
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
            }}
            onClick={() => handleClickTexture(image.image)}
          >
            <img className=" w-full max-w-full rounded-lg object-cover object-center group-hover:scale-105" src={image.image} alt="gallery-photo" />
          </div>
        ))}
      </div>
    </div>
  );
}
