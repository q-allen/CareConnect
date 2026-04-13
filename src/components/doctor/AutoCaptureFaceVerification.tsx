"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FacePosition {
  type: "front" | "left" | "right";
  label: string;
  instruction: string;
}

const FACE_POSITIONS: FacePosition[] = [
  {
    type: "front",
    label: "Front View",
    instruction: "Look straight at the camera and blink",
  },
  {
    type: "left",
    label: "Left Profile",
    instruction: "Turn your head to the left",
  },
  {
    type: "right",
    label: "Right Profile",
    instruction: "Turn your head to the right",
  },
];

interface AutoCaptureFaceVerificationProps {
  onComplete: (photos: {
    front: Blob;
    left: Blob;
    right: Blob;
  }) => void;
  onCancel?: () => void;
}

export default function AutoCaptureFaceVerification({
  onComplete,
  onCancel,
}: AutoCaptureFaceVerificationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captureLockRef = useRef(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<{
    front?: Blob;
    left?: Blob;
    right?: Blob;
  }>({});
  const [error, setError] = useState<string>("");
  const [faceDetected, setFaceDetected] = useState(false);
  const [blinkDetected, setBlinkDetected] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const currentPosition = FACE_POSITIONS[currentStep];

  // Initialize camera
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsDetecting(true);
        startFaceDetection();
      }
    } catch (err) {
      setError("Unable to access camera. Please grant camera permissions.");
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const startFaceDetection = async () => {
    // Load face-api.js models
    try {
      const faceapi = await import("face-api.js");
      
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      ]);

      detectFace(faceapi);
    } catch (err) {
      console.error("Face detection error:", err);
      setError("Face detection initialization failed");
    }
  };

  const detectFace = async (faceapi: any) => {
    if (!videoRef.current || !isDetecting) return;

    const detections = await faceapi
      .detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceLandmarks();

    if (detections) {
      setFaceDetected(true);
      setError("");

      // Check for blink on front view
      if (currentPosition.type === "front" && !blinkDetected) {
        const leftEye = detections.landmarks.getLeftEye();
        const rightEye = detections.landmarks.getRightEye();
        
        // Simple blink detection based on eye aspect ratio
        const leftEAR = calculateEyeAspectRatio(leftEye);
        const rightEAR = calculateEyeAspectRatio(rightEye);
        const avgEAR = (leftEAR + rightEAR) / 2;

        if (avgEAR < 0.2) {
          setBlinkDetected(true);
          setTimeout(() => autoCapture(), 500);
        }
      } else if (currentPosition.type !== "front") {
        // For side views, auto-capture after face is stable
        setTimeout(() => {
          if (faceDetected) autoCapture();
        }, 1500);
      }
    } else {
      setFaceDetected(false);
      setError("No face detected. Please position your face in the frame.");
    }

    // Continue detection loop
    if (isDetecting) {
      requestAnimationFrame(() => detectFace(faceapi));
    }
  };

  const calculateEyeAspectRatio = (eye: any[]) => {
    const vertical1 = distance(eye[1], eye[5]);
    const vertical2 = distance(eye[2], eye[4]);
    const horizontal = distance(eye[0], eye[3]);
    return (vertical1 + vertical2) / (2.0 * horizontal);
  };

  const distance = (p1: any, p2: any) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const autoCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    if (captureLockRef.current) return;
    captureLockRef.current = true;

    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          capturePhoto();
          return null;
        }
        return prev! - 1;
      });
    }, 1000);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) {
      captureLockRef.current = false;
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) {
        captureLockRef.current = false;
        return;
      }

      const newPhotos = {
        ...capturedPhotos,
        [currentPosition.type]: blob,
      };
      setCapturedPhotos(newPhotos);

      // Move to next step or complete
      if (currentStep < FACE_POSITIONS.length - 1) {
        setCurrentStep(currentStep + 1);
        setFaceDetected(false);
        setBlinkDetected(false);
      } else {
        // All photos captured
        setIsDetecting(false);
        stopCamera();
        onComplete({
          front: newPhotos.front!,
          left: newPhotos.left!,
          right: newPhotos.right!,
        });
      }
      captureLockRef.current = false;
    }, "image/jpeg", 0.95);
  };

  const retakePhoto = () => {
    const newPhotos = { ...capturedPhotos };
    delete newPhotos[currentPosition.type as keyof typeof capturedPhotos];
    setCapturedPhotos(newPhotos);
    setFaceDetected(false);
    setBlinkDetected(false);
    setCountdown(null);
    captureLockRef.current = false;
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Face Verification</h2>
          <p className="text-muted-foreground">
            Step {currentStep + 1} of {FACE_POSITIONS.length}:{" "}
            {currentPosition.label}
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 justify-center">
          {FACE_POSITIONS.map((pos, idx) => (
            <div
              key={pos.type}
              className={`h-2 w-20 rounded-full transition-colors ${
                idx < currentStep
                  ? "bg-green-500"
                  : idx === currentStep
                  ? "bg-blue-500"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Camera View */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover mirror"
          />
          
          {/* Face Oval Guide */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`w-64 h-80 border-4 rounded-full transition-colors ${
                faceDetected ? "border-green-500" : "border-white/50"
              }`}
              style={{
                boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>

          {/* Countdown */}
          {countdown && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-8xl font-bold animate-pulse">
                {countdown}
              </div>
            </div>
          )}

          {/* Status Indicators */}
          <div className="absolute top-4 left-4 right-4 space-y-2">
            {faceDetected && (
              <Alert className="bg-green-500/90 text-white border-0">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>Face detected</AlertDescription>
              </Alert>
            )}
            
            {currentPosition.type === "front" && faceDetected && !blinkDetected && (
              <Alert className="bg-blue-500/90 text-white border-0">
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertDescription>Please blink</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {/* Instructions */}
        <Alert>
          <Camera className="h-4 w-4" />
          <AlertDescription className="font-medium">
            {currentPosition.instruction}
          </AlertDescription>
        </Alert>

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {capturedPhotos[currentPosition.type] && (
            <Button onClick={retakePhoto} variant="outline" className="flex-1">
              Retake Photo
            </Button>
          )}
          {onCancel && (
            <Button onClick={onCancel} variant="ghost" className="flex-1">
              Cancel
            </Button>
          )}
        </div>

        {/* Captured Photos Preview */}
        <div className="grid grid-cols-3 gap-3">
          {FACE_POSITIONS.map((pos) => (
            <div
              key={pos.type}
              className={`aspect-square rounded-lg border-2 flex items-center justify-center ${
                capturedPhotos[pos.type]
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              {capturedPhotos[pos.type] ? (
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              ) : (
                <span className="text-sm text-muted-foreground">
                  {pos.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </Card>
  );
}
