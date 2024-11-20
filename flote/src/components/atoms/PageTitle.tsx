import BackButton from "@atoms/icon-buttons/BackButton";

type Props = {
  title: string;
  subtitle?: string;
  hideBackButton?: boolean;
  marginX?: string;
};

export default function PageTitle({
  title,
  subtitle,
  hideBackButton,
  marginX,
}: Props) {
  const classes = "text-white bg-primary/70 rounded-md py-2";
  return (
    <div
      className={`flex flex-row mb-3 gap-[5px] mx-2 ${marginX ?? "md:mx-0"}`}
    >
      {!hideBackButton && (
        <BackButton
          className={`hover:bg-primary/90 active:bg-primary ${classes}`}
        />
      )}
      <div className={`grow px-4 ${classes}`}>
        {subtitle && (
          <div className="font-header lowercase text-xl ml-1">{subtitle}</div>
        )}
        <div className="font-bold uppercase text-4xl mt-2">{title}</div>
      </div>
    </div>
  );
}
