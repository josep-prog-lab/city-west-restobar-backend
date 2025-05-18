
import React from 'react';
import { DashboardSidebar } from '@/components/ui/dashboard-sidebar';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { StatsCard } from '@/components/ui/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, Utensils, Users } from 'lucide-react';
import { getAllOrders } from '@/models/Order';
import { getAllBookings } from '@/models/Booking';
import { getAllMenuItems } from '@/models/MenuItem';
import { getAllTables } from '@/models/Table';

const Dashboard = () => {
  // In a real app, this would be fetched from API
  const orders = getAllOrders();
  const bookings = getAllBookings();
  const menuItems = getAllMenuItems();
  const tables = getAllTables();
  
  // Calculate today's stats
  const today = new Date().toISOString().split('T')[0];
  const todaysOrders = orders.filter(order => 
    new Date(order.createdAt).toISOString().split('T')[0] === today
  );
  
  const todaysRevenue = todaysOrders.reduce((sum, order) => sum + order.total, 0);
  
  const todaysBookings = bookings.filter(booking => booking.date === today);

  // Get upcoming bookings
  const upcomingBookings = bookings
    .filter(booking => 
      booking.date >= today && booking.status !== 'cancelled'
    )
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 5);

  // Get recent orders
  const recentOrders = [...orders]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader 
          title="Dashboard" 
          description="Overview of your restaurant's performance"
        />
        <main className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              title="Total Revenue" 
              value={`$${todaysRevenue.toFixed(2)}`}
              description="Today's earnings" 
              icon={<DollarSign size={18} />}
              trend="up"
              trendValue="12% from yesterday"
            />
            <StatsCard 
              title="Orders" 
              value={todaysOrders.length}
              description="Orders received today" 
              icon={<Utensils size={18} />}
              trend="neutral"
              trendValue="Same as yesterday"
            />
            <StatsCard 
              title="Bookings" 
              value={todaysBookings.length}
              description="Today's reservations" 
              icon={<Calendar size={18} />}
              trend="up"
              trendValue="5% from last week"
            />
            <StatsCard 
              title="Menu Items" 
              value={menuItems.length}
              description={`${menuItems.filter(item => item.isAvailable).length} items available`} 
              icon={<Users size={18} />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Upcoming Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.length > 0 ? (
                    upcomingBookings.map(booking => (
                      <div key={booking.id} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{booking.customerName}</p>
                          <p className="text-sm text-muted-foreground">
                            Table {tables.find(t => t.id === booking.tableId)?.number || '-'} • Party of {booking.partySize}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{booking.date}</p>
                          <p className="text-sm text-muted-foreground">{booking.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No upcoming reservations</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map(order => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} items • {order.orderType}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <p className="text-xs px-2 py-1 rounded inline-block capitalize
                          ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                           order.status === 'preparing' ? 'bg-blue-100 text-blue-800' : 
                           order.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                           order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                           'bg-gray-100 text-gray-800'}">
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
