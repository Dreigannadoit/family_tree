import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import PersonNode from './PersonNode';
import CustomEdge from './CustomEdge';
import EditModal from './EditModal';
import 'reactflow/dist/style.css';

const nodeTypes = { person: PersonNode };
const edgeTypes = { 'custom-edge': CustomEdge };

const STORAGE_KEY = 'family-tree-data';

let id = 0;
const getId = () => {
  const storedId = localStorage.getItem('family-tree-last-id');
  if (storedId) {
    id = parseInt(storedId, 10) + 1;
  }
  localStorage.setItem('family-tree-last-id', id.toString());
  return `dndnode_${id++}`;
};

export default function App() {
  const loadState = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const nodesWithHandlers = (parsedData.nodes || []).map(node => ({
          ...node,
          data: {
            ...node.data,
            dob: node.data.dob || '', // Ensure empty string if no date
            dod: node.data.dod || '', // Ensure empty string if no date
            onEdit: () => {
              setSelectedNode(node);
              setShowEditModal(true);
            },
            onDelete: () => handleDeleteNode(node.id),
          }
        }));
        return {
          nodes: nodesWithHandlers,
          edges: parsedData.edges || []
        };
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
    return { nodes: [], edges: [] };
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(loadState().nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(loadState().edges);
  const [personName, setPersonName] = useState('');
  const [dob, setDob] = useState('');
  const [dod, setDod] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const saveState = () => {
      const dataToSave = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: {
            name: node.data.name,
            dob: node.data.dob,
            dod: node.data.dod
            // Don't save the functions here
          }
        })),
        edges
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    };

    saveState();
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: 'custom-edge', animated: true }, eds)
      ),
    [setEdges]
  );

  const addPerson = () => {
    if (!personName.trim()) return;

    const newNode = {
      id: getId(),
      type: 'person',
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: {
        name: personName,
        dob: dob || '', // Ensure empty string if no date
        dod: dod || '', // Ensure empty string if no date
        onEdit: () => {
          setSelectedNode(newNode);
          setShowEditModal(true);
        },
        onDelete: () => handleDeleteNode(newNode.id),
      },
    };
    setNodes((nds) => nds.concat(newNode));
    setPersonName('');
    setDob('');
    setDod('');
  };


  const handleDeleteNode = (nodeId) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    setEdges((edges) =>
      edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  const handleUpdateNode = (nodeId, newData) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId
          ? {
            ...node,
            data: {
              ...node.data,
              ...newData,
              onEdit: node.data.onEdit,
              onDelete: node.data.onDelete,
            },
          }
          : node
      )
    );
    setShowEditModal(false);
  };

  return (
    <div className="app-container">
      <div className="reactflow-area">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>
      <div className="sidebar">
        <h2>Add a Person</h2>
        <input
          type="text"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          placeholder="Name"
        />
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <label>Date of Death</label>
          <input
            type="date"
            value={dod}
            onChange={(e) => setDod(e.target.value)}
          />
        </div>
        <button onClick={addPerson}>Add Person</button>
      </div>

      {showEditModal && (
        <EditModal
          node={selectedNode}
          onSave={handleUpdateNode}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}