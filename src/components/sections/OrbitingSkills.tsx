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
  { Icon: SiGithub, label: "GitHub", color: "#181717" },
  { Icon: SiDocker, label: "Docker", color: "#2496ED" },
];

export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    let last = performance.now();
    const animate = (now: number) => {
      setTime((prev) => prev + (now - last) / 1000);
      last = now;
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [isHovered]);

  const renderOrbit = (skills: any[], radius: number, speed: number, size = 60) => {
    return skills.map((skill, i) => {
      const angle = (i * 2 * Math.PI) / skills.length + time * speed;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      return (
        <div
          key={i}
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
          }}
        >
          <div className="group relative">
            <div
              className="rounded-2xl bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-white/50 shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-150 group-hover:shadow-2xl group-hover:z-50"
              style={{ width: size, height: size }}
            >
              <skill.Icon className="w-9 h-9 md:w-10 md:h-10" style={{ color: skill.color }} />
            </div>
            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="px-3 py-1.5 bg-gray-900/95 text-white text-xs font-medium rounded-lg shadow-xl backdrop-blur-sm border border-gray-700 whitespace-nowrap">
                {skill.label}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
    {/* THIS IS THE MAGIC HITBOX — covers everything */}
    <div
      className="absolute inset-0 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />

      {/* Orbit Rings */}
      <div className="absolute inset-8 rounded-full border border-blue-400/20 shadow-2xl shadow-blue-500/10" />
      <div className="absolute inset-20 rounded-full border border-purple-400/30 shadow-2xl shadow-purple-500/10" />

      {/* Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl">
          <span className="text-4xl font-bold text-white">{"</>"}</span>
        </div>
      </div>

      {/* Inner Orbit (3 icons) */}
      {renderOrbit(innerSkills, 100, 0.5, 56)}

      {/* Outer Orbit (7 icons) — PERFECTLY EVEN */}
      {renderOrbit(outerSkills, 180, -0.35, 60)}
    </div>
  );
}