
// Booking model for table reservations
import { v4 as uuidv4 } from 'uuid';

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tableId: string;
  partySize: number;
  date: string;
  time: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Mock database for bookings
let bookings: Booking[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '555-123-4567',
    tableId: '1',
    partySize: 2,
    date: '2025-05-20',
    time: '19:00',
    specialRequests: 'Quiet corner please',
    status: 'confirmed',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '555-987-6543',
    tableId: '3',
    partySize: 5,
    date: '2025-05-21',
    time: '20:00',
    status: 'confirmed',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const getAllBookings = (): Booking[] => {
  return bookings;
};

export const getBookingById = (id: string): Booking | undefined => {
  return bookings.find(booking => booking.id === id);
};

export const getBookingsByDate = (date: string): Booking[] => {
  return bookings.filter(booking => booking.date === date);
};

export const createBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Booking => {
  const newBooking = {
    ...booking,
    id: uuidv4(),
    status: 'confirmed' as const,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  bookings.push(newBooking);
  return newBooking;
};

export const updateBooking = (id: string, bookingData: Partial<Booking>): Booking | undefined => {
  const index = bookings.findIndex(booking => booking.id === id);
  if (index === -1) return undefined;
  
  bookings[index] = {
    ...bookings[index],
    ...bookingData,
    updatedAt: new Date()
  };
  
  return bookings[index];
};

export const deleteBooking = (id: string): boolean => {
  const initialLength = bookings.length;
  bookings = bookings.filter(booking => booking.id !== id);
  return bookings.length !== initialLength;
};

export const checkTableAvailability = (
  date: string,
  time: string,
  tableId?: string,
  partySize?: number
): boolean => {
  // Find bookings on the same date and time
  const bookingsOnDateTime = bookings.filter(
    booking => booking.date === date && 
    booking.time === time &&
    booking.status === 'confirmed'
  );
  
  // If checking a specific table
  if (tableId) {
    return !bookingsOnDateTime.some(booking => booking.tableId === tableId);
  }
  
  // If checking for any table with enough capacity for the party size
  if (partySize) {
    // This would require information about table capacities
    // For now, just return a simple availability check
    return bookingsOnDateTime.length < 6; // Assuming we have 6 total tables
  }
  
  return true;
};
