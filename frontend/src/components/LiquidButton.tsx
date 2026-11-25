interface LiquidButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export function LiquidButton({
  text,
  onClick,
  className = "",
}: LiquidButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-full border border-white/10 bg-transparent backdrop-blur-lg backdrop-saturate-150
    shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_32px_rgba(0,0,0,0.3)]
    transition duration-300 hover:bg-white/5 hover:border-white/30 active:bg-white/10 ${className}`}
    >
      {text}
    </button>
  );
}

export default LiquidButton;
