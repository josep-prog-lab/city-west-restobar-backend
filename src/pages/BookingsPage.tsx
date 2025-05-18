
import React from 'react';
import { DashboardSidebar } from '@/components/ui/dashboard-sidebar';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { BookingManager } from '@/components/bookings/BookingManager';

const BookingsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader 
          title="Table Reservations" 
          description="Manage restaurant bookings and reservations"
        />
        <main className="p-6">
          <BookingManager />
        </main>
      </div>
    </div>
  );
};

export default BookingsPage;
