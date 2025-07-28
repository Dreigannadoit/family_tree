import React, { useState, useEffect } from 'react';

export default function EditModal({ node, onSave, onClose }) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [dob, setDob] = useState('');
    const [dod, setDod] = useState('');

    useEffect(() => {
        if (node) {
            setName(node.data.name || '');
            setGender(node.data.gender || 'male');
            setDob(node.data.dob || '');
            setDod(node.data.dod || '');
        }
    }, [node]);

    if (!node) return null;

    const handleSave = () => {
        onSave(node.id, { 
            name, 
            gender,
            dob: dob || '', 
            dod: dod || '' 
        });
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
                    <label>Gender</label>
                    <div className="gender-selection">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={() => setGender('male')}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={() => setGender('female')}
                            />
                            Female
                        </label>
                    </div>
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
