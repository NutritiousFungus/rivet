import type { User, Project } from '../types'

export const CURRENT_USER: User = {
  id: '1',
  name: 'Design Team',
  email: 'team@figma.example.com',
  role: 'Admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Design'
}

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Dashboard Design',
    description: 'Main application dashboard redesign',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-18',
    status: 'active'
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'Cross-platform mobile experience',
    createdAt: '2024-12-15',
    updatedAt: '2025-01-10',
    status: 'active'
  },
  {
    id: '3',
    name: 'Component Library',
    description: 'Reusable UI components',
    createdAt: '2024-11-20',
    updatedAt: '2025-01-18',
    status: 'active'
  }
]
