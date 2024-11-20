//import { Link } from "react-router-dom";
import AccordionCard from "@atoms/cards/AccordionCard";
import StaticCard from "@atoms/cards/StaticCard";

type Props = {
    title: string;
    children: React.ReactNode;
    onClick: () => void;
  };
  
  export default function RegattaResponsiveCard({ title, children, onClick }: Props) {
    return (
      <>
        <div className="w-full hidden md:block relative">
          <StaticCard title={title}>
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              {children}
            </div>
          </StaticCard>
          <button
            onClick={onClick}
            className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
            aria-label="Navigate"
          >
            +
          </button>
        </div>
        <div className="w-full block md:hidden relative">
          <AccordionCard title={title}>
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              {children}
            </div>
          </AccordionCard>
          <button
            onClick={onClick}
            className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
            aria-label="Navigate"
          >
            +
          </button>
        </div>
      </>
    );
  }