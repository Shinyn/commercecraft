//Specifies the layout of data-table for billboards
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Customer } from '@/components/stores/dashboard/customers/customer';
import { ContactLinkCustomer } from './contactLinkCustomer';
import { DeleteCustomer } from '@/components/stores/dashboard/customers/DeleteCustomer';
import { EditCustomerForm } from '@/components/stores/dashboard/customers/editCustomersForm';
export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'firstName',
    id: 'firstName',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          First name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'lastName',
    id: 'lastName',

    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Last name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'phone',
    id: 'phone',

    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Phone number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'street',
    id: 'street',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Street adress
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'zipCode',
    id: 'zipCode',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Zip code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'city',
    id: 'city',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          City
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'e_mail',
    id: 'title',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'numberOfOrders',
    id: 'numberOfOrders',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Orders
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const category = row.original;
      function copyMail() {
        if (category.id === undefined) return 'no id';
        else return category.e_mail.toString();
      }

      return (
        <>
          {/* //Sheet to cover background avd display EditForm*/}
          <Sheet>
            <SheetContent>
              <SheetHeader>
                <SheetTitle> {'Edit customer'}</SheetTitle>
                <SheetDescription>Edit your customer details below</SheetDescription>
                {EditCustomerForm(row.original)}
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
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(copyMail())}
                >
                  Copy e-mail
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:cursor-pointer">
                  <ContactLinkCustomer e_mail={row.original.e_mail} />
                </DropdownMenuItem>
                <SheetTrigger className="w-full">
                  <DropdownMenuItem className="hover:cursor-pointer">Edit</DropdownMenuItem>
                </SheetTrigger>
                <DropdownMenuItem className="hover:cursor-pointer">
                  <DeleteCustomer itemId={row.original.id || ''} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Sheet>
        </>
      );
    },
  },
];
