"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Shows",
    href: "#upcoming-shows",
    description: "[0]",
  },
  {
    name: "Événements passés",
    href: "#evenements-passes",
    description: "[1]",
  },
  {
    name: "About",
    href: "#macha-de-ruyver",
    description: "[2]",
  },
];

export const AnimatedNav = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <ul className="flex items-center justify-center gap-8 md:gap-12">
      {navigationItems.map((item, index) => (
        <li
          className="relative flex cursor-pointer items-center overflow-visible"
          key={index}
          onClick={() => handleNavClick(item.href)}
        >
          <div className="relative flex items-start">
            <TextRoll
              center
              className="text-lg md:text-xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors"
              style={{ color: '#ffda65' }}
            >
              {item.name}
            </TextRoll>
          </div>
        </li>
      ))}
    </ul>
  );
};

const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
  style?: React.CSSProperties;
}> = ({ children, className, center = false, style }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{
        lineHeight: 0.75,
        color: style?.color || '#ffda65',
      }}
    >
      <div style={{ color: style?.color || '#ffda65' }}>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              style={{ color: style?.color || '#ffda65' }}
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0" style={{ color: style?.color || '#ffda65' }}>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              style={{ color: style?.color || '#ffda65' }}
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export { TextRoll };

