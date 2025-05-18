
import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/ui/dashboard-sidebar';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BookingPlus, Filter, Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAllBookings, createBooking, updateBooking, deleteBooking, Booking } from '@/models/Booking';
import { getAllTables, Table as TableType } from '@/models/Table';

const BookingsPage = () => {
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
    <div className="bg-gray-50 min-h-screen">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader 
          title="Table Reservations" 
          description="Manage restaurant bookings and reservations"
        />
        <main className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex-1 w-full sm:max-w-xs relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reservations..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 bg-restaurant-primary hover:bg-restaurant-primary/90">
                    <BookingPlus size={16} />
                    <span>New Booking</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
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
                    <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreateBooking}>Create Booking</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
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
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map(booking => (
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
                            onClick={() => handleDeleteBooking(booking.id)}
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
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default BookingsPage;
