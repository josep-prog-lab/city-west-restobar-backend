
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ChevronRightCircle, Utensils, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-restaurant-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Utensils className="h-8 w-8 text-restaurant-gold" />
            <span className="font-playfair text-2xl tracking-wider">City West Restobar</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-white/80 hover:text-white transition">Menu</a>
            <a href="#" className="text-white/80 hover:text-white transition">Reservations</a>
            <a href="#" className="text-white/80 hover:text-white transition">About</a>
            <a href="#" className="text-white/80 hover:text-white transition">Contact</a>
          </nav>
          <Link to="/dashboard">
            <Button variant="outline" className="text-white border-white hover:bg-white/10 hidden md:block">
              Admin Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="py-16 px-4 text-center max-w-3xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-restaurant-primary mb-4">
            Welcome to City West Restobar
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            A premium dining experience with the best local ingredients and expert culinary team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-lg px-6 py-6">
              Book a Table
            </Button>
            <Button variant="outline" className="border-restaurant-primary text-restaurant-primary hover:bg-restaurant-primary/10 text-lg px-6 py-6">
              View Menu
            </Button>
          </div>
        </section>

        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-playfair text-3xl font-bold text-center mb-12 text-restaurant-primary">
              Restaurant Management System
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Calendar className="h-10 w-10 text-restaurant-gold mb-2" />
                  <CardTitle>Table Bookings</CardTitle>
                  <CardDescription>
                    Comprehensive table reservation system with real-time availability checks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Manage all your table reservations, track party size, and handle special requests through an intuitive interface.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/bookings" className="flex items-center text-restaurant-primary font-medium">
                    Manage Bookings <ChevronRightCircle className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Utensils className="h-10 w-10 text-restaurant-gold mb-2" />
                  <CardTitle>Menu Management</CardTitle>
                  <CardDescription>
                    Dynamic menu editing with categories and dietary information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Update menu items, prices, and availability in real-time. Add images and detailed descriptions for each dish.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/menu" className="flex items-center text-restaurant-primary font-medium">
                    Manage Menu <ChevronRightCircle className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-restaurant-gold mb-2" />
                  <CardTitle>Staff Management</CardTitle>
                  <CardDescription>
                    Complete team and staff management system.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Keep track of your restaurant staff, their roles, schedules, and performance through an organized dashboard.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard" className="flex items-center text-restaurant-primary font-medium">
                    View Dashboard <ChevronRightCircle className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-restaurant-primary">
              Get Started with Your Backend
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              This is just the beginning of your restaurant management system. Access the admin dashboard to manage all aspects of your restaurant.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-restaurant-primary hover:bg-restaurant-primary/90 text-lg px-8">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-restaurant-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-playfair text-xl mb-4 text-restaurant-gold">City West Restobar</h3>
              <p className="text-gray-300">
                123 Restaurant Street<br />
                Foodie District<br />
                Cuisine City, 12345
              </p>
            </div>
            <div>
              <h3 className="font-playfair text-xl mb-4 text-restaurant-gold">Opening Hours</h3>
              <p className="text-gray-300">
                Monday - Friday: 11am - 10pm<br />
                Saturday & Sunday: 10am - 11pm
              </p>
            </div>
            <div>
              <h3 className="font-playfair text-xl mb-4 text-restaurant-gold">Contact</h3>
              <p className="text-gray-300">
                Phone: (123) 456-7890<br />
                Email: info@citywestrestobar.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} City West Restobar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
