'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Plus, List } from 'lucide-react'

const lists = [
  { title: 'Best Albums of 2026', albums: 24, collaborators: 8, isCollaborative: true, updatedAt: '2 hours ago' },
  { title: 'Essential Indie Picks', albums: 15, collaborators: 3, isCollaborative: true, updatedAt: '1 day ago' },
  { title: 'My Desert Island Discs', albums: 10, collaborators: 1, isCollaborative: false, updatedAt: '3 days ago' },
  { title: 'Perfect Study Albums', albums: 18, collaborators: 12, isCollaborative: true, updatedAt: '5 days ago' },
  { title: 'Swiftie Essentials', albums: 13, collaborators: 6, isCollaborative: true, updatedAt: '1 week ago' },
]

export function ListsView() {
  const [showNew, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  return (
    <>
      <Header title="Collaborative Lists" />

      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-slate-500 dark:text-gray-300/70">{lists.length} lists</p>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 dark:bg-teal-300 text-cream-50 dark:text-slate-900 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors"
        >
          <Plus size={16} /> New List
        </button>
      </div>

      {showNew && (
        <div className="bg-cream-100 dark:bg-charcoal-800 border border-teal-500/30 rounded-xl p-4 mb-4 flex gap-3">
          <input
            autoFocus
            type="text"
            placeholder="List name..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 px-3 py-2 border border-brown-600/20 dark:border-gray-400/30 rounded-lg bg-cream-50 dark:bg-charcoal-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={() => { setShowNew(false); setNewTitle('') }}
            className="px-4 py-2 bg-teal-500 dark:bg-teal-300 text-cream-50 dark:text-slate-900 rounded-lg text-sm font-semibold"
          >
            Create
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {lists.map((list) => (
          <div key={list.title} className="bg-cream-100 dark:bg-charcoal-800 border border-brown-600/12 dark:border-gray-400/20 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 dark:bg-teal-300/10 flex items-center justify-center">
                <List size={18} className="text-teal-500 dark:text-teal-300" />
              </div>
              <div>
                <h3 className="font-semibold">{list.title}</h3>
                <p className="text-xs text-slate-500 dark:text-gray-300/70">
                  {list.albums} albums • {list.collaborators} {list.collaborators === 1 ? 'person' : 'people'} • Updated {list.updatedAt}
                </p>
              </div>
            </div>
            {list.isCollaborative && (
              <span className="text-xs px-2 py-1 bg-teal-500/10 dark:bg-teal-300/10 text-teal-600 dark:text-teal-300 rounded-full font-medium">
                Collab
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
