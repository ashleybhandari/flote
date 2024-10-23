type Props = {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
};

export default function RoundedButton({ className, onClick, children }: Props) {
  return (
    <button
      className={`px-12 py-3 text-white rounded-full bg-primary hover:bg-primary/90 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
