//Layout för hela dashboarden
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex flex-row"}>
      <Toaster/>
      {<Navbar />}
      {children}
    </div>
  );
}
