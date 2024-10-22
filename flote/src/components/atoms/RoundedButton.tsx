type Props = {
  fontSize?: string;
  color?: string;
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
};

export default function RoundedButton({
  fontSize = "base",
  color = "primary",
  className,
  onClick,
  children,
}: Props) {
  return (
    <button
      className={`px-12 py-3 text-white rounded-full text-${fontSize} bg-${color} hover:bg-${color}/90 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
