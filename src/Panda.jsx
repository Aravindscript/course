
import React, { useEffect, useRef, useState } from "react";
import "./style.css";

export default function Panda({
  usernameFocused = false,
  passwordFocused = false,
  showPassword = false,
  usernameValue = "",
}) {
  const pandaRef = useRef(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  // Mouse movement
  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!pandaRef.current || usernameFocused || passwordFocused) return;

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
  }, [usernameFocused, passwordFocused]);

  // Username cursor tracking
  useEffect(() => {
    if (!usernameFocused) return;

    const updateUsernameGaze = () => {
      const input = document.activeElement;

      if (!input || typeof input.selectionStart !== "number") return;

      const cursor = input.selectionStart;
      const text = input.value.substring(0, cursor);

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) return;

      const styles = window.getComputedStyle(input);
      context.font = styles.font;

      const textWidth = context.measureText(text).width;
      const availableWidth = input.clientWidth || 1;

      const caretX =
        textWidth -
        (input.scrollLeft || 0) +
        parseFloat(styles.paddingLeft || 0);

      const normalizedX = (caretX / availableWidth - 0.5) * 10;

      setPupilPosition({
        x: Math.max(-5, Math.min(5, normalizedX)),
        y: 3,
      });
    };

    updateUsernameGaze();
  }, [usernameFocused, usernameValue]);

  // Eye states
  const eyeClass = passwordFocused
    ? showPassword
      ? "sp-panda-wink"
      : "sp-panda-closed"
    : "";

  const eyeX = usernameFocused ? pupilPosition.x : pupilPosition.x;
  const eyeY = usernameFocused
    ? pupilPosition.y
    : passwordFocused && showPassword
    ? 4
    : pupilPosition.y;

  return (
    <div className="sp-panda-wrapper" ref={pandaRef}>
      <div className={`sp-panda ${eyeClass}`}>

        {/* Ears */}
        <div className="sp-panda-ear sp-panda-ear-left" />
        <div className="sp-panda-ear sp-panda-ear-right" />

        {/* Face */}
        <div className="sp-panda-face">

          {/* Left Eye */}
          <div className="sp-panda-patch sp-panda-patch-left">
            <div className="sp-panda-eye">
              <div
                className="sp-panda-pupil"
                style={{
                  transform: `translate(${eyeX}px, ${eyeY}px)`,
                }}
              />
            </div>
            <div className="sp-panda-eyelid" />
          </div>

          {/* Right Eye */}
          <div className="sp-panda-patch sp-panda-patch-right">
            <div className="sp-panda-eye">
              <div
                className="sp-panda-pupil"
                style={{
                  transform: `translate(${eyeX}px, ${eyeY}px)`,
                }}
              />
            </div>
            <div className="sp-panda-eyelid" />
          </div>

          {/* Nose */}
          <div className="sp-panda-nose" />

          {/* Mouth */}
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
