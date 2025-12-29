import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Note } from '../types'

interface NoteState {
  notes: Note[]

  // Actions
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  togglePin: (id: string) => void

  // Selectors
  getPinnedNotes: () => Note[]
  searchNotes: (query: string) => Note[]
  getNotesByTag: (tag: string) => Note[]
}

const generateId = () => Math.random().toString(36).substring(2, 15)

export const useNoteStore = create<NoteState>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (noteData) => {
        const now = new Date()
        const note: Note = {
          ...noteData,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({ notes: [...state.notes, note] }))
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: new Date() }
              : note
          ),
        }))
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }))
      },

      togglePin: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isPinned: !note.isPinned } : note
          ),
        }))
      },

      getPinnedNotes: () => {
        return get().notes.filter((note) => note.isPinned)
      },

      searchNotes: (query) => {
        const lowerQuery = query.toLowerCase()
        return get().notes.filter(
          (note) =>
            note.title.toLowerCase().includes(lowerQuery) ||
            note.content.toLowerCase().includes(lowerQuery) ||
            note.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        )
      },

      getNotesByTag: (tag) => {
        return get().notes.filter((note) => note.tags.includes(tag))
      },
    }),
    {
      name: 'productivity-notes',
    }
  )
)
