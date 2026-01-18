import type { Project } from '../types'

export const filterProjectsByStatus = (projects: Project[], status: string): Project[] => {
  if (status === 'all') return projects
  return projects.filter(p => p.status === status)
}

export const filterProjectsBySearch = (projects: Project[], query: string): Project[] => {
  if (!query.trim()) return projects
  const lowerQuery = query.toLowerCase()
  return projects.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  )
}

export const sortProjects = (projects: Project[], sortBy: 'name' | 'updated' = 'updated'): Project[] => {
  const sorted = [...projects]
  if (sortBy === 'name') {
    sorted.sort((a, b) => a.name.localeCompare(b.name))
  } else {
    sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }
  return sorted
}

export const applyAllFilters = (
  projects: Project[],
  filters: { status: string; search: string; sort: 'name' | 'updated' }
): Project[] => {
  let result = filterProjectsByStatus(projects, filters.status)
  result = filterProjectsBySearch(result, filters.search)
  result = sortProjects(result, filters.sort)
  return result
}
