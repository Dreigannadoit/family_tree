import React, { useState, useEffect } from 'react';

export default function EditModal({ node, onSave, onClose }) {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [dod, setDod] = useState('');

    useEffect(() => {
        if (node) {
            setName(node.data.name || '');
            setDob(node.data.dob || '');
            setDod(node.data.dod || '');
        }
    }, [node]);

    if (!node) return null;

    const handleSave = () => {
        onSave(node.id, { name, dob, dod });
    };

    return (
        <div className="edit-modal-backdrop">
            <div className="edit-modal-container">
                <h2>Edit Person</h2>
                <div className="edit-modal-field">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="edit-modal-field">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </div>
                <div className="edit-modal-field">
                    <label>Date of Death</label>
                    <input
                        type="date"
                        value={dod}
                        onChange={(e) => setDod(e.target.value)}
                    />
                </div>
                <div className="edit-modal-actions">
                    <button className="edit-modal-button cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="edit-modal-button save" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
