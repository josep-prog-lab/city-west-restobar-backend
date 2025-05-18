
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Booking } from '@/models/Booking';
import { Table as TableType } from '@/models/Table';

interface BookingFormProps {
  newBooking: Partial<Booking>;
  setNewBooking: React.Dispatch<React.SetStateAction<Partial<Booking>>>;
  onCreateBooking: () => void;
  onCancel: () => void;
  tables: TableType[];
}

export const BookingForm = ({
  newBooking,
  setNewBooking,
  onCreateBooking,
  onCancel,
  tables
}: BookingFormProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create New Booking</DialogTitle>
        <DialogDescription>
          Enter the customer details and reservation information.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="customerName" className="text-right">Name</Label>
          <Input
            id="customerName"
            value={newBooking.customerName}
            onChange={(e) => setNewBooking({...newBooking, customerName: e.target.value})}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="customerEmail" className="text-right">Email</Label>
          <Input
            id="customerEmail"
            type="email"
            value={newBooking.customerEmail}
            onChange={(e) => setNewBooking({...newBooking, customerEmail: e.target.value})}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="customerPhone" className="text-right">Phone</Label>
          <Input
            id="customerPhone"
            value={newBooking.customerPhone}
            onChange={(e) => setNewBooking({...newBooking, customerPhone: e.target.value})}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="table" className="text-right">Table</Label>
          <Select
            value={newBooking.tableId}
            onValueChange={(value) => setNewBooking({...newBooking, tableId: value})}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a table" />
            </SelectTrigger>
            <SelectContent>
              {tables.map(table => (
                <SelectItem key={table.id} value={table.id}>
                  Table {table.number} - {table.capacity} seats ({table.location})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="partySize" className="text-right">Party Size</Label>
          <Input
            id="partySize"
            type="number"
            min="1"
            value={newBooking.partySize}
            onChange={(e) => setNewBooking({...newBooking, partySize: Number(e.target.value)})}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="date" className="text-right">Date</Label>
          <Input
            id="date"
            type="date"
            value={newBooking.date}
            onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="time" className="text-right">Time</Label>
          <Input
            id="time"
            type="time"
            value={newBooking.time}
            onChange={(e) => setNewBooking({...newBooking, time: e.target.value})}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="specialRequests" className="text-right">Requests</Label>
          <Textarea
            id="specialRequests"
            value={newBooking.specialRequests}
            onChange={(e) => setNewBooking({...newBooking, specialRequests: e.target.value})}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onCreateBooking}>Create Booking</Button>
      </DialogFooter>
    </>
  );
};
