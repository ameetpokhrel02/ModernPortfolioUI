"use client";

import React, { useEffect, useState } from "react";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiGithub,
  SiDocker,
  SiHtml5,
  SiCss3,
  SiJavascript,
} from "react-icons/si";

const innerSkills = [
  { Icon: SiHtml5, label: "HTML5", color: "#E34F26" },
  { Icon: SiCss3, label: "CSS3", color: "#1572B6" },
  { Icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
];

const outerSkills = [
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { Icon: SiPython, label: "Python", color: "#3776AB" },
  { Icon: SiGithub, label: "GitHub", to: "#181717" },
  { Icon: SiDocker, label: "Docker", color: "#2496ED" },
];

export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth orbiting animation
  useEffect(() => {
    if (isHovered) return;
    let last = performance.now();
    const tick = (now: number) => {
      setTime((prev) => prev + (now - last) / 1000);
      last = now;
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isHovered]);

  const renderOrbit = (skills: any[], radius: number, speed: number, size = 60) => {
    return skills.map((skill, i) => {
      const angle = (i * 2 * Math.PI) / skills.length + time * speed;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      return (
        <div
          key={skill.label}
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
          }}
        >
          {/* THIS IS THE MAGIC GROUP — makes tooltip work */}
          <div className="group relative">
            {/* Icon */}
            <div
              className="rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl flex items-center justify-center transition-all duration-500 hover:scale-150 hover:shadow-2xl hover:z-50 cursor-pointer"
              style={{ width: size, height: size }}
            >
              <skill.Icon className="w-9 h-9 md:w-10 md:h-10 drop-shadow-md" style={{ color: skill.color }} />
            </div>

            {/* Tooltip — appears on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
              <div className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-lg shadow-2xl whitespace-nowrap border border-gray-700 dark:border-gray-300">
                {skill.label}
              </div>
              {/* Arrow pointing down */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-gray-900 dark:border-t-white" />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="relative w-full aspect-square max-w-lg mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Full hover area */}
      <div className="absolute inset-0 z-40" />

      {/* Background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />

      {/* Orbit rings */}
      <div className="absolute inset-8 rounded-full border border-blue-400/20 dark:border-purple-400/20" />
      <div className="absolute inset-20 rounded-full border border-purple-400/30 dark:border-purple-400/30" />

      {/* Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl">
          <span className="text-4xl font-bold text-white">{"</>"}</span>
        </div>
      </div>

      {renderOrbit(innerSkills, 100, 0.5, 56)}
      {renderOrbit(outerSkills, 180, -0.35, 60)}
    </div>
  );
}