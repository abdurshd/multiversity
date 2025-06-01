import React from 'react';

const MultiversityIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central universe */}
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="currentColor"
        opacity="0.9"
      />
      
      {/* Orbiting universes */}
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      
      {/* Intersecting circles representing different timelines */}
      <path
        d="M7 12a5 5 0 1 1 10 0 5 5 0 1 1-10 0"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(45 12 12)"
      />
      <path
        d="M7 12a5 5 0 1 1 10 0 5 5 0 1 1-10 0"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(-45 12 12)"
      />
      
      {/* Small dots representing connection points */}
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="20" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="4" r="1" fill="currentColor" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  );
};

export default MultiversityIcon;
