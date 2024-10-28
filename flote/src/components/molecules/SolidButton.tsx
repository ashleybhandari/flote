import RoundedButton from "../atoms/RoundedButton";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  bgClasses?: string;
  className?: string;
};

export default function SolidButton({
  onClick,
  children,
  bgClasses,
  className,
}: Props) {
  return (
    <RoundedButton
      className={`text-white ${
        bgClasses ?? "bg-primary hover:bg-primary/90 active:bg-primary"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </RoundedButton>
  );
}
