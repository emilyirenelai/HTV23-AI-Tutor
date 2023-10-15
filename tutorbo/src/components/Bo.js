import React from 'react';
import { Canvas } from 'react-three-fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';

function CharacterModel({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function CharacterViewer({ modelUrl }) {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CharacterModel url={modelUrl} />
      <OrbitControls />
    </Canvas>
  );
}

export default CharacterViewer;
