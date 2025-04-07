import React, { useEffect, useRef } from "react";
import { AvaturnSDK } from "@avaturn/sdk";

export default function AvatarGenerator({ onAvatarExport }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const subdomain = "your-subdomain"; // 🔹 Replace with your Avaturn project subdomain
    const url = `https://${subdomain}.avaturn.dev`;

    const sdk = new AvaturnSDK();
    sdk.init(containerRef.current, { url }).then(() => {
      sdk.on("export", (data) => {
        console.log("Avatar Exported:", data);
        onAvatarExport(data); // Send exported avatar data to parent component
      });
    });

    return () => {
      sdk.destroy(); // Cleanup on unmount
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
}
