
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up!",
    });
  };

  return (
    <header className="flex flex-col bg-white shadow-sm">
      <div className="border-b border-gray-200">
        <div className="flex h-16 items-center px-4 justify-between">
          <div>
            <h1 className="text-2xl font-playfair font-semibold text-restaurant-primary">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-60 hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-background pl-8 border-gray-200"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-restaurant-primary"></span>
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
