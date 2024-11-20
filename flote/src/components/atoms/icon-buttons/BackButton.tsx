import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
};

export default function BackButton({ className }: Props) {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <button onClick={goBack} className={`px-4 ${className}`}>
      <i className="fa-solid fa-chevron-left"></i>
    </button>
  );
}
