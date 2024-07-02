import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import React from 'react';
import { easing } from 'maath';
import { useRef } from 'react';

const Backdrop = () => {
  const shadows = useRef();
  return (
    <AccumulativeShadows
    ref={shadows}
    temporal
    frames={60}
    alphaTest={0.1}
    scale={5}
    rotation={[Math.PI / 2, 0, 0]}
    position={[0, 0, -0.14]}
    color="white"
    >

      <RandomizedLight
        amount={4}
        radius={0.25}
        intensity={0.3}
        ambient={1}
        position={[1, 1, 10]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
