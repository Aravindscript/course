import React, { useEffect, useRef, useState } from "react";
import "./style.css";

export default function Panda({
  usernameFocused = false,
  passwordFocused = false,
  showPassword = false,
}) {
  const pandaRef = useRef(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!pandaRef.current) return;

      const rect = pandaRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (event.clientX - centerX) / 25;
      const dy = (event.clientY - centerY) / 25;

      setPupilPosition({
        x: Math.max(-5, Math.min(5, dx)),
        y: Math.max(-4, Math.min(4, dy)),
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const eyeClass = passwordFocused
    ? showPassword
      ? "sp-panda-wink"
      : "sp-panda-closed"
    : "";

  return (
    <div className="sp-panda-wrapper" ref={pandaRef}>
      <div
        className={`sp-panda ${eyeClass} ${
          usernameFocused ? "sp-panda-username" : ""
        }`}
      >
        {/* Ears */}
        <div className="sp-panda-ear sp-panda-ear-left" />
        <div className="sp-panda-ear sp-panda-ear-right" />

        {/* Face */}
        <div className="sp-panda-face">
          {/* Eye patches */}
          <div className="sp-panda-patch sp-panda-patch-left">
            <div className="sp-panda-eye">
              <div
                className="sp-panda-pupil"
                style={{
                  transform: `translate(${usernameFocused ? 4 : pupilPosition.x}px, ${
                    usernameFocused ? 0 : pupilPosition.y
                  }px)`,
                }}
              />
            </div>
            <div className="sp-panda-eyelid" />
          </div>

          <div className="sp-panda-patch sp-panda-patch-right">
            <div className="sp-panda-eye">
              <div
                className="sp-panda-pupil"
                style={{
                  transform: `translate(${usernameFocused ? 4 : pupilPosition.x}px, ${
                    usernameFocused ? 0 : pupilPosition.y
                  }px)`,
                }}
              />
            </div>
            <div className="sp-panda-eyelid" />
          </div>

          {/* Nose and mouth */}
          <div className="sp-panda-nose" />
          <div className="sp-panda-mouth">
            <span />
            <span />
          </div>

          {/* Cheeks */}
          <div className="sp-panda-cheek sp-panda-cheek-left" />
          <div className="sp-panda-cheek sp-panda-cheek-right" />
        </div>

        {/* Body */}
        <div className="sp-panda-body">
          <div className="sp-panda-belly" />
        </div>

        {/* Arms */}
        <div className="sp-panda-arm sp-panda-arm-left" />
        <div className="sp-panda-arm sp-panda-arm-right" />
      </div>
    </div>
  );
}