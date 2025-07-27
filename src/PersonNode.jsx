import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: 'blue',
};

const PersonNode = ({ data, isConnectable }) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    data.onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    data.onDelete();
  };

  return (
    <div className='member'>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={handleStyle}
        isConnectable={isConnectable}
      />

      <div>
        <strong>{data.name}</strong>
        <p style={{ margin: '5px 0 0' }}>Date of Birth: {data.dob}</p>
        {data.dod && <p style={{ margin: '2px 0 0' }}>Date of: {data.dod}</p>}
      </div>

      <div style={{ marginTop: '10px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
        <button 
          onClick={handleEdit}
          style={{ 
            fontSize: '10px', 
            padding: '2px 5px',
            background: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Edit
        </button>
        <button 
          onClick={handleDelete}
          style={{ 
            fontSize: '10px', 
            padding: '2px 5px', 
            background: '#ff4d4d', 
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(PersonNode);