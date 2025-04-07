import { useEffect, useState } from "react";
import FaceMeshDetector from "./FaceMeshDetector";

const AvatarController = ({ avatarRef }) => {
  const [emotion, setEmotion] = useState("neutral");

  // Function to map face data to emotions
  const handleFaceData = (face) => {
    if (!face || !face.annotations) return;

    const { leftEyeUpper0, rightEyeUpper0, mouthUpperLipTop, mouthLowerLipBottom } = face.annotations;

    if (!leftEyeUpper0 || !rightEyeUpper0 || !mouthUpperLipTop || !mouthLowerLipBottom) return;

    const eyeOpening = (leftEyeUpper0[3][1] + rightEyeUpper0[3][1]) / 2; // Average eye openness
    const mouthOpening = mouthLowerLipBottom[0][1] - mouthUpperLipTop[0][1]; // Mouth openness

    // Simple emotion detection logic
    let detectedEmotion = "neutral";
    if (mouthOpening > 15) detectedEmotion = "happy";  // Open mouth → Happy
    if (eyeOpening < 2) detectedEmotion = "angry";     // Squinting → Angry
    if (mouthOpening < 3) detectedEmotion = "sad";     // Closed mouth → Sad

    setEmotion(detectedEmotion);
  };

  // Apply emotion to avatar
  useEffect(() => {
    if (avatarRef?.current) {
      avatarRef.current.setAnimation(emotion); // Apply animation based on emotion
    }
  }, [emotion, avatarRef]);

  return <FaceMeshDetector onFaceData={handleFaceData} />;
};

export default AvatarController;
