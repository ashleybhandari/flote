import AppLayout from "@templates/AppLayout";
import ResponsiveCard from "@molecules/ResponsiveCard";

export default function AccountHome() {
  return (
    <AppLayout className="flex flex-col md:flex-row gap-3">
      <ResponsiveCard title="my regattas">
        list of regattas user admins
      </ResponsiveCard>
      <ResponsiveCard title="shared with me">
        list of regattas user timekeeps
      </ResponsiveCard>
    </AppLayout>
  );
}
