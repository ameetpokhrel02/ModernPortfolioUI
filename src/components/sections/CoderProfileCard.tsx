"use client";

import React from "react";
import { Button } from '@/components/ui/button'

const DotIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="4" fill="currentColor" />
  </svg>
);

const coderData = {
  name: 'Zane Whitaker',
  role: 'Frontend Developer',
  seniority: 'Mid-Level',
  location: 'Bangladesh',
  skills: [
    'React', 'Next.js', 'JavaScript', 'TypeScript',
    'TailwindCSS', 'CSS', 'Figma', 'GitHub', 'HTML',
    'Astro', 'Node.js', 'Express', 'MongoDB', 'Firebase',
    'Git'
  ],
};

export const CoderProfileCard: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-[#000000] dark:to-[#0a0d37] border border-zinc-300 dark:border-[#1b2c68a0] relative rounded-lg shadow-lg">

      <div className="flex flex-row">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>

      <div className="px-4 lg:px-6 py-4 flex justify-between items-center bg-zinc-200 dark:bg-[#000000] rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-orange-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="text-xs text-zinc-600 dark:text-gray-400 font-mono">coder.js</div>
      </div>

      <div className="overflow-hidden border-t-[2px] border-zinc-300 dark:border-indigo-900 px-4 lg:px-6 py-4 lg:py-6 relative">
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-blue-600 rounded-full opacity-8 filter blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-pink-600 rounded-full opacity-8 filter blur-3xl" />

        <div className="relative flex">
          <div className="hidden md:flex flex-col items-end pr-3 text-zinc-600 dark:text-gray-500 font-mono text-xs">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="leading-relaxed select-none opacity-70">{i + 1}</div>
            ))}
          </div>

          <code className="font-mono text-xs md:text-sm lg:text-sm w-full">
            <div>
              <span className="mr-2 text-pink-500 dark:text-pink-400">const</span>
              <span className="mr-2 text-violet-500 dark:text-violet-400">coder</span>
              <span className="mr-2 text-pink-500 dark:text-pink-400">=</span>
              <span className="text-zinc-600 dark:text-gray-400">{'{'}</span>
            </div>
            <div className="pl-5">
              <span className="text-zinc-800 dark:text-white">name:</span>
              <span className="text-zinc-600 dark:text-gray-400">' </span>
              <span className="text-green-600 dark:text-green-400">{coderData.name}</span>
              <span className="text-zinc-600 dark:text-gray-400">',</span>
            </div>
            <div className="pl-5">
              <span className="text-zinc-800 dark:text-white">role:</span>
              <span className="text-zinc-600 dark:text-gray-400">' </span>
              <span className="text-green-600 dark:text-green-400">{coderData.role}</span>
              <span className="text-zinc-600 dark:text-gray-400">',</span>
            </div>
            <div className="pl-5">
              <span className="text-zinc-800 dark:text-white">seniority:</span>
              <span className="text-zinc-600 dark:text-gray-400">' </span>
              <span className="text-green-600 dark:text-green-400">{coderData.seniority}</span>
              <span className="text-zinc-600 dark:text-gray-400">',</span>
            </div>
            <div className="pl-5">
              <span className="text-zinc-800 dark:text-white">location:</span>
              <span className="text-zinc-600 dark:text-gray-400">' </span>
              <span className="text-green-600 dark:text-green-400">{coderData.location}</span>
              <span className="text-zinc-600 dark:text-gray-400">',</span>
            </div>
            <div className="pl-5">
              <span className="text-zinc-800 dark:text-white">skills:</span>
              <span className="text-zinc-600 dark:text-gray-400">[</span>
              <div className="pl-4 flex flex-wrap">
                {coderData.skills.map((skill, index) => (
                  <span key={skill} className="mr-1">
                    <span className="text-zinc-600 dark:text-gray-400">'</span>
                    <span className="text-cyan-600 dark:text-cyan-400">{skill}</span>
                    <span className="text-zinc-600 dark:text-gray-400">'</span>
                    {index < coderData.skills.length - 1 && <span className="text-zinc-600 dark:text-gray-400">, </span>}
                  </span>
                ))}
              </div>
              <span className="text-zinc-600 dark:text-gray-400">],</span>
            </div>
            <div>
              <span className="text-zinc-600 dark:text-gray-400">};</span>
            </div>
          </code>
        </div>
      </div>

      <div className="px-4 lg:px-6 pb-4 mt-3 border-t border-zinc-300 dark:border-gray-800 pt-3 text-xs text-zinc-600 dark:text-gray-500 flex justify-between items-center">
        <span>UTF-8</span>
        <span>JavaScript</span>
        <span>Ln 12, Col 2</span>
      </div>

      <div className="p-4 flex justify-center">
        <Button asChild variant="secondary" size="sm">
          <a href="#contact" className="w-full text-center">Contact Me</a>
        </Button>
      </div>
    </div>
  );
};

export default CoderProfileCard;
