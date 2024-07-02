import React from "react";
import { useSnapshot } from "valtio";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/hoodie.glb");

  console.log("nodes ===>", nodes, "materials==>", materials);
  // nodes.Hoodie.geometry.boundingSphere.radius = 0.5;
  // nodes.Hoodie.geometry.boundingSphere.center.y = 0.5;
  // nodes.Hoodie.geometry.boundingBox.max.x = 0.27;
  // nodes.Hoodie.geometry.boundingBox.max.y = 0.26;
  // nodes.Hoodie.geometry.boundingBox.max.z = 0.144;
  // nodes.Hoodie.geometry.boundingBox.min.x = -0.27;
  // nodes.Hoodie.geometry.boundingBox.min.y = -0.26;
  // nodes.Hoodie.geometry.boundingBox.min.z =- 0.144;
  // nodes.Hoodie.scale.x = 1;
  // nodes.Hoodie.scale.y = 1;
  // nodes.Hoodie.scale.z = 1;
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  useFrame((state, delta) => easing.dampC(materials["FABRIC 3_FRONT_1850.003"].color, snap.color, 0.25, delta));
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh castShadow geometry={nodes.Hoodie.geometry} material={materials["FABRIC 3_FRONT_1850.003"]} material-roughness={1} dispose={null}>
        {snap.isFullTexture && (
          <Decal position={[0, 150, 0]} rotation={[0, 0, 0]} scale={135} map={fullTexture} depthTest={true} depthWrite={true} /> // <Decal position={[0, 140, 4]} rotation={[0, 0, 0]} scale={28} map={fullTexture} />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 140, 4]}
            rotation={[0, 0, 0]}
            scale={28}
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
