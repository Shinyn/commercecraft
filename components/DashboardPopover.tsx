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
    <div className={"flex flex-row justify-end w-9/12"}>
      <div className={"text-center text-2xl m-9 rounded bg-blue-400 w-9"}>
        <Popover>
          <PopoverTrigger> + </PopoverTrigger>
          <PopoverContent>{children}</PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
