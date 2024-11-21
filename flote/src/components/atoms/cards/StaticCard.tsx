import * as classes from "./card-classes";

type Props = {
  title: string;
  addButton?: React.ReactNode;
  children: React.ReactNode;
};

export default function StaticCard({ title, addButton, children }: Props) {
  return (
    <div className={`flex flex-col px-5 py-4 h-full ${classes.base}`}>
      <h2 className={classes.title}>{title}</h2>
      <hr className={`mt-3 ${classes.divider}`} />
      <div className="grow mt-4">{children}</div>
      {addButton ?? null}
    </div>
  );
}
