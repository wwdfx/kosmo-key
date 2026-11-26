import type { ReactNode } from "react";

interface LiquidButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export function LiquidButton({
  children,
  onClick,
  className = "",
  ariaLabel,
}: LiquidButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`cursor-pointer rounded-full border border-white/10 bg-transparent backdrop-blur-lg backdrop-saturate-150
    shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_32px_rgba(0,0,0,0.3)]
    transition duration-300 hover:bg-white/5 hover:border-white/30 active:bg-white/10 ${className}`}
    >
      {children}
    </button>
  );
}

export default LiquidButton;
