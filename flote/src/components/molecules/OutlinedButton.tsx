import RoundedButton from "../atoms/RoundedButton";

type Props = {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
};

export default function OutlinedButton({
  className,
  onClick,
  children,
}: Props) {
  return (
    <RoundedButton
      className={`text-white border-solid border-2 border-white hover:bg-white/10 active:bg-white/20 ${className}`}
      onClick={onClick}
    >
      {children}
    </RoundedButton>
  );
}
