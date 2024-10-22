type Props = {
  className?: string;
  onClick?: () => void;
};

export default function Logo({ className, onClick }: Props) {
  return (
    <h1
      className={`font-header font-bold text-white text-center ${className}`}
      onClick={onClick}
    >
      <span className={onClick ? "cursor-pointer" : ""}>flotE</span>
    </h1>
  );
}
