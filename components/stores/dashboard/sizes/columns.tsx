// This type is used to define the shape of our data.
import { Size } from "./sizes";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import EditSizeForm from "./EditSizeForm";
import DeletePopup from "@/components/DeletePopup";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteSize } from "@/components/stores/dashboard/sizes/DeleteSize";

//Columns for the table
export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const size = row.original;
      function copyPaymentId() {
        if (size.id === undefined) return "no id";
        else return size.id.toString();
      }

      return (
        <>
          {/* //Sheet to edit a category, pulls over from the right side */}
          <Sheet>
            <SheetContent>
              <SheetHeader>
                <SheetTitle> Replace {size.title}?</SheetTitle>
                <SheetDescription>Edit your size name here</SheetDescription>
                {EditSizeForm(size)}
              </SheetHeader>
            </SheetContent>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {copyPaymentId === null ? null : (
                  <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onClick={() =>
                      navigator.clipboard.writeText(copyPaymentId())
                    }
                  >
                    Copy size ID
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <SheetTrigger className="w-full">
                  <DropdownMenuItem className="hover:cursor-pointer">
                    Edit
                  </DropdownMenuItem>
                </SheetTrigger>
                <DropdownMenuItem className="p-0" onClick={(e) => e.preventDefault()}>
                  <DeletePopup item={"size"}>
                    <DeleteSize itemId={size.id || ""} />
                  </DeletePopup>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Sheet>
        </>
      );
    },
  },
];
