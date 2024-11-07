import * as classes from "./card-classes";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function StaticCard({ title, children }: Props) {
  return (
    <div className={`px-5 py-4 h-full ${classes.base}`}>
      <h2 className={classes.title}>{title}</h2>
      <hr className={`mt-3 ${classes.divider}`} />
      <div className="mt-4">{children}</div>
    </div>
  );
}
