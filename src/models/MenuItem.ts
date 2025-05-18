
// Menu item model
export type MenuCategory = 
  'appetizer' | 
  'soup' | 
  'salad' | 
  'main' | 
  'pasta' | 
  'dessert' | 
  'beverage' | 
  'alcohol' | 
  'special';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: MenuCategory;
  isAvailable: boolean;
  isVegetarian: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3; // 0 = not spicy, 3 = very spicy
  createdAt: Date;
  updatedAt: Date;
}

// Mock database for menu items
let menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil with a balsamic glaze',
    price: 12.99,
    image: '/placeholder.svg', 
    category: 'appetizer',
    isAvailable: true,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    spicyLevel: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Grilled Salmon',
    description: 'Fresh salmon fillet with lemon butter sauce and seasonal vegetables',
    price: 24.99,
    image: '/placeholder.svg',
    category: 'main',
    isAvailable: true,
    isVegetarian: false,
    isGlutenFree: true,
    spicyLevel: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta with rich meat sauce',
    price: 18.99,
    image: '/placeholder.svg',
    category: 'pasta',
    isAvailable: true,
    isVegetarian: false,
    spicyLevel: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 9.99,
    image: '/placeholder.svg',
    category: 'dessert',
    isAvailable: true,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    spicyLevel: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'House Red Wine',
    description: 'Glass of our signature house red wine',
    price: 8.99,
    category: 'alcohol',
    isAvailable: true,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    spicyLevel: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Spicy Thai Curry',
    description: 'Authentic Thai curry with your choice of protein',
    price: 22.99,
    image: '/placeholder.svg',
    category: 'main',
    isAvailable: true,
    isVegetarian: false,
    isGlutenFree: true,
    spicyLevel: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const getAllMenuItems = (): MenuItem[] => {
  return menuItems;
};

export const getMenuItemsByCategory = (category: MenuCategory): MenuItem[] => {
  return menuItems.filter(item => item.category === category);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

export const createMenuItem = (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): MenuItem => {
  const newItem = {
    ...item,
    id: (menuItems.length + 1).toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  menuItems.push(newItem);
  return newItem;
};

export const updateMenuItem = (id: string, itemData: Partial<MenuItem>): MenuItem | undefined => {
  const index = menuItems.findIndex(item => item.id === id);
  if (index === -1) return undefined;
  
  menuItems[index] = {
    ...menuItems[index],
    ...itemData,
    updatedAt: new Date()
  };
  
  return menuItems[index];
};

export const deleteMenuItem = (id: string): boolean => {
  const initialLength = menuItems.length;
  menuItems = menuItems.filter(item => item.id !== id);
  return menuItems.length !== initialLength;
};
