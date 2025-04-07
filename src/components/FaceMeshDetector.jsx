import * as facemesh from "@tensorflow-models/facemesh";
import "@tensorflow/tfjs";
import { useEffect, useRef, useState, useCallback } from "react";

const FaceMeshDetector = ({ onFaceData }) => {
  const videoRef = useRef(null);
  const modelRef = useRef(null);
  const lastFaceDataRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const isRunningRef = useRef(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Load FaceMesh Model
  useEffect(() => {
    let isMounted = true;
    
    const loadFaceMesh = async () => {
      if (modelRef.current) return;
      try {
        modelRef.current = await facemesh.load();
        if (isMounted) {
          // Model loaded successfully (no console log needed)
        }
      } catch (error) {
        console.error("❌ FaceMesh Initialization Error:", error);
      }
    };

    loadFaceMesh();
    return () => { isMounted = false; };
  }, []);

  // Start Video Stream
  useEffect(() => {
    const startVideo = async () => {
      try {
        const video = videoRef.current;
        if (!video) return;

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        video.onloadedmetadata = async () => {
          try {
            await video.play();
            setIsVideoReady(true);
          } catch (err) {
            console.error("❌ Video play error:", err);
          }
        };
      } catch (err) {
        console.error("❌ Error accessing camera:", err);
      }
    };
    startVideo();
  }, []);

  // Face Detection Logic
  const detectFace = useCallback(async () => {
    if (!isVideoReady || !modelRef.current || isRunningRef.current) {
      requestAnimationFrame(detectFace);
      return;
    }

    isRunningRef.current = true;
    const video = videoRef.current;

    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      requestAnimationFrame(detectFace);
      isRunningRef.current = false;
      return;
    }

    const faces = await modelRef.current.estimateFaces(video);
    if (faces.length > 0) {
      const faceData = faces[0];

      // Throttle updates
      const now = Date.now();
      if (now - lastUpdateTimeRef.current < 500) {
        requestAnimationFrame(detectFace);
        isRunningRef.current = false;
        return;
      }
      lastUpdateTimeRef.current = now;

      // Prevent redundant updates
      if (
        !lastFaceDataRef.current ||
        JSON.stringify(lastFaceDataRef.current) !== JSON.stringify(faceData)
      ) {
        lastFaceDataRef.current = faceData;
        onFaceData(faceData);
      }
    }

    isRunningRef.current = false;
    requestAnimationFrame(detectFace);
  }, [isVideoReady, onFaceData]);

  // Start detection when ready
  useEffect(() => {
    if (isVideoReady) {
      detectFace();
    }
  }, [isVideoReady, detectFace]);

  return <video ref={videoRef} style={{ display: "none" }} />;
};

export default FaceMeshDetector;