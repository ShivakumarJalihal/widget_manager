import React from 'react';

export default function AddWidgetModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>Quick Add Widget</h3>
          <button onClick={onClose} aria-label="Close modal">✕</button>
        </div>
        <div className="modal-body">
          <div className="quick-add-content">
            <p>This modal is currently empty. You can use the main widget library to add and manage widgets.</p>
            <div className="actions">
              <button onClick={onClose} className="secondary-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
