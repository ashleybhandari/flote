type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function Background({ className, children }: Props) {
  return (
    <div className="bg-landing bg-no-repeat bg-cover bg-center bg-fixed h-screen w-screen">
      <div
        className={`backdrop-blur-[2px] h-screen w-screen flex flex-col ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
