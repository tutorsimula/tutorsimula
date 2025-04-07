import { useEffect, useRef } from "react";

const VideoComponent = ({ startFaceMesh }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.onloadeddata = () => {
        console.log("Video loaded, starting face detection...");
        startFaceMesh(); // Call the function when the video loads
      };
    }
  }, [startFaceMesh]);

  return <video ref={videoRef} id="video" autoPlay />;
};

export default VideoComponent;
