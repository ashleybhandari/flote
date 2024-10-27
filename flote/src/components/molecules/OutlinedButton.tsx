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
      className={`text-secondary border-solid border-2 border-secondary hover:bg-secondary/20 active:bg-secondary/30 ${className}`}
      onClick={onClick}
    >
      {children}
    </RoundedButton>
  );
}
