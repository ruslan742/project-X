import * as THREE from "three";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Reflector, Text, useTexture, useGLTF, MeshReflectorMaterial } from "@react-three/drei";

export default function NameOfStore() {
  return (
    <section className=" h-[60vh] bg-black ">
      <Canvas concurrent gl={{ alpha: false }} pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 100], fov: 55 }}>
        <color attach="background" args={["black"]} />
        <fog attach="fog" args={["black", 15, 20]} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <VideoText position={[0, 1.3, 7]} />
            {/* <Ground /> */}
            {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
              <planeGeometry args={[20, 10]} />
              <MeshReflectorMaterial
                blur={[400, 100]}
                resolution={512}
                mixBlur={6}
                mirror={0.5}
                opacity={2}
                depthScale={1.1}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.25}
                roughness={1}
                color="#a0a0a0"
                metalness={0.4}
              />
            </mesh> */}
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[0, 0, -40]} intensity={0.7} />
          <Intro />
        </Suspense>
      </Canvas>
      <p id="title" className="section-heading" style={{ textAlign: "center" }}>
        Возьми готовое или сотвори свое - магазин возможностей для тебя.
      </p>
    </section>
  );
}

// function Carla(props) {
//   const { scene } = useGLTF("/carla-draco.glb");
//   return <primitive object={scene} {...props} />;
// }

function VideoText(props) {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), { src: "/drei3.mp4", crossOrigin: "Anonymous", loop: true, muted: true })
  );
  useEffect(() => void video.play(), [video]);
  return (
    <Text font="/Inter-Bold.woff" textAlign="center" fontSize={3} letterSpacing={-0.06} {...props}>
      {"Cyber \n Store "}
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </Text>
  );
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05);
    state.camera.lookAt(0, 0, 0);
  });
}
