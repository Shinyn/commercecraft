"use client";

// This type is used to define the shape of our data.
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Store } from "./stores";
import EditStoreForm from "./editStoreNameForm";
import { useAuth } from "@clerk/nextjs";
import { MyDelete } from "./deleteStore";
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

export const columns: ColumnDef<Store>[] = [
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
          Store
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const store = row.original;
      function copyPaymentId() {
        if (store.id === undefined) return "no id";
        else return store.id.toString();
      }

      return (
        <>
          {/* //Sheet to edit a category, pulls over from the right side */}
          <Sheet>
            <SheetContent>
              <SheetHeader>
                <SheetTitle> {store.title}?</SheetTitle>
                <SheetDescription>Edit store name here</SheetDescription>
                {EditStoreForm(store.id, store.title)}
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
                    Copy store ID
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <SheetTrigger>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </SheetTrigger>
                <DropdownMenuItem>
                  <MyDelete ID={store.id} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Sheet>
        </>
      );
    },
  },
];
