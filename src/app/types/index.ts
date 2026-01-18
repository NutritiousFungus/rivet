export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export interface Project {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  status: 'active' | 'archived' | 'draft'
}

export interface Dashboard {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  totalTeamMembers: number
}
