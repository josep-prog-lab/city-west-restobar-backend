
import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/ui/dashboard-sidebar';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { BookOpen, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAllTables, createTable, updateTable, deleteTable, Table } from '@/models/Table';

const TablesPage = () => {
  const { toast } = useToast();
  const [tables, setTables] = useState<Table[]>(getAllTables());
  const [showDialog, setShowDialog] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [formData, setFormData] = useState<Partial<Table>>({
    number: 1,
    capacity: 2,
    location: 'indoor',
    isAvailable: true
  });
  
  const handleEditTable = (table: Table) => {
    setEditingTable(table);
    setFormData({
      number: table.number,
      capacity: table.capacity,
      location: table.location,
      isAvailable: table.isAvailable
    });
    setShowDialog(true);
  };

  const handleCreateOrUpdateTable = () => {
    try {
      if (!formData.number || !formData.capacity) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      if (editingTable) {
        // Update existing table
        const updatedTable = updateTable(editingTable.id, formData);
        if (updatedTable) {
          setTables(tables.map(table => 
            table.id === editingTable.id ? updatedTable : table
          ));
          toast({
            title: "Table Updated",
            description: `Table ${updatedTable.number} has been updated.`
          });
        }
      } else {
        // Create new table
        const newTable = createTable(formData as any);
        setTables([...tables, newTable]);
        toast({
          title: "Table Created",
          description: `Table ${newTable.number} has been added.`
        });
      }
      
      setShowDialog(false);
      setEditingTable(null);
      setFormData({
        number: tables.length + 1,
        capacity: 2,
        location: 'indoor',
        isAvailable: true
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving the table.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTable = (id: string) => {
    try {
      const table = tables.find(table => table.id === id);
      if (!table) return;
      
      deleteTable(id);
      setTables(tables.filter(table => table.id !== id));
      toast({
        title: "Table Deleted",
        description: `Table ${table.number} has been removed.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem deleting the table.",
        variant: "destructive"
      });
    }
  };

  const handleToggleAvailability = (id: string, isAvailable: boolean) => {
    try {
      const updatedTable = updateTable(id, { isAvailable });
      if (updatedTable) {
        setTables(tables.map(table => 
          table.id === id ? updatedTable : table
        ));
        toast({
          title: `Table ${updatedTable.number} ${isAvailable ? 'Available' : 'Unavailable'}`,
          description: `The table is now ${isAvailable ? 'available' : 'unavailable'} for bookings.`
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating the table availability.",
        variant: "destructive"
      });
    }
  };

  const locationLabel = (location: string) => {
    switch(location) {
      case 'indoor': return 'Indoor';
      case 'outdoor': return 'Outdoor';
      case 'balcony': return 'Balcony';
      default: return location;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader 
          title="Table Management" 
          description="Manage restaurant tables and seating arrangements"
        />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <BookOpen size={20} />
              <span>Tables ({tables.length})</span>
            </h2>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-restaurant-primary hover:bg-restaurant-primary/90">
                  <Plus size={16} />
                  <span>Add Table</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingTable ? 'Edit Table' : 'Add New Table'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingTable 
                      ? 'Update the details of this table.'
                      : 'Fill in the details to add a new table to your restaurant.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tableNumber" className="text-right">Table Number</Label>
                    <Input
                      id="tableNumber"
                      type="number"
                      min="1"
                      value={formData.number}
                      onChange={(e) => setFormData({...formData, number: Number(e.target.value)})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="capacity" className="text-right">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">Location</Label>
                    <Select
                      value={formData.location as string}
                      onValueChange={(value) => setFormData({...formData, location: value as 'indoor' | 'outdoor' | 'balcony'})}
                    >
                      <SelectTrigger id="location" className="col-span-3">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indoor">Indoor</SelectItem>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                        <SelectItem value="balcony">Balcony</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isAvailable" className="text-right">Available</Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Switch
                        id="isAvailable"
                        checked={formData.isAvailable}
                        onCheckedChange={(checked) => setFormData({...formData, isAvailable: checked})}
                      />
                      <Label htmlFor="isAvailable">
                        {formData.isAvailable ? 'Available for bookings' : 'Unavailable'}
                      </Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setShowDialog(false);
                    setEditingTable(null);
                    setFormData({
                      number: tables.length + 1,
                      capacity: 2,
                      location: 'indoor',
                      isAvailable: true
                    });
                  }}>Cancel</Button>
                  <Button onClick={handleCreateOrUpdateTable}>
                    {editingTable ? 'Update Table' : 'Add Table'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tables.map(table => (
              <Card key={table.id} className={!table.isAvailable ? 'opacity-70 border-dashed' : ''}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">Table {table.number}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">
                          {table.capacity} {table.capacity === 1 ? 'Person' : 'People'}
                        </span>
                        <span className="mx-1">•</span>
                        <span className="text-sm text-muted-foreground">
                          {locationLabel(table.location)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Switch
                        id={`availability-${table.id}`}
                        checked={table.isAvailable}
                        onCheckedChange={(checked) => handleToggleAvailability(table.id, checked)}
                      />
                      <Label htmlFor={`availability-${table.id}`} className="ml-2 text-sm">
                        {table.isAvailable ? 'Available' : 'Unavailable'}
                      </Label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleEditTable(table)}
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteTable(table.id)}
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TablesPage;
