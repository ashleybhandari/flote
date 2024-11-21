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
  const classes = "text-white bg-primary/90 rounded-md py-2";

  return (
    <div
      className={`flex flex-row mb-3 gap-[5px] mx-2 ${marginX ?? "md:mx-0"}`}
    >
      {!hideBackButton && (
        <BackButton
          className={`hover:bg-primary/80 active:bg-primary/90 ${classes}`}
        />
      )}
      <div
        className={`grow flex flex-col sm:flex-row items-start sm:items-end gap-1 sm:gap-2 px-4 pt-4 ${classes}`}
      >
        {subtitle && (
          <div className="font-header lowercase text-xl mb-1">{subtitle}</div>
        )}
        <div className="font-bold uppercase text-4xl">{title}</div>
      </div>
    </div>
  );
}
