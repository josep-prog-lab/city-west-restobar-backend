
import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/ui/dashboard-sidebar';
import { DashboardHeader } from '@/components/ui/dashboard-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Search, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  getAllMenuItems, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem, 
  MenuItem,
  MenuCategory
} from '@/models/MenuItem';

const MenuItemsPage = () => {
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(getAllMenuItems());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'main',
    isAvailable: true,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    spicyLevel: 0
  });

  const categories: MenuCategory[] = [
    'appetizer', 'soup', 'salad', 'main', 'pasta', 'dessert', 'beverage', 'alcohol', 'special'
  ];

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isAvailable: item.isAvailable,
      isVegetarian: item.isVegetarian,
      isVegan: item.isVegan || false,
      isGlutenFree: item.isGlutenFree || false,
      spicyLevel: item.spicyLevel || 0
    });
    setShowDialog(true);
  };

  const handleCreateOrUpdateItem = () => {
    try {
      if (!formData.name || !formData.description || formData.price === undefined) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      if (editingItem) {
        // Update existing item
        const updatedItem = updateMenuItem(editingItem.id, formData);
        if (updatedItem) {
          setMenuItems(menuItems.map(item => 
            item.id === editingItem.id ? updatedItem : item
          ));
          toast({
            title: "Item Updated",
            description: `${updatedItem.name} has been updated.`
          });
        }
      } else {
        // Create new item
        const newItem = createMenuItem(formData as any);
        setMenuItems([...menuItems, newItem]);
        toast({
          title: "Item Created",
          description: `${newItem.name} has been added to the menu.`
        });
      }
      
      setShowDialog(false);
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'main',
        isAvailable: true,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        spicyLevel: 0
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving the menu item.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteItem = (id: string) => {
    try {
      const item = menuItems.find(item => item.id === id);
      if (!item) return;
      
      deleteMenuItem(id);
      setMenuItems(menuItems.filter(item => item.id !== id));
      toast({
        title: "Item Deleted",
        description: `${item.name} has been removed from the menu.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem deleting the menu item.",
        variant: "destructive"
      });
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader 
          title="Menu Management" 
          description="Create and manage restaurant menu items"
        />
        <main className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex-1 w-full sm:max-w-xs relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search menu items..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value as MenuCategory | 'all')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 bg-restaurant-primary hover:bg-restaurant-primary/90">
                    <PlusCircle size={16} />
                    <span>Add Item</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingItem 
                        ? 'Update the details of this menu item.'
                        : 'Fill in the details to add a new item to your menu.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({...formData, category: value as MenuCategory})}
                      >
                        <SelectTrigger id="category" className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="spicyLevel" className="text-right">Spicy Level</Label>
                      <Select
                        value={formData.spicyLevel?.toString() || "0"}
                        onValueChange={(value) => setFormData({...formData, spicyLevel: parseInt(value) as 0 | 1 | 2 | 3})}
                      >
                        <SelectTrigger id="spicyLevel" className="col-span-3">
                          <SelectValue placeholder="Select spice level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Not Spicy</SelectItem>
                          <SelectItem value="1">Mild</SelectItem>
                          <SelectItem value="2">Medium</SelectItem>
                          <SelectItem value="3">Hot</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="text-right">Dietary Options</div>
                      <div className="col-span-3 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="isAvailable"
                            checked={formData.isAvailable}
                            onCheckedChange={(checked) => 
                              setFormData({...formData, isAvailable: checked === true})
                            }
                          />
                          <label 
                            htmlFor="isAvailable"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Available on Menu
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="isVegetarian"
                            checked={formData.isVegetarian}
                            onCheckedChange={(checked) => 
                              setFormData({...formData, isVegetarian: checked === true})
                            }
                          />
                          <label 
                            htmlFor="isVegetarian"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Vegetarian
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="isVegan"
                            checked={formData.isVegan}
                            onCheckedChange={(checked) => 
                              setFormData({...formData, isVegan: checked === true})
                            }
                          />
                          <label 
                            htmlFor="isVegan"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Vegan
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="isGlutenFree"
                            checked={formData.isGlutenFree}
                            onCheckedChange={(checked) => 
                              setFormData({...formData, isGlutenFree: checked === true})
                            }
                          />
                          <label 
                            htmlFor="isGlutenFree"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Gluten Free
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setShowDialog(false);
                      setEditingItem(null);
                      setFormData({
                        name: '',
                        description: '',
                        price: 0,
                        category: 'main',
                        isAvailable: true,
                        isVegetarian: false,
                        isVegan: false,
                        isGlutenFree: false,
                        spicyLevel: 0
                      });
                    }}>Cancel</Button>
                    <Button onClick={handleCreateOrUpdateItem}>
                      {editingItem ? 'Update Item' : 'Add Item'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <Card key={item.id} className={!item.isAvailable ? 'opacity-60' : ''}>
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      <div className="text-xl font-semibold">${item.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                      {item.isVegetarian && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                          Vegetarian
                        </span>
                      )}
                      {item.isVegan && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                          Vegan
                        </span>
                      )}
                      {item.isGlutenFree && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                          Gluten Free
                        </span>
                      )}
                      {item.spicyLevel && item.spicyLevel > 0 && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs">
                          {['Mild', 'Medium', 'Hot'][item.spicyLevel - 1]} 🌶️
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleEditItem(item)}
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full p-8 text-center text-muted-foreground">
                No menu items found matching your filters.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenuItemsPage;
