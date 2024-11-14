import { useSearchParams } from "react-router-dom";

import AppLayout from "@templates/AppLayout";
import BoatTable from "@molecules/tables/BoatTable";
import RaceTable from "@molecules/tables/RaceTable";
import RegattaTable from "@molecules/tables/RegattaTable";

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";

  return (
    <AppLayout className="flex flex-col gap-3">
      <RegattaTable searchQuery={searchQuery} />
      <RaceTable searchQuery={searchQuery} />
      <BoatTable searchQuery={searchQuery} />
    </AppLayout>
  );
}
