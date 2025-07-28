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

  const calculateAge = (birthDate, deathDate = null) => {
    if (!birthDate) return 'Unknown age';

    const birth = new Date(birthDate);
    const today = new Date();
    const endDate = deathDate ? new Date(deathDate) : today;

    if (isNaN(birth.getTime()) || isNaN(endDate.getTime())) {
      return 'Invalid date';
    }

    let age = endDate.getFullYear() - birth.getFullYear();
    const monthDiff = endDate.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
  };

  const getGenderDisplay = () => {
    switch (data.gender) {
      case 'male':
        return 'M'; 
      case 'female':
        return 'F'; 
      default:
        return '';
    }
  };

  const getAgeText = () => {
    if (!data.dob) return '';

    const age = calculateAge(data.dob, data.dod);
    if (data.dod) {
      return `Age at death: ${age}`;
    } else {
      return `Current age: ${age}`;
    }
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

      <div className="member-info">
        <div className="member-header">
          <strong className="member-name">{data.name}</strong>
          <span className={`gender-icon ${data.gender == "male" ? "male" : "female"}`} >{getGenderDisplay()}</span>
        </div>
        <p className="member-detail">Born: {formatDate(data.dob)}</p>
        {data.dod && <p className="member-detail">Died: {formatDate(data.dod)}</p>}
        {data.dob && <p className="member-age">{getAgeText()}</p>}
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