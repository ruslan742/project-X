import React, { useEffect, useRef } from "react";
import { Logos } from "../config/constants";
import state from "../store";
import { useSnapshot } from "valtio";

export default function LogoPicker({ closeModal, tabRef }) {
  const snap = useSnapshot(state);
  const logoPickerRef = useRef(null);
  const handleClickLogo = (logo) => {
    state.logoDecal = logo;
  };
  const handleClickOutside = (event) => {
    if ((logoPickerRef.current && !logoPickerRef.current.contains(event.target) && !tabRef.current.contains(event.target))) {

      // Закрываем окно с выбором логотипа
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
      ref={logoPickerRef}
      className="logopicker-container overflow-y-auto"
      style={{
        scrollbarColor: `${snap.color} #fcfcfc`,
        // cursor: "pointer",

        // scrollbarWidth: "thin",
        // scrollbarTrackColor: "#f233f1f1",
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Logos.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer group"
            style={{
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
            }}
            onClick={() => handleClickLogo(image.image)}
          >
            <img className=" w-full max-w-full rounded-lg object-cover object-center group-hover:scale-105" src={image.image} alt="gallery-photo" />
          </div>
        ))}
      </div>
    </div>
  );
}
