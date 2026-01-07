"use client";

import { SKILL_ICONS } from "@/lib/skill-icons";
import DomeGallery from "@/components/ui/DomeGallery";

const skillIcons = [
  <div className="w-full h-full flex items-center justify-center text-[#FF5733]">
    {SKILL_ICONS.HTML}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-[#264DE4]">
    {SKILL_ICONS.CSS}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-[#F7DF1E]">
    {SKILL_ICONS.JavaScript}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-[#61DAFB]">
    {SKILL_ICONS.React}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-[#B794F4]">
    {SKILL_ICONS.Redux}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-[#3178C6]">
    {SKILL_ICONS.TypeScript}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-white">
    {SKILL_ICONS.NextJS}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-[#06B6D4]">
    {SKILL_ICONS.Tailwind}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-white">
    {SKILL_ICONS.Shadcn}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-[#88CE02]">
    {SKILL_ICONS.GSAP}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-white">
    {SKILL_ICONS.ThreeJS}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-[#9FEAF9]">
    {SKILL_ICONS.Electron}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-[#F24E1E]">
    {SKILL_ICONS.Figma}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-[#FF6C37]">
    {SKILL_ICONS.Postman}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-[#2684FF]">
    {SKILL_ICONS.Jira}
  </div>,
  <div className="w-full h-full flex items-center justify-center text-white">
    {SKILL_ICONS.GitHub}
  </div>,
];


export default function Skills() {
  return (
    <section id="skills" className="relative bg-[#050505] overflow-hidden h-screen flex flex-col">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="w-full h-full relative z-10 flex flex-col">
        <div className="px-6 pt-20 pb-8 flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-px w-16 bg-white/20 hidden md:block" />
          <h2 className="text-4xl md:text-5xl font-bold font-display tracking-widest text-white uppercase">
            TECHNICAL <span className="text-white/30 font-light">SKILLS</span>
          </h2>
        </div>

        <div className="w-full flex-1 px-6 pb-6">
          <DomeGallery
            images={skillIcons}
            fit={0.6}
            minRadius={400}
            maxRadius={1400}
            overlayBlurColor="#050505"
            maxVerticalRotationDeg={10}
            dragSensitivity={15}
            segments={35}
            dragDampening={1.5}
            imageBorderRadius="20px"
            grayscale={false}
          />
        </div>
      </div>
    </section>
  );
    }
