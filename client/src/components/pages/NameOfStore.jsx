import * as THREE from "three";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Loader } from "../../HOC/Loader";
import state from "../../store/";
import { useSnapshot } from "valtio";

export default function NameOfStore() {
  return (
    <section className=" h-[60vh] bg-black mb-36">
      <Canvas concurrent="true" gl={{ alpha: false }} pixelratio={[1, 1.5]} camera={{ position: [0, 0, 100], fov: 55 }}>
        <color attach="background" args={["black"]} />
        <fog attach="fog" args={["black", 15, 20]} />
        <Suspense fallback={<Loader />}>
          <group position={[0, -1, 0]}>
            <VideoText position={[0, 1.3, 7]} />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[0, 0, -40]} intensity={0.7} />
          <Intro />
        </Suspense>
      </Canvas>
      <p id="title" className="section-heading" style={{ textAlign: "center" }}>
        Take something ready-made or create your own - a store of possibilities for you..
      </p>
    </section>
  );
}

function VideoText(props) {
  const snap = useSnapshot(state);
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/videos/bladeRunner.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );
  useEffect(() => void video.play(), [video]);
  return (
    <Text font="/fonts/Inter-Bold.woff" textAlign="center" fontSize={3} letterSpacing={-0.06} {...props}>
      {snap.userName === "" ? "Cyber \n Closet " : `Welcome\n${snap.userName}`}
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} repeat={[1, 1]} centerVideo />
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
