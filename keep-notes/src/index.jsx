import React, { useEffect, useMemo, useRef, useState } from "react";
import "./inde.css";

const COLORS = [
  { id: "paper", label: "Paper" },
  { id: "sun", label: "Sun" },
  { id: "sky", label: "Sky" },
  { id: "mint", label: "Mint" },
  { id: "blush", label: "Blush" },
  { id: "lilac", label: "Lilac" },
];

const STORAGE_KEY = "keep-notes:v1";

const STARTER_NOTES = [
  {
    id: "n1",
    title: "Welcome to Keep Notes",
    body: "Write a note above, pick a color, and pin the ones you need close.",
    color: "sun",
    pinned: true,
  },
  {
    id: "n2",
    title: "Groceries",
    body: "Oats\nLemons\nBasil\nCoffee beans",
    color: "mint",
    pinned: false,
  },
];

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : STARTER_NOTES;
  } catch {
    return STARTER_NOTES;
  }
}

function newId() {
  return "n" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function ColorPicker({ value, onChange }) {
  return (
    <div className="swatches" role="radiogroup" aria-label="Note color">
      {COLORS.map((c) => (
        <button
          key={c.id}
          type="button"
          role="radio"
          aria-checked={value === c.id}
          aria-label={c.label}
          title={c.label}
          className={`swatch swatch--${c.id}${value === c.id ? " is-active" : ""}`}
          onClick={() => onChange(c.id)}
        />
      ))}
    </div>
  );
}

function Composer({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("paper");
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open && bodyRef.current) bodyRef.current.focus();
  }, [open]);

  function reset() {
    setTitle("");
    setBody("");
    setColor("paper");
    setOpen(false);
  }

  function save() {
    if (!title.trim() && !body.trim()) {
      reset();
      return;
    }
    onAdd({ id: newId(), title: title.trim(), body: body.trim(), color, pinned: false });
    reset();
  }

  if (!open) {
    return (
      <button type="button" className="composer composer--closed" onClick={() => setOpen(true)}>
        Take a note…
      </button>
    );
  }

  return (
    <div className={`composer composer--open note--${color}`}>
      <input
        className="composer__title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Note title"
      />
      <textarea
        ref={bodyRef}
        className="composer__body"
        placeholder="Take a note…"
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        aria-label="Note text"
      />
      <div className="composer__bar">
        <ColorPicker value={color} onChange={setColor} />
        <div className="composer__actions">
          <button type="button" className="btn btn--ghost" onClick={reset}>
            Discard
          </button>
          <button type="button" className="btn btn--solid" onClick={save}>
            Save note
          </button>
        </div>
      </div>
    </div>
  );
}

function NoteCard({ note, onPin, onDelete, onColor, onOpen }) {
  return (
    <article className={`note note--${note.color}`}>
      <button type="button" className="note__content" onClick={() => onOpen(note)}>
        {note.title && <h3 className="note__title">{note.title}</h3>}
        {note.body && <p className="note__body">{note.body}</p>}
      </button>
      <div className="note__tools">
        <button
          type="button"
          className={`tool${note.pinned ? " is-on" : ""}`}
          aria-pressed={note.pinned}
          onClick={() => onPin(note.id)}
        >
          {note.pinned ? "Unpin" : "Pin"}
        </button>
        <ColorPicker value={note.color} onChange={(c) => onColor(note.id, c)} />
        <button type="button" className="tool tool--danger" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

function EditModal({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Edit note" onClick={onClose}>
      <div className={`modal__card note--${note.color}`} onClick={(e) => e.stopPropagation()}>
        <input
          className="composer__title"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
        />
        <textarea
          className="composer__body"
          rows={8}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          aria-label="Note text"
        />
        <div className="composer__actions composer__actions--end">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn--solid"
            onClick={() => onSave(note.id, { title: title.trim(), body: body.trim() })}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function NoteSection({ heading, notes, handlers }) {
  if (notes.length === 0) return null;
  return (
    <section className="section" aria-label={heading}>
      <h2 className="section__heading">{heading}</h2>
      <div className="grid">
        {notes.map((n) => (
          <NoteCard key={n.id} note={n} {...handlers} />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [notes, setNotes] = useState(loadNotes);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      /* storage unavailable: notes stay in memory for this session */
    }
  }, [notes]);

  const handlers = {
    onPin: (id) => setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))),
    onDelete: (id) => setNotes((ns) => ns.filter((n) => n.id !== id)),
    onColor: (id, color) => setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, color } : n))),
    onOpen: (note) => setEditing(note),
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => (n.title + " " + n.body).toLowerCase().includes(q));
  }, [notes, query]);

  const pinned = visible.filter((n) => n.pinned);
  const others = visible.filter((n) => !n.pinned);

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Keep Notes home">
          <span className="brand__mark" aria-hidden="true" />
          Keep Notes
        </a>
        <input
          type="search"
          className="search"
          placeholder="Search your notes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search notes"
        />
      </header>

      <main className="main">
        <Composer onAdd={(note) => setNotes((ns) => [note, ...ns])} />

        {notes.length === 0 && <p className="empty">No notes yet. Write your first one above.</p>}
        {notes.length > 0 && visible.length === 0 && (
          <p className="empty">No notes match “{query}”. Try a different word.</p>
        )}

        <NoteSection heading="Pinned" notes={pinned} handlers={handlers} />
        <NoteSection heading={pinned.length ? "Other notes" : "Notes"} notes={others} handlers={handlers} />
      </main>

      {editing && (
        <EditModal
          note={editing}
          onClose={() => setEditing(null)}
          onSave={(id, patch) => {
            setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, ...patch } : n)));
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
