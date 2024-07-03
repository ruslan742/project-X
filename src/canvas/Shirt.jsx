import React from "react";
import { useSnapshot } from "valtio";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  // console.log("nodes ===>", nodes, "materials==>", materials);
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  useFrame((state, delta) => easing.dampC(materials["lambert1"].color, snap.color, 0.25, delta));
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials["lambert1"]} material-roughness={1} dispose={null}>
        {snap.isFullTexture && (
          <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={0.7} map={fullTexture} depthTest={true} depthWrite={true} /> // <Decal position={[0, 140, 4]} rotation={[0, 0, 0]} scale={28} map={fullTexture} />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            //mapAnisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
      {/* <mesh
        castShadow
        geometry={nodes.Hoodie_FABRIC_3_FRONT_1850_0_2.geometry}
        material={materials.FABRIC_3_FRONT_1850}
        material-roughness={1}
        dispose={null}
      >
        {' '}
      </mesh>
      <mesh
        castShadow
        geometry={nodes.Hoodie_FABRIC_3_FRONT_1850_0_3.geometry}
        material={materials.FABRIC_3_FRONT_1850}
        material-roughness={1}
        dispose={null}
      >
        {' '}
      </mesh>
      <mesh
        castShadow
        geometry={nodes.Hoodie_FABRIC_3_FRONT_1850_0.geometry}
        material={materials.FABRIC_3_FRONT_1850}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 200.15]}
            rotation={[0, 0, 0]}
            scale={1.15}
            map={logoTexture}
            //mapAnisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh> */}
    </group>
  );
};

export default Shirt;
