"use client";

import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypeAnimationStudent = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Students are the architects of tomorrow's world.",
        "Students are the torchbearers of knowledge and innovation.",
        "Students are the seeds of change in society.",
        "Students are the canvas on which the future is painted.",
        "Students are the dreamers who shape our future reality.",
      ],
      typeSpeed: 50,
      backSpeed: 20,
      loop: true,
      showCursor: true,
    };

    // Initialize Typed.js with the options
    const typed = new Typed(typedRef.current, options);

    // Clean up and destroy the Typed instance when the component unmounts
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div>
      <span
        ref={typedRef}
        className="text-2xl font-bold md:font-extrabold md:text-4xl"
      ></span>
    </div>
  );
};

export default TypeAnimationStudent;
