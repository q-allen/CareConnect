"use client";

import { useState } from "react";
import AutoCaptureFaceVerification from "@/components/doctor/AutoCaptureFaceVerification";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function DoctorOnboardingStep6() {
  const [showCamera, setShowCamera] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFaceVerificationComplete = async (photos: {
    front: Blob;
    left: Blob;
    right: Blob;
  }) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("face_front", photos.front, "face_front.jpg");
      formData.append("face_left", photos.left, "face_left.jpg");
      formData.append("face_right", photos.right, "face_right.jpg");

      const response = await fetch("/api/doctors/me/complete/", {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.face_verification || "Face verification failed"
        );
      }

      const data = await response.json();
      
      if (data.is_face_verified) {
        setIsVerified(true);
        setShowCamera(false);
        toast.success("Face verification successful!");
      } else {
        throw new Error("Face verification failed. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to verify face photos");
      setShowCamera(false);
    } finally {
      setIsUploading(false);
    }
  };

  if (showCamera) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <AutoCaptureFaceVerification
          onComplete={handleFaceVerificationComplete}
          onCancel={() => setShowCamera(false)}
        />
        
        {isUploading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
              <p className="font-medium">Verifying your photos...</p>
              <p className="text-sm text-muted-foreground mt-2">
                This may take a few seconds
              </p>
            </Card>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="p-8">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            {isVerified ? (
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            ) : (
              <svg
                className="h-10 w-10 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Face Verification</h2>
            <p className="text-muted-foreground">
              {isVerified
                ? "Your identity has been verified successfully!"
                : "We need to verify your identity for security purposes"}
            </p>
          </div>

          {!isVerified && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-blue-900 mb-2">
                  What to expect:
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>
                      We'll capture 3 photos: front view and both side profiles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>
                      The camera will automatically take photos when you're
                      properly positioned
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>
                      For the front view, you'll need to blink to prove you're a
                      real person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>
                      Make sure you're in a well-lit area with no one else in the
                      frame
                    </span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => setShowCamera(true)}
                size="lg"
                className="w-full"
              >
                Start Face Verification
              </Button>
            </>
          )}

          {isVerified && (
            <Button size="lg" className="w-full">
              Continue to Next Step
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
