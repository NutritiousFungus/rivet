import React, { useState, useMemo } from 'react'
import './App.css'
import { CURRENT_USER, SAMPLE_PROJECTS } from './constants/userData'
import { applyAllFilters } from './utils/filterUtils'

function App() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'name' | 'updated'>('updated')

  const filteredProjects = useMemo(() => {
    return applyAllFilters(SAMPLE_PROJECTS, {
      status: statusFilter,
      search: searchQuery,
      sort: sortBy
    })
  }, [statusFilter, searchQuery, sortBy])

  const stats = useMemo(() => ({
    total: SAMPLE_PROJECTS.length,
    active: SAMPLE_PROJECTS.filter(p => p.status === 'active').length,
    archived: SAMPLE_PROJECTS.filter(p => p.status === 'archived').length
  }), [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Laboratory Dashboard</h1>
            <p className="text-slate-600 mt-1">Manage your Figma design projects</p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-slate-900">{CURRENT_USER.name}</p>
              <p className="text-xs text-slate-600">{CURRENT_USER.role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <p className="text-slate-600 text-sm font-medium">Total Projects</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <p className="text-slate-600 text-sm font-medium">Active Projects</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
            <p className="text-slate-600 text-sm font-medium">Archived Projects</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.archived}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Projects</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'updated')}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="updated">Recently Updated</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' :
                    project.status === 'archived' ? 'bg-slate-100 text-slate-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-4">{project.description}</p>
                <div className="text-xs text-slate-500 space-y-1">
                  <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                  <p>Updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
                </div>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Open Project
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500 text-lg">No projects found matching your filters.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-600 text-sm">
          <p>© 2025 Laboratory Dashboard. Built with React, Vite, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
