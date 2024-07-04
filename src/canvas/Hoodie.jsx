import React from "react";
import { useSnapshot } from "valtio";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const Hoodie = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/models/hoodie.glb");
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  useFrame((state, delta) => easing.dampC(materials["FABRIC 3_FRONT_1850.003"].color, snap.color, 0.25, delta));
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh castShadow geometry={nodes.Hoodie.geometry} material={materials["FABRIC 3_FRONT_1850.003"]} material-roughness={1} dispose={null}>
        {snap.isFullTexture && (
          <Decal position={[0, 150, 0]} rotation={[0, 0, 0]} scale={135} map={fullTexture} depthTest={true} depthWrite={true} /> 
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 140, 4]}
            rotation={[0, 0, 0]}
            scale={28}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Hoodie;
