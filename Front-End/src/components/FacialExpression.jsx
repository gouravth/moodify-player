import React, { useEffect, useRef, useState } from 'react';
import "./facialExpression.css";
import * as faceapi from 'face-api.js';
import axios from 'axios';

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    setModelsLoaded(true);
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 } }
    }).then((stream) => {
      videoRef.current.srcObject = stream;
    }).catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood() {
    if (!modelsLoaded) {
      console.log("Models not loaded yet");
      return;
    }

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    // find most probable expression
    let mostProbable = 0;
    let _expression = '';
    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProbable) {
        mostProbable = detections[0].expressions[expression];
        _expression = expression;
      }
    }

    console.log("Detected mood:", _expression);

    try {
      const res = await axios.get(`http://localhost:3000/songs?mood=${_expression}`);
      console.log("Songs response:", res.data);
      setSongs(res.data.Songs || res.data.songs || res.data || []);
    } catch (err) {
      console.error("Error fetching songs:", err);
    }
  }

  useEffect(() => {
    loadModels().then(startVideo);

    return () => {
      // stop webcam on unmount
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className='mood-element'>
      <video
        ref={videoRef}
        autoPlay
        muted
        className='user-video-feed'
      />
      <button onClick={detectMood} disabled={!modelsLoaded}>
        {modelsLoaded ? "Detect Mood" : "Loading Models..."}
      </button>
    </div>
  );
}
