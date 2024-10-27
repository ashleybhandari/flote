import RoundedButton from "../atoms/RoundedButton"

type Props = {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
};

export default function SolidButton({ className, onClick, children }: Props) {
  return (
    <RoundedButton
      className={`text-white bg-primary hover:bg-primary/90 active:bg-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </RoundedButton>
  );
}
