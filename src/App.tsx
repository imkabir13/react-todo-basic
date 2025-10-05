import React, { useEffect, useMemo, useState } from 'react'

type Todo = {
  id: string
  title: string
  done: boolean
  createdAt: number
}

const STORAGE_KEY = 'react-todo-basic:v1'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
  })
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(e: React.FormEvent) {
    e.preventDefault()
    const title = input.trim()
    if (!title) return
    setTodos(prev => [{ id: crypto.randomUUID(), title, done: false, createdAt: Date.now() }, ...prev])
    setInput('')
  }

  function toggle(id: string) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function remove(id: string) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function clearDone() {
    setTodos(prev => prev.filter(t => !t.done))
  }

  const stats = useMemo(() => {
    const total = todos.length
    const done = todos.filter(t => t.done).length
    return { total, done, remaining: total - done }
  }, [todos])

  return (
    <div className="container">
      <h1>My To‑Do List</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a new task…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="New task"
        />
        <button type="submit">Add</button>
      </form>

      <div className="meta">
        {stats.total === 0 ? 'No tasks yet' : `${stats.remaining} remaining of ${stats.total}`}
      </div>

      {todos.length === 0 ? (
        <div className="empty">Start by adding your first task ✨</div>
      ) : (
        <ul>
          {todos.map(t => (
            <li key={t.id} className={t.done ? 'done' : ''}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} aria-label={`Mark ${t.title} as done`} />
              <div className="title">{t.title}</div>
              <div className="actions">
                <button onClick={() => remove(t.id)} aria-label={`Delete ${t.title}`}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {todos.some(t => t.done) && (
        <p style={{ marginTop: 12 }}>
          <button onClick={clearDone}>Clear completed</button>
        </p>
      )}
    </div>
  )
}
