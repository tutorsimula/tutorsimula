import React, { Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber"; // Added useFrame
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

function AvatarModel({ expression }) {
  const modelUrl = {
    entry: "/assets/entry.glb",
    happy: "/assets/happy.glb",
    waiting: "/assets/waiting.glb",
    thinking: "/assets/thinking.glb",
    dancing: "/assets/dancing.glb",
    sad: "/assets/sad.glb",
  }[expression] || "/assets/entry.glb";

  const { scene, animations } = useGLTF(modelUrl);
  console.log(`Loaded ${modelUrl} successfully`);
  console.log("Scene contents:", scene.children);
  console.log("Animations:", animations);
  console.log("Animation names:", animations.map(anim => anim.name)); // Log animation names

  const { actions, mixer } = useAnimations(animations, scene);

  // Ensure mixer updates each frame
  useFrame((state, delta) => {
    mixer.update(delta);
  });

  useEffect(() => {
    // Map expression to animation name
    const animationMap = {
      entry: "Idle",    // Adjust based on actual animation names
      happy: "Smile",
      waiting: "Wait",
      thinking: "Think",
      dancing: "Dance",
      sad: "Sad",
    };
    const animationName = animationMap[expression] || "Idle"; // Fallback to a default animation
    const action = actions[animationName];

    if (action) {
      console.log(`Playing animation: ${animationName}`);
      action.reset().fadeIn(0.5).play();
    } else {
      console.log(`No animation found for expression: ${expression} (mapped to ${animationName})`);
    }

    return () => {
      if (action) {
        action.fadeOut(0.5);
      }
    };
  }, [expression, actions]);

  return (
    <primitive
      object={scene}
      scale={[5, 5, 5]}
      position={[0, 0, 0]}
    />
  );
} // Added closing brace for AvatarModel

export default function Avatar({ expression }) {
  return (
    <div style={{ width: "100%", height: "300px", background: "#ccc" }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <OrbitControls enableZoom={true} />
        <Suspense fallback={<mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="yellow" /></mesh>}>
          <AvatarModel expression={expression} />
          <mesh position={[2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/assets/entry.glb");
useGLTF.preload("/assets/happy.glb");
useGLTF.preload("/assets/waiting.glb");
useGLTF.preload("/assets/thinking.glb");
useGLTF.preload("/assets/dancing.glb");
useGLTF.preload("/assets/sad.glb");