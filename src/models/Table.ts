
// Table model for restaurant tables
export interface Table {
  id: string;
  number: number;
  capacity: number;
  location: 'indoor' | 'outdoor' | 'balcony';
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mock database for tables
let tables: Table[] = [
  {
    id: '1',
    number: 1,
    capacity: 2,
    location: 'indoor',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    number: 2,
    capacity: 4,
    location: 'indoor',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    number: 3,
    capacity: 6,
    location: 'indoor',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    number: 4,
    capacity: 2,
    location: 'outdoor',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    number: 5,
    capacity: 4,
    location: 'outdoor',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    number: 6,
    capacity: 8,
    location: 'balcony',
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const getAllTables = (): Table[] => {
  return tables;
};

export const getTableById = (id: string): Table | undefined => {
  return tables.find(table => table.id === id);
};

export const createTable = (table: Omit<Table, 'id' | 'createdAt' | 'updatedAt'>): Table => {
  const newTable = {
    ...table,
    id: (tables.length + 1).toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  tables.push(newTable);
  return newTable;
};

export const updateTable = (id: string, tableData: Partial<Table>): Table | undefined => {
  const index = tables.findIndex(table => table.id === id);
  if (index === -1) return undefined;
  
  tables[index] = {
    ...tables[index],
    ...tableData,
    updatedAt: new Date()
  };
  
  return tables[index];
};

export const deleteTable = (id: string): boolean => {
  const initialLength = tables.length;
  tables = tables.filter(table => table.id !== id);
  return tables.length !== initialLength;
};
