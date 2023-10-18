//Layout för hela dashboarden
import Navbar from "@/components/navbar";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex flex-row"}>
      {<Navbar />}
      <section className={"w-full"}>{children}</section>
    </div>
  );
}
