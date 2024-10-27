type Props = {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
};

export default function RoundedButton({ className, onClick, children }: Props) {
  return (
    <button
      className={`px-12 py-3 rounded-full ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
