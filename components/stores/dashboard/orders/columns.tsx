//Innehåller alla kolumner som ska visas i tabellen
//Componenten används i products page.tsx, tillsammans med products.tsx
//Denna componenten är en del av data-table.tsx(som dock går att återanvända)

import { Order } from '@/components/stores/dashboard/orders/order';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import DeleteOrder from '@/components/stores/dashboard/orders/deleteOrder';
import { LinktoPrint } from '@/components/stores/dashboard/orders/link';
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
import { EditOrderForm } from '@/components/stores/dashboard/orders/editOrderForm';

export const columns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'order_status',
    header: 'Order Status',
  },
  {
    accessorKey: 'order_total',
    header: 'Total Price',
  },
  {
    accessorKey: 'order_date',
    header: 'Order date',
  },
  {
    accessorKey: 'customerId',
    header: 'customer Id',
  },
  {
    accessorKey: 'customerName',
    header: 'Name',
    id: 'title',
  },
  {
    accessorKey: 'customerEmail',
    header: 'Email',
  },
  {
    accessorKey: 'customerPhone',
    header: 'Phone',
  },
  {
    accessorKey: 'customerstreet',
    header: 'Street',
  },
  {
    accessorKey: 'customerCity',
    header: 'City',
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original;

      return (
        <>
          <Sheet>
            <SheetContent>
              <SheetHeader>
                <SheetTitle> {'Edit Order'}?</SheetTitle>
                <SheetDescription>Edit the productinfo here</SheetDescription>
                {EditOrderForm(order)}
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
                  onClick={() => navigator.clipboard.writeText(order.id)}
                >
                  Copy order ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                  <SheetTrigger className="hover:cursor-pointer w-full flex justify-left p-2">Edit</SheetTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">{DeleteOrder(order.id)}</DropdownMenuItem>
                <DropdownMenuItem className="p-0">{LinktoPrint(order.id)}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Sheet>
        </>
      );
    },
  },
];
