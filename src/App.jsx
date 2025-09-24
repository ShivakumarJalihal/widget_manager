import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Category from './components/Category';
import WidgetLibrary from './components/WidgetLibrary';

export default function App() {
  const categories = useSelector(state => state.widgets.categories);
  const widgets = useSelector(state => state.widgets.widgets);
  const [libOpen, setLibOpen] = useState(false);

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>CNAPP Dashboard</h1>
        <div className="controls">
          <button onClick={() => setLibOpen(true)}>+ Add Widget</button>
        </div>
      </header>

      <main className="dashboard-grid">
        {Object.values(categories).map(cat => (
          <Category key={cat.id} category={cat} widgets={widgets} />
        ))}
      </main>

      {libOpen && (
        <WidgetLibrary onClose={() => setLibOpen(false)} categories={categories} widgets={widgets} />
      )}

      <footer className="app-footer">Widget Manager by Shivakumar</footer>
    </div>
  );
}
