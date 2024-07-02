import React, { useRef } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    let targetPosition = [snap.clothxScale, snap.clothyScale, 2 * snap.clothzScale];

    if (snap.intro) {
      if (isBreakpoint) targetPosition = [snap.clothxScale, snap.clothyScale, 2 * snap.clothzScale]; //поставил 5
      if (isMobile) targetPosition = [snap.clothxScale, snap.clothyScale, 2.5 * snap.clothzScale];
    } else {
      if (isMobile) targetPosition = [snap.clothxScale, snap.clothyScale, 2.5 * snap.clothzScale];
      else targetPosition = [snap.clothxScale, snap.clothyScale, 2 * snap.clothzScale];
    }
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);
    easing.dampE(group.current.rotation, [state.pointer.y / (snap.cloth === "sock" ? 50 : 5), -state.pointer.x, 0], 0.25, delta);
  });
  return <group ref={group}>{children}</group>;
};

export default CameraRig;
