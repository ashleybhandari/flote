import Header from "../atoms/Header";
import Footer from "../atoms/Footer";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <main className="h-full mx-14 my-10 sm:mx-20 sm:my-14">{children}</main>
      <Footer />
    </div>
  );
}
