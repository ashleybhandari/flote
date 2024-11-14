type Props = {
  className?: string;
};

export default function OpenExternalLinkIcon({ className }: Props) {
  return (
    <i className={`fa-solid fa-arrow-up-right-from-square ${className}`}></i>
  );
}
