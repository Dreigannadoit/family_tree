import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const PersonNode = ({ data, isConnectable }) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    data.onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    data.onDelete();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="member">
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="handle"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="handle"
        isConnectable={isConnectable}
      />

      <div>
        <strong>{data.name}</strong>
        <p>Born: {formatDate(data.dob)}</p>
        {data.dod && <p>Died: {formatDate(data.dod)}</p>}
      </div>

      <div className="member-buttons">
        <button 
          onClick={handleEdit}
          className="member-button edit"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete}
          className="member-button delete"
        >
          Delete
        </button>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="handle"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="handle"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(PersonNode);