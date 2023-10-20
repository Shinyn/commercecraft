import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export function DashboardPopover({
  children, // children will be rendered inside popover
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "flex flex-row justify-end right-80 z-10 relative w-full transform translate-x-20"
      }
    >
      <div
        className={
          "text-center text-sm font-semibold p-0 top-14 absolute rounded bg-white z-50 hover:bg-slate-100 border hover:pointer border-slate self-center"
        }
      >
        <Popover>
          <PopoverTrigger className="p-2 bg-blue-300 hover:bg-green-400 hover:text-white">
            Add New
          </PopoverTrigger>
          <PopoverContent>{children}</PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
