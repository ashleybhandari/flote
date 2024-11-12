import Wordmark from "@src/components/atoms/Wordmark";

type Props = {
  className?: string;
};

export default function Footer({ className }: Props) {
  return (
    <div className={`py-4 bg-slate-800 text-white ${className}`}>
      <Wordmark className="text-2xl" />
    </div>
  );
}
