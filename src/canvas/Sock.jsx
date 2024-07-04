import React from "react";
import { useSnapshot } from "valtio";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { Logos,Textures } from "../config/constants";
const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/sockready4.glb");
  //   nodes.MatShape_1205870.scale.x = 1;
  // nodes.MatShape_1205870.scale.y = 1;
  // nodes.MatShape_1205870.scale.z = 1;
  // console.log("nodes ===>", nodes, "materials==>", materials);
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const logosTransformed = Logos.map((el) => useTexture(el.image));
  const TexturesTransformed = Textures.map((el) => useTexture(el.image));
  useFrame((state, delta) => easing.dampC(materials["Material.002"].color, snap.color, 0.25, delta));
  const stateString = JSON.stringify(snap);
  //console.log(i);

  return (
    <group key={stateString}>
      <mesh castShadow geometry={nodes.MatShape_1205870.geometry} material={materials["Material.002"]} material-roughness={1} dispose={null}>
        {snap.isFullTexture && (
          <Decal position={[100, 200, 0]} rotation={[0, 0, 0]} scale={400} map={fullTexture} /> // <Decal position={[0, 140, 4]} rotation={[0, 0, 0]} scale={28} map={fullTexture} />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[100, 240, 4]}
            rotation={[0, 0, 0]}
            scale={81}
            map={logoTexture}
            //map={logosTransformed[i]}
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
