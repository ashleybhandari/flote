import Header from "../atoms/Header";
import Footer from "../atoms/Footer";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <main className="h-full m-4">{children}</main>
      <Footer />
    </div>
  );
}
