
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Booking } from '@/models/Booking';
import { Table as TableType } from '@/models/Table';

interface BookingTableProps {
  bookings: Booking[];
  tables: TableType[];
  onDeleteBooking: (id: string) => void;
}

export const BookingTable = ({ bookings, tables, onDeleteBooking }: BookingTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Table</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.customerName}</TableCell>
              <TableCell>
                <div>{booking.customerEmail}</div>
                <div className="text-sm text-muted-foreground">{booking.customerPhone}</div>
              </TableCell>
              <TableCell>
                {tables.find(table => table.id === booking.tableId)?.number || '-'}
              </TableCell>
              <TableCell>
                <div>{booking.date}</div>
                <div className="text-sm text-muted-foreground">{booking.time}</div>
              </TableCell>
              <TableCell>{booking.partySize}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                   booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                   'bg-red-100 text-red-800'}`}>
                  {booking.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onDeleteBooking(booking.id)}
                >
                  <X size={16} />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No bookings found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
