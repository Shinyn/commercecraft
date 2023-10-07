"use client";

// This type is used to define the shape of our data.
import axios from "axios";
import { Category, ID } from "./categories";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import EditCategoryForm from "./editcategoryform";
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

//Function to delete a category
const deleteCategory = (ID: string | undefined) => {
  const response = axios
    .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${ID}`)
    .then(function (response) {
      window.location.reload();
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

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
                <SheetTitle> {category.title}?</SheetTitle>
                <SheetDescription>Edit the category name here</SheetDescription>
                {EditCategoryForm(category.id)}
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
                    onClick={() =>
                      navigator.clipboard.writeText(copyPaymentId())
                    }
                  >
                    Copy category ID
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <SheetTrigger>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </SheetTrigger>
                <DropdownMenuItem onClick={() => deleteCategory(category.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Sheet>
        </>
      );
    },
  },
];
