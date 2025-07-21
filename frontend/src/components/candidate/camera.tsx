import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

interface Props {
  candidateId: string;
  projectId: string;
  psikotestId: string;
}

export const CameraComponent = ({
  candidateId,
  projectId,
  psikotestId,
}: Props) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null); // Store the stream reference

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      takeScreenshot();
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream; // Store the stream reference
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        alert("Error accessing the camera");
        navigate("/psikotest");
        return;
      }
    };

    startCamera();

    return () => {
      stopCamera(); // Ensure the camera is stopped on unmount
    };
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //     // Check if the current URL is "/assessment/psikotest"
  //     if (window.location.pathname === "/" || window.location.pathname === "/settings") {
  //         stopCamera(); // Stop the camera if the URL matches
  //     }
  // }); // Run this effect whenever the pathname changes

  const takeScreenshot = async () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        const dataUrl = canvasRef.current.toDataURL("image/png");
        console.log({ dataUrl });
        // const base64Data = dataUrl.split(',')[1];
        // const byteString = base64js.toByteArray(base64Data);
        // const byteArray = new Uint8Array(byteString);

        // const name = `${candidateId}-${psikotestId}-${projectId}-id:${nanoid()}`;

        const formData = new FormData();
        formData.append("candidateId", candidateId);
        formData.append("psikotestId", psikotestId);
        formData.append("projectId", projectId);
        formData.append("time", `${new Date()}`);
        // formData.append("image", name);

        console.log({ formData });
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      streamRef.current = null; // Clear the stream reference
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null; // Stop the video stream
    }
  };

  return (
    <div className="flex justify-end">
      <video
        autoPlay
        playsInline
        ref={videoRef}
        style={{ borderRadius: "18px", height: "auto", width: "18%" }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};
