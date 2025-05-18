
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, BookPlus } from 'lucide-react';
import { DialogTrigger } from '@/components/ui/dialog';

interface BookingSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const BookingSearch = ({ searchTerm, onSearchChange }: BookingSearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
      <div className="flex-1 w-full sm:max-w-xs relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search reservations..."
          className="pl-8 w-full"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          <span>Filter</span>
        </Button>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 bg-restaurant-primary hover:bg-restaurant-primary/90">
            <BookPlus size={16} />
            <span>New Booking</span>
          </Button>
        </DialogTrigger>
      </div>
    </div>
  );
};
