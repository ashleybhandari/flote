import Background from "@atoms/Background";
import Header from "@molecules/Header";
import Footer from "@molecules/Footer";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <Background className="flex flex-col h-screen justify-between bg-white/40">
      <Header className="px-8 lg:px-[15%]" />
      <main className="h-full m-8 lg:mx-[15%] p-6 rounded-lg bg-white/90">
        {children}
      </main>
      <Footer className="px-8 lg:px-[15%]" />
    </Background>
  );
}
