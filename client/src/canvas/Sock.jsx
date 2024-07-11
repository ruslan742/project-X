import React from "react";
import { useSnapshot } from "valtio";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { Logos, Textures } from "../config/constants";
import * as THREE from "three";

const Sock = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/models/sock.glb");
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  // fullTexture.colorSpace = THREE.SRGBColorSpace;
  // const logosTransformed = Logos.map((el) => useTexture(el.image));
  // const TexturesTransformed = Textures.map((el) => useTexture(el.image));
  useFrame((state, delta) => easing.dampC(materials["Material.002"].color, snap.color, 0.25, delta));
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh castShadow geometry={nodes.MatShape_1205870.geometry} material={materials["Material.002"]} material-roughness={1} dispose={null}>
        {snap.isFullTexture && <Decal position={[100, 200, 0]} rotation={[0, 0, 0]} scale={400} map={fullTexture} />}
        {snap.isLogoTexture && (
          <Decal position={[100, 240, 4]} rotation={[0, 0, 0]} scale={81} map={logoTexture} depthTest={false} depthWrite={true} />
        )}
      </mesh>
    </group>
  );
};

export default Sock;
