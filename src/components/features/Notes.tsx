import { useState } from 'react'
import { Plus, Pin, Trash2, Search } from 'lucide-react'
import { clsx } from 'clsx'
import { useNoteStore, useAppStore } from '../../store'
import { Button, Card, Input, Textarea, Badge } from '../ui'
import type { Note } from '../../types'

function NoteCard({ note, onSelect }: { note: Note; onSelect: () => void }) {
  const { deleteNote, togglePin } = useNoteStore()

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteNote(note.id)
  }

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation()
    togglePin(note.id)
  }

  return (
    <Card
      variant="interactive"
      className={clsx('animate-fade-in cursor-pointer', note.isPinned && 'border-primary/30')}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-text line-clamp-1">{note.title || 'Untitled'}</h4>
        <div className="flex gap-1">
          <button
            onClick={handlePin}
            className={clsx(
              'p-1.5 rounded-lg transition-colors',
              note.isPinned
                ? 'text-primary bg-primary/10'
                : 'text-text-muted hover:bg-gray-100'
            )}
          >
            <Pin className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-text-muted hover:text-accent-error hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-text-muted line-clamp-3 mb-3">
        {note.content || 'No content'}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {note.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} size="sm" variant="default">
              {tag}
            </Badge>
          ))}
        </div>
        <span className="text-xs text-text-muted">
          {new Date(note.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </Card>
  )
}

function NoteEditor({
  note,
  onClose,
}: {
  note: Note | null
  onClose: () => void
}) {
  const { addNote, updateNote } = useNoteStore()
  const { setMascotMood } = useAppStore()

  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>(note?.tags || [])

  const handleSave = () => {
    if (note) {
      updateNote(note.id, { title, content, tags })
    } else {
      addNote({ title, content, tags, isPinned: false })
      setMascotMood('happy', 'Note saved! Your thoughts are safe with me.')
    }
    onClose()
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text">
          {note ? 'Edit Note' : 'New Note'}
        </h3>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>

      <Input
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />

      <Textarea
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 min-h-[300px] mb-4"
      />

      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="primary"
              className="cursor-pointer"
              onClick={() => removeTag(tag)}
            >
              {tag} ×
            </Badge>
          ))}
        </div>
        <Input
          placeholder="Add tags (press Enter)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
        />
      </div>
    </div>
  )
}

export function Notes() {
  const { notes, searchNotes, getPinnedNotes } = useNoteStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const pinnedNotes = getPinnedNotes()
  const filteredNotes = searchQuery ? searchNotes(searchQuery) : notes
  const unpinnedNotes = filteredNotes.filter((n) => !n.isPinned)

  if (isCreating || selectedNote) {
    return (
      <div className="h-full p-6">
        <NoteEditor
          note={selectedNote}
          onClose={() => {
            setSelectedNote(null)
            setIsCreating(false)
          }}
        />
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto p-6">
      {/* Search & Add */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-surface
                       text-text placeholder:text-text-muted
                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                       transition-all duration-150"
          />
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4" />
          New Note
        </Button>
      </div>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && !searchQuery && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3 flex items-center gap-2">
            <Pin className="w-4 h-4" />
            Pinned
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onSelect={() => setSelectedNote(note)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Notes */}
      <div>
        <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">
          {searchQuery ? `Results (${filteredNotes.length})` : `All Notes (${unpinnedNotes.length})`}
        </h3>
        {(searchQuery ? filteredNotes : unpinnedNotes).length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-text-muted">
              {searchQuery ? 'No notes found' : 'No notes yet. Create one to get started!'}
            </p>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {(searchQuery ? filteredNotes : unpinnedNotes).map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onSelect={() => setSelectedNote(note)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
