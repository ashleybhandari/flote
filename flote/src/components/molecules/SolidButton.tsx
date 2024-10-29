import RoundedButton from "../atoms/RoundedButton";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function SolidButton({ onClick, children, className }: Props) {
  return (
    <RoundedButton
      className={`text-white bg-primary hover:bg-primary/90 active:bg-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </RoundedButton>
  );
}
