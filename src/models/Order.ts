
// Order model for food orders
import { v4 as uuidv4 } from 'uuid';

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  tableId?: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderType: 'dine-in' | 'takeout' | 'delivery';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: 'cash' | 'card' | 'online';
  createdAt: Date;
  updatedAt: Date;
}

// Mock database for orders
let orders: Order[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '555-123-4567',
    tableId: '1',
    items: [
      { menuItemId: '1', name: 'Caprese Salad', price: 12.99, quantity: 1 },
      { menuItemId: '2', name: 'Grilled Salmon', price: 24.99, quantity: 2 }
    ],
    total: 62.97,
    status: 'delivered',
    orderType: 'dine-in',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000)
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '555-987-6543',
    items: [
      { menuItemId: '3', name: 'Spaghetti Bolognese', price: 18.99, quantity: 1 },
      { menuItemId: '4', name: 'Chocolate Lava Cake', price: 9.99, quantity: 1 }
    ],
    total: 28.98,
    status: 'ready',
    orderType: 'takeout',
    paymentStatus: 'paid',
    paymentMethod: 'online',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    customerName: 'Robert Johnson',
    customerPhone: '555-555-5555',
    tableId: '3',
    items: [
      { menuItemId: '2', name: 'Grilled Salmon', price: 24.99, quantity: 1 },
      { menuItemId: '5', name: 'House Red Wine', price: 8.99, quantity: 2 },
      { menuItemId: '4', name: 'Chocolate Lava Cake', price: 9.99, quantity: 1 }
    ],
    total: 52.96,
    status: 'preparing',
    orderType: 'dine-in',
    paymentStatus: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const getAllOrders = (): Order[] => {
  return orders;
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getOrdersByStatus = (status: Order['status']): Order[] => {
  return orders.filter(order => order.status === status);
};

export const getOrdersByTable = (tableId: string): Order[] => {
  return orders.filter(order => order.tableId === tableId);
};

export const createOrder = (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
  const newOrder = {
    ...order,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  orders.push(newOrder);
  return newOrder;
};

export const updateOrder = (id: string, orderData: Partial<Order>): Order | undefined => {
  const index = orders.findIndex(order => order.id === id);
  if (index === -1) return undefined;
  
  orders[index] = {
    ...orders[index],
    ...orderData,
    updatedAt: new Date()
  };
  
  return orders[index];
};

export const deleteOrder = (id: string): boolean => {
  const initialLength = orders.length;
  orders = orders.filter(order => order.id !== id);
  return orders.length !== initialLength;
};
