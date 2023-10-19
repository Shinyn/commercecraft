// This type is used to define the shape of our data.
import { Category, ID } from "./categories";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { EditCategoryForm } from "./editcategoryform";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import DeletePopup from "@/components/DeletePopup";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteCategory } from "@/components/stores/dashboard/categories/deleteCategory";

//Columns for the table
export const columns: ColumnDef<Category>[] = [
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
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      function copyPaymentId() {
        if (category.id === undefined) return "no id";
        else return category.id.toString();
      }

      return (
        <>
          {/* //Sheet to edit a category, pulls over from the right side */}
          <Sheet>
            <SheetContent>
              <SheetHeader>
                <SheetTitle> Replace {category.title}?</SheetTitle>
                <SheetDescription>Edit the category name here</SheetDescription>
                {EditCategoryForm(category)}
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
                    Copy category ID
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <SheetTrigger className="w-full">
                  <DropdownMenuItem className="hover:cursor-pointer">
                    Edit
                  </DropdownMenuItem>
                </SheetTrigger>
                <DropdownMenuItem className="p-0" onClick={(e) => e.preventDefault()}>
                  <DeletePopup item={"category"}>
                    <DeleteCategory itemId={category.id || ""} />
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
