import Background from "@atoms/Background";
import Header from "@molecules/Header";
import Footer from "@molecules/Footer";
import FreepikAttribution from "@atoms/FreepikAttribution";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function AppLayout({ className, children }: Props) {
  return (
    <Background className="justify-between bg-white/40">
      <Header className="px-8 lg:px-[5%] xl:px-[15%]" />
      <main className={`h-full m-8 lg:mx-[5%] xl:mx-[15%] ${className}`}>
        {children}
      </main>
      <FreepikAttribution />
      <Footer className="px-8 lg:px-[5%] xl:px-[15%]" />
    </Background>
  );
}
