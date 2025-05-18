
export type Role = 'manager' | 'head_chef' | 'sous_chef' | 'chef' | 'waiter' | 'host' | 'bartender';

export interface TeamMember {
  id: string;
  name: string;
  role: Role;
  bio: string;
  image?: string;
  startDate: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Mock database for team members
let teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Michael Johnson',
    role: 'manager',
    bio: 'Michael has over 15 years of experience in restaurant management and has been with City West Restobar since its opening.',
    image: '/placeholder.svg',
    startDate: '2020-01-15',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Sophia Rivera',
    role: 'head_chef',
    bio: 'Award-winning chef with a passion for combining traditional techniques with modern flavors.',
    image: '/placeholder.svg',
    startDate: '2020-01-15',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Daniel Chen',
    role: 'bartender',
    bio: 'Mixology specialist who creates our signature cocktails and keeps up with the latest drink trends.',
    image: '/placeholder.svg',
    startDate: '2021-03-10',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Emma Wilson',
    role: 'host',
    bio: 'The friendly face that greets all our guests and ensures a pleasant dining experience from the start.',
    image: '/placeholder.svg',
    startDate: '2021-05-22',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const getAllTeamMembers = (): TeamMember[] => {
  return teamMembers;
};

export const getActiveTeamMembers = (): TeamMember[] => {
  return teamMembers.filter(member => member.isActive);
};

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};

export const createTeamMember = (member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): TeamMember => {
  const newMember = {
    ...member,
    id: (teamMembers.length + 1).toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  teamMembers.push(newMember);
  return newMember;
};

export const updateTeamMember = (id: string, memberData: Partial<TeamMember>): TeamMember | undefined => {
  const index = teamMembers.findIndex(member => member.id === id);
  if (index === -1) return undefined;
  
  teamMembers[index] = {
    ...teamMembers[index],
    ...memberData,
    updatedAt: new Date()
  };
  
  return teamMembers[index];
};

export const deleteTeamMember = (id: string): boolean => {
  const initialLength = teamMembers.length;
  teamMembers = teamMembers.filter(member => member.id !== id);
  return teamMembers.length !== initialLength;
};
