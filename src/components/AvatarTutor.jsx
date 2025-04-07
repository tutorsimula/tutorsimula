import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import FaceMeshDetector from "./FaceMeshDetector"; // Import FaceMesh

export default function Avatar() {
  const [faceData, setFaceData] = useState(null);
  const modelUrl = "/assets/avaturn-avatar.glb"; // Your Avaturn model

  return (
    <div>
      <FaceMeshDetector onFaceData={setFaceData} /> {/* Capture expressions */}
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <AvatarModel modelUrl={modelUrl} faceData={faceData} />
      </Canvas>
    </div>
  );
}

function AvatarModel({ modelUrl, faceData }) {
  const avatarRef = useRef();
  const { scene } = useGLTF(modelUrl);

  useEffect(() => {
    if (faceData && scene) {
      console.log("😊 Facial Data Received:", faceData);
      // TODO: Apply expressions (map faceData to avatar blend shapes)
    }
  }, [faceData, scene]);

  return <primitive object={scene} ref={avatarRef} />;
}
