type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function Background({ className, children }: Props) {
  return (
    <div>
      <div className="fixed bg-landing bg-no-repeat bg-cover bg-center bg-fixed w-screen h-screen">
        <div
          className={`backdrop-blur-[2px] w-screen h-screen ${className}`}
        ></div>
      </div>
      <div
        className={`absolute overflow-x-hidden w-screen h-screen flex flex-col`}
      >
        {children}
      </div>
    </div>
  );
}
