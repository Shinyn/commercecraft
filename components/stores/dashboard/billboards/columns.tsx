"use client";
//Specifies the layout of data-table for billboards
import { EditForm } from "@/components/stores/dashboard/billboards/EditForm";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Billboard } from "@/components/stores/dashboard/billboards/billboards";
import axios, { isAxiosError } from "axios";

//TODO: Fix so this updates state instead of reloading page
async function deleteBillboard(id: string | undefined) {
  axios
    .delete(`/api/billboards/${id}`)
    .then(function (response) {
      window.location.reload();
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      if (isAxiosError(error)) {
        return error.message;
      }
    });
}

export const columns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "text",
    id: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Text
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Image url
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Activated?
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const billboard = row.original;

      return (
        <>
          {/* //Sheet to cover background avd display EditForm*/}
          <Sheet>
            <SheetContent>
              <SheetHeader>
                <SheetTitle> {"Edit Billboard"}?</SheetTitle>
                <SheetDescription>Edit the category name here</SheetDescription>
                {EditForm(row.original)}
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
                <DropdownMenuSeparator />
                <SheetTrigger>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </SheetTrigger>
                <DropdownMenuItem
                  onClick={(e) => deleteBillboard(row.original.id)}
                >
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
