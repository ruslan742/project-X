// import React, { useEffect, useRef } from "react";
// import { Decal, useGLTF, useTexture } from "@react-three/drei";
// import * as THREE from "three";
// import { useSnapshot } from "valtio";
// import { easing } from "maath";
// import state from "../store";
// import { useFrame } from "@react-three/fiber";

// function Model(props) {
//   const snap = useSnapshot(state);
//   const { nodes, materials } = useGLTF("/shirt_baked.glb");
//   const logoTexture = useTexture(snap.logoDecal);
//   const fullTexture = useTexture(snap.fullDecal);
//   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
//   const stateString = JSON.stringify(snap);
//   // console.log(materials);
//   return (
//     <group key={stateString}>
//       <mesh
//         castShadow
//         geometry={nodes.T_Shirt_male.geometry}
//         material={materials.lambert1}
//         material-roughness={1}
//         dispose={null}
//         //rotation={[-Math.PI / 2, 0, 0]}
//       >
//         {snap.isFullTexture && <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={2} map={fullTexture} />}
//         {snap.isLogoTexture && (
//           <Decal
//             position={[0, 0.04, 0.15]}
//             rotation={[0, 0, 0]}
//             scale={0.15}
//             map={logoTexture}
//             //mapAnisotropy={16}
//             depthTest={false}
//             depthWrite={true}
//           />
//         )}
//       </mesh>
//     </group>
//   );
// }
// export default Model;
// useGLTF.preload("/models/shirt_baked.glb");
