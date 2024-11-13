import { useSearchParams } from "react-router-dom";

import SearchAccordion from "@molecules/SearchAccordion";
import AppLayout from "@templates/AppLayout";

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";

  return (
    <AppLayout className="flex flex-col gap-3">
      <SearchAccordion title="regattas" searchQuery={searchQuery} />
      <SearchAccordion title="races" searchQuery={searchQuery} />
    </AppLayout>
  );
}
