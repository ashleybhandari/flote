import { Spinner } from "@nextui-org/spinner";

type Props = {
  className?: string;
};

export default function PageSpinner({ className }: Props) {
  return <Spinner size="lg" className={`w-full h-full ${className}`} />;
}
