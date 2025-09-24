import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleWidgetInCategory, addWidget } from '../features/widgetsSlice';

export default function WidgetLibrary({ onClose, categories, widgets }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const [targetCat, setTargetCat] = useState(Object.keys(categories)[0] || '');

  const filtered = widgets.filter(w => w.name.toLowerCase().includes(query.toLowerCase()) || w.text.toLowerCase().includes(query.toLowerCase()));

  const isInCategory = (widgetId, catId) => categories[catId].widgets.includes(widgetId);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3>Add / Manage Widgets</h3>
          <button onClick={onClose}>Close</button>
        </div>

        <div className="modal-body">
          <div className="row">
            <input placeholder="Search widgets..." value={query} onChange={e => setQuery(e.target.value)} />
          </div>

          <div className="row split">
            <div className="widget-list">
              <h4>All Widgets</h4>
              {filtered.map(w => (
                <div key={w.id} className="list-item">
                  <div>
                    <strong>{w.name}</strong>
                    <div className="muted">{w.text}</div>
                  </div>
                  <div className="checkboxes">
                    {Object.values(categories).map(c => (
                      <label key={c.id} title={c.title}>
                        <input type="checkbox" checked={isInCategory(w.id, c.id)} onChange={e => dispatch(toggleWidgetInCategory({ widgetId: w.id, categoryId: c.id, add: e.target.checked }))} /> {c.title}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="create-widget">
              <h4>Create new widget</h4>
              <label>Name</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Widget name" />
              <label>Text</label>
              <input value={newText} onChange={e => setNewText(e.target.value)} placeholder="Short widget text" />
              <label>Add to category</label>
              <select value={targetCat} onChange={e => setTargetCat(e.target.value)}>
                {Object.values(categories).map(c => (<option key={c.id} value={c.id}>{c.title}</option>))}
              </select>
              <div className="actions">
                <button onClick={() => {
                  if (!newName) return alert('Enter name');
                  dispatch(addWidget({ name: newName, text: newText || 'Sample text', categoryId: targetCat }));
                  setNewName(''); setNewText('');
                }}>Add Widget</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
