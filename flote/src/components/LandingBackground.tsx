export default function LandingBackground({ className, children }) {
  return (
    <div className="bg-landing bg-no-repeat bg-cover bg-center bg-fixed h-screen w-screen">
      <div className={`backdrop-blur-[2px] h-screen w-screen ${className}`}>
        {children}
      </div>
    </div>
  );
}
