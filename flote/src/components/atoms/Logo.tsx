type Props = {
  fontSizePx: string;
  className?: string;
  onClick?: () => void;
};

export default function Logo({ fontSizePx, className, onClick }: Props) {
  return (
    <h1
      className={`font-header font-bold text-white text-center text-[${fontSizePx}px] ${className}`}
      onClick={onClick}
    >
      <span className={onClick ? 'cursor-pointer' : ''}>flotE</span>
    </h1>
  );
}
