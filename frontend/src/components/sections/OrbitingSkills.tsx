"use client";

import { useEffect, useState } from "react";
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
  SiAmazon,
  SiPytorch,
  SiOpenai,
} from "react-icons/si";

const innerSkills = [
  { Icon: SiHtml5, label: "HTML5", color: "#E34F26" },
  { Icon: SiCss3, label: "CSS3", color: "#1572B6" },
  { Icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  { Icon: SiOpenai, label: "OpenAI", color: "#412991" },
];

const middleSkills = [
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { Icon: SiPython, label: "Python", color: "#3776AB" },
  { Icon: SiDocker, label: "Docker", color: "#2496ED" },
];

const outerSkills = [
  { Icon: SiAmazon, label: "AWS", color: "#FF9900" },

  { Icon: SiPytorch, label: "PyTorch", color: "#EE4C2C" },
  { Icon: SiGithub, label: "GitHub", color: "#181717" },
];

export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  // Smooth orbiting animation
  useEffect(() => {
    if (isHovered) return;
    let last = performance.now();
    let id: number | null = null;
    const tick = (now: number) => {
      setTime((prev) => prev + (now - last) / 1000);
      last = now;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => {
      if (id !== null) cancelAnimationFrame(id);
    };
  }, [isHovered]);

  const renderOrbit = (skills: any[], radius: number, speed: number, size = 60, glowColor?: string) => {
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
            {/* Icon with enhanced glow effect */}
            <div
              role="button"
              tabIndex={0}
              aria-label={skill.label}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
              className="rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl flex items-center justify-center transition-all duration-500 hover:scale-150 hover:shadow-2xl hover:z-50 cursor-pointer relative overflow-hidden"
              style={{
                width: size,
                height: size,
                boxShadow: glowColor ? `0 0 20px ${glowColor}20, 0 0 40px ${glowColor}10` : undefined
              }}
            >
              {/* Animated background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle, ${skill.color}40 0%, transparent 70%)`
                }}
              />

              {/* Pulsing ring animation for AI/AWS skills */}
              {(skill.label.includes('AI') || skill.label.includes('AWS') || skill.label.includes('TensorFlow') || skill.label.includes('PyTorch') || skill.label.includes('OpenAI')) && (
                <div
                  className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 animate-ping"
                  style={{ borderColor: skill.color }}
                />
              )}

              <skill.Icon
                className="w-9 h-9 md:w-10 md:h-10 drop-shadow-md transition-all duration-300 group-hover:scale-110 relative z-10"
                style={{ color: skill.color }}
              />
            </div>

            {/* Enhanced Tooltip with category badges */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 pointer-events-none z-50 transform group-hover:scale-105">
              <div className="px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-lg shadow-2xl whitespace-nowrap border border-gray-700 dark:border-gray-300 relative">
                <div className="flex items-center gap-2">
                  <span>{skill.label}</span>
                  {/* Category badges */}
                  {skill.label.includes('AWS') && (
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">Cloud</span>
                  )}
                  {(skill.label.includes('TensorFlow') || skill.label.includes('PyTorch') || skill.label.includes('OpenAI')) && (
                    <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">AI/ML</span>
                  )}
                </div>
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
      {/* Full hover area (pointer-events-none so icons receive hover events) */}
      <div className="absolute inset-0 z-40 pointer-events-none" />

      {/* Enhanced background glow with multiple layers */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl animate-pulse" />
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-500/5 via-green-500/5 to-blue-500/5 blur-2xl" />

      {/* Enhanced orbit rings with glow */}
      <div className="absolute inset-6 rounded-full border border-blue-400/30 dark:border-purple-400/30 shadow-lg" style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)' }} />
      <div className="absolute inset-16 rounded-full border border-purple-400/40 dark:border-purple-400/40 shadow-lg" style={{ boxShadow: '0 0 15px rgba(147, 51, 234, 0.1)' }} />
      <div className="absolute inset-28 rounded-full border border-orange-400/30 dark:border-orange-400/30 shadow-lg" style={{ boxShadow: '0 0 10px rgba(251, 146, 60, 0.1)' }} />

      {/* Enhanced Center with AI/Cloud theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 flex items-center justify-center shadow-2xl relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-orange-400/20 animate-spin-slow" />
          <span className="text-4xl font-bold text-white relative z-10 drop-shadow-lg">{"</>"}</span>
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
        </div>
      </div>

      {/* Three orbits with different speeds and effects */}
      {renderOrbit(innerSkills, 80, 0.6, 52, '#8B5CF6')}
      {renderOrbit(middleSkills, 140, -0.4, 58, '#3B82F6')}
      {renderOrbit(outerSkills, 200, 0.25, 64, '#F59E0B')}
    </div>
  );
}