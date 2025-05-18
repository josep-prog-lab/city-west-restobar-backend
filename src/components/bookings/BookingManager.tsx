
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { BookingSearch } from './BookingSearch';
import { BookingTable } from './BookingTable';
import { BookingForm } from './BookingForm';
import { getAllBookings, createBooking, deleteBooking, Booking } from '@/models/Booking';
import { getAllTables, Table as TableType } from '@/models/Table';

export const BookingManager = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>(getAllBookings());
  const [tables] = useState<TableType[]>(getAllTables());
  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [newBooking, setNewBooking] = useState<Partial<Booking>>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    tableId: '',
    partySize: 2,
    date: '',
    time: '',
    specialRequests: '',
    status: 'confirmed'
  });

  const handleCreateBooking = () => {
    try {
      // Validate inputs
      if (!newBooking.customerName || !newBooking.customerPhone || !newBooking.tableId || !newBooking.date || !newBooking.time) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      const createdBooking = createBooking(newBooking as any);
      setBookings([...bookings, createdBooking]);
      setShowDialog(false);
      
      // Reset form
      setNewBooking({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        tableId: '',
        partySize: 2,
        date: '',
        time: '',
        specialRequests: '',
        status: 'confirmed'
      });
      
      toast({
        title: "Booking Created",
        description: `Reservation for ${createdBooking.customerName} has been created.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating the booking.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteBooking = (id: string) => {
    try {
      deleteBooking(id);
      setBookings(bookings.filter(booking => booking.id !== id));
      toast({
        title: "Booking Cancelled",
        description: "The reservation has been cancelled."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem cancelling the booking.",
        variant: "destructive"
      });
    }
  };

  const filteredBookings = bookings.filter(booking => 
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerPhone.includes(searchTerm)
  );

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <BookingSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <Card>
          <CardContent className="p-0">
            <BookingTable 
              bookings={filteredBookings} 
              tables={tables} 
              onDeleteBooking={handleDeleteBooking} 
            />
          </CardContent>
        </Card>
        <DialogContent className="sm:max-w-[425px]">
          <BookingForm
            newBooking={newBooking}
            setNewBooking={setNewBooking}
            onCreateBooking={handleCreateBooking}
            onCancel={() => setShowDialog(false)}
            tables={tables}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
