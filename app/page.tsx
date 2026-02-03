

"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function ValentinesPage() {
  const name = "Garima";

  const [noPos, setNoPos] = useState({ x: 120, y: 300 });
  const [yesScale, setYesScale] = useState(1);
  const [yesClicked, setYesClicked] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Play Music after first tap
  useEffect(() => {
    const play = () => {
      audioRef.current?.play().catch(() => {});
      window.removeEventListener("click", play);
    };
    window.addEventListener("click", play);
    return () => window.removeEventListener("click", play);
  }, []);

  // 📳 Vibrate
  const vibratePhone = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([80, 40, 80]);
    }
  };

  // 🏃 NO Button Move
  const moveNo = () => {
    vibratePhone();
    setNoPos({
      x: Math.random() * (window.innerWidth - 120),
      y: Math.random() * (window.innerHeight - 60),
    });
    setYesScale((p) => p + 0.12);
  };

  // 🎆 Fireworks
  const fireWorks = () => {
    const end = Date.now() + 2000;
    const frame = () => {
      confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 } });
      confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  // 🎉 YES
  const handleYes = () => {
    setYesClicked(true);
    confetti({ particleCount: 200, spread: 120 });
    fireWorks();
  };

  // ✨ Spark Trail
  useEffect(() => {
    const spark = (e: any) => {
      const s = document.createElement("div");
      s.className = "spark";
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    };
    window.addEventListener("mousemove", spark);
    window.addEventListener("touchmove", (e) => spark(e.touches[0]));
    return () => window.removeEventListener("mousemove", spark);
  }, []);

  return (
    <div className="wrapper">
      {/* 🎵 MUSIC */}
      {/* <audio ref={audioRef} loop>
        <source src="/love.mp3" />
      </audio> */}

      {!yesClicked ? (
        <div className="card">
          <Heart className="heart" fill="red" />
          <h1>Will you be my Valentine, {name}? 💖</h1>

          <div className="buttons">
            <button
              className="yesBtn"
              style={{ transform: `scale(${yesScale})` }}
              onClick={handleYes}
            >
              YES 💖
            </button>

            <button
              className="noBtn"
              style={{ left: noPos.x, top: noPos.y }}
              onMouseEnter={moveNo}
              onTouchStart={moveNo}
              onClick={moveNo}
            >
              NO 😈
            </button>
          </div>
        </div>
      ) : (
        <div className="success">
          <Sparkles size={80} color="gold" />
          <h1>Yaaaay Garima!!! 💕</h1>

          <p className="loveMsg">
            You make my world brighter, my heart happier and my life more
            beautiful ❤️ Will you stay with me forever? 💍
          </p>

          {/* ❤️ HEART RAIN */}
          <div className="rain">
            {Array.from({ length: 120 }).map((_, i) => (
              <span key={i}>❤️</span>
            ))}
          </div>

          {/* 🖼️ FIXED MEMORY IMAGE */}
          <video
  className="memoryVideo"
  src="https://res.cloudinary.com/dyq4v1f6y/video/upload/v1770096535/WhatsApp_Video_2026-02-03_at_10.35.51_njhqrd.mp4"
  autoPlay
  loop
  // muted
  playsInline
/>
        </div>
      )}
    </div>
  );
}
