import * as classes from "./card-classes";

type Props = {
  title: string;
  actionButton?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export default function StaticCard({ title, actionButton, className, children }: Props) {
  return (
    <div className={`flex flex-col px-5 py-4 h-full ${classes.base}`}>
      <h2 className={classes.title}>{title}</h2>
      <hr className={`mt-3 ${classes.divider}`} />
      <div className={`grow mt-4 ${className}`}>{children}</div>
      {actionButton ?? null}
    </div>
  );
}
