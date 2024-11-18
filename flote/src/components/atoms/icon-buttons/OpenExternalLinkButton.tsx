type Props = {
  className?: string;
};

export default function OpenExternalLinkButton({ className }: Props) {
  return (
    <button className="float-end">
      <i className={`fa-solid fa-arrow-up-right-from-square ${className}`}></i>
    </button>
  );
}
