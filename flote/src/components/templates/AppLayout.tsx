import { Breadcrumb } from "@src/models/Breadcrumb";
import Background from "@atoms/Background";
import Header from "@molecules/Header";
import PageBreadcrumbs from "@atoms/PageBreadcrumbs";
import PageTitle from "@atoms/PageTitle";
import FreepikAttribution from "@atoms/FreepikAttribution";
import Footer from "@molecules/Footer/Footer";

type Props = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  titleMargin?: string;
  breadcrumbs?: Breadcrumb[];
};

export default function AppLayout({
  title,
  subtitle,
  children,
  className,
  titleMargin,
  breadcrumbs,
}: Props) {
  return (
    <Background className="justify-between bg-white/40">
      <Header className="px-8 lg:px-[5%] xl:px-[15%]" />
      <main className="grow flex flex-col m-8 lg:mx-[5%] xl:mx-[15%]">
        {breadcrumbs && <PageBreadcrumbs items={breadcrumbs} className={titleMargin} />}
        {title && (
          <PageTitle
            title={title}
            subtitle={subtitle}
            className={titleMargin}
          ></PageTitle>
        )}
        <div className={`flex flex-col gap-3 grow ${className}`}>
          {children}
        </div>
      </main>
      <FreepikAttribution />
      <Footer className="px-8 lg:px-[5%] xl:px-[15%]" />
    </Background>
  );
}
