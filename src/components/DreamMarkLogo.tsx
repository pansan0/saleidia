import React from 'react';

interface DreamMarkLogoProps {
  className?: string;
  showText?: boolean;
}

export function DreamMarkLogo({ className = "", showText = true }: DreamMarkLogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        {/* Dream cloud with lightbulb */}
        <div className="w-8 h-8 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] rounded-full flex items-center justify-center relative">
          {/* Lightbulb icon */}
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
            <path fill="currentColor" 
                  d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7zM9 21v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/>
          </svg>
          {/* Digital spark */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFD369] rounded-full animate-pulse"></div>
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] bg-clip-text text-transparent">
            DreaMark
          </h1>
          <p className="text-xs text-muted-foreground -mt-1">Turn Dreams Into Market</p>
        </div>
      )}
    </div>
  );
}