"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMood } from "@/hooks/useMood";
import { Mood } from "@/types";

const emotionToMoodMap: Record<string, Mood> = {
  happy: "happy",
  sad: "sad",
  angry: "stressed",
  fearful: "stressed",
  disgusted: "sad",
  surprised: "excited",
  neutral: "calm"
};

const emotionEmojis: Record<string, string> = {
  happy: "😊",
  sad: "😔",
  angry: "😠",
  fearful: "😨",
  disgusted: "🤢",
  surprised: "😲",
  neutral: "😐"
};

const moodEmojis: Record<Mood, string> = {
  stressed: "😰",
  happy: "😊",
  sad: "😔",
  calm: "😌",
  focused: "🎯",
  excited: "🤩"
};

export default function EmotionDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setMood } = useMood();
  const router = useRouter();

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let modelsScript: HTMLScriptElement | null = null;

    const initializeCamera = async () => {
      try {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(err => console.error("Play error:", err));
          };
        }

        // Load face-api.js library and models
        if (!window.faceapi) {
          script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
          script.async = true;
          
          script.onload = async () => {
            try {
              // Load the models from local public/models
              const MODEL_URL = "/models";
              
              await Promise.all([
                window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                window.faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
              ]);
              
              setModelsLoaded(true);
              setIsLoading(false);
            } catch (err) {
              console.error("Error loading models:", err);
              setError("Failed to load detection models. Please refresh and try again.");
              setIsLoading(false);
            }
          };
          
          script.onerror = () => {
            setError("Failed to load detection library. Please check your internet connection.");
            setIsLoading(false);
          };
          
          document.head.appendChild(script);
        } else {
          // faceapi already loaded, just load models
          try {
            const MODEL_URL = "/models";
            
            await Promise.all([
              window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
              window.faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
            ]);
            setModelsLoaded(true);
            setIsLoading(false);
          } catch (err) {
            setError("Failed to load detection models. Make sure /public/models contains the face-api weights.");
            setIsLoading(false);
          }
        }
      } catch (err: any) {
        console.error("Camera error:", err);
        setError(`Unable to access camera: ${err.message || "Check permissions"}`);
        setIsLoading(false);
      }
    };

    initializeCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
      if (modelsScript && document.head.contains(modelsScript)) {
        document.head.removeChild(modelsScript);
      }
    };
  }, []);

  const detectEmotion = async () => {
    if (!videoRef.current || !window.faceapi || !modelsLoaded) {
      setError("Detection model not ready. Please wait...");
      return;
    }

    setIsDetecting(true);
    setError(null);
    
    try {
      const detections = await window.faceapi
        .detectAllFaces(videoRef.current, new window.faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions as Record<string, number>;
        let topEmotion: [string, number] = ["neutral", 0];

        for (const entry of Object.entries(expressions) as Array<[string, number]>) {
          if (entry[1] > topEmotion[1]) {
            topEmotion = entry;
          }
        }

        setDetectedEmotion(topEmotion[0]);
        setConfidence(Math.round(topEmotion[1] * 100));
      } else {
        setError("No face detected. Please ensure your face is visible in the camera.");
      }
    } catch (err: any) {
      console.error("Detection error:", err);
      setError(`Detection error: ${err.message || "Please try again"}`);
    }
    setIsDetecting(false);
  };

  const applyDetectedMood = () => {
    if (!detectedEmotion) return;

    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }

    const mood = emotionToMoodMap[detectedEmotion] || "calm";
    setMood(mood);
    router.push("/");
  };

  const detectedMood = detectedEmotion ? emotionToMoodMap[detectedEmotion] || "calm" : null;

  if (error && !isLoading && !modelsLoaded) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-10">
        <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-xl font-semibold text-red-700">{error}</h2>
          <p className="mt-2 text-sm text-red-600">
            You can still choose your mood manually
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-3 text-center text-4xl font-semibold">
        What's your mood right now?
      </h1>
      <p className="mb-8 text-center text-base text-slate-500">
        Let us detect your emotion using your camera
      </p>

      <div className="space-y-6">
        {/* Camera Feed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl bg-gray-900"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="aspect-square w-full object-cover"
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center text-white">
                <div className="mb-4 text-4xl">📹</div>
                <p className="text-lg font-semibold">Loading camera and models...</p>
                <p className="mt-2 text-sm opacity-75">This may take a moment</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Status Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4 text-center text-sm text-yellow-800"
          >
            {error}
          </motion.div>
        )}

        {/* Detected Emotion */}
        {detectedEmotion && detectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 border-green-200 bg-green-50 p-6 text-center"
          >
            <div className="mb-3 text-6xl">
              {moodEmojis[detectedMood]}
            </div>
            <p className="text-lg font-semibold capitalize text-green-700">Detected mood: {detectedMood}</p>
            <p className="mt-2 text-sm text-green-600">
              Confidence: {confidence}%
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={detectEmotion}
            disabled={isLoading || isDetecting || !modelsLoaded}
            className="flex-1 rounded-xl border-2 border-blue-500 bg-blue-500 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDetecting ? "Detecting..." : isLoading ? "Loading..." : "Detect Emotion"}
          </motion.button>

          {detectedEmotion && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={applyDetectedMood}
              className="flex-1 rounded-xl border-2 border-green-500 bg-green-500 px-6 py-3 font-semibold text-white transition-all hover:bg-green-600"
            >
              Apply & Get Recipes
            </motion.button>
          )}
        </div>

        {/* Fallback to Manual Selection */}
        <div className="mt-8 border-t pt-6 text-center">
          <p className="mb-4 text-sm text-gray-600">
            Or choose your mood manually
          </p>
          <motion.a
            whileHover={{ scale: 1.02 }}
            href="/"
            className="inline-block rounded-xl border-2 border-gray-300 px-6 py-2 font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
          >
            Go Back to Mood Picker
          </motion.a>
        </div>
      </div>
    </section>
  );
}
