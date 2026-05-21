import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react';
import type { Connection, Edge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { mockCharacters, mockRelations } from '../data/mockData';
import { Maximize2 } from 'lucide-react';

interface NodeData extends Record<string, unknown> {
  character: typeof mockCharacters[0];
  onExpand: (id: string) => void;
}

const CharacterNode = ({ data }: { data: NodeData }) => {
  const { character, onExpand } = data;
  return (
    <div className="group relative">
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-fabula-border dark:!bg-fabula-border-dark !border-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div 
        className="w-40 bg-white dark:bg-fabula-surface-dark rounded-2xl shadow-subtle border border-fabula-border dark:border-fabula-border-dark p-3 cursor-grab active:cursor-grabbing hover:shadow-float dark:hover:shadow-float-dark transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-sm"
            style={{ backgroundColor: character.color }}
          >
            {character.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{character.name}</div>
            <div className="text-[10px] text-fabula-text-secondary font-medium uppercase tracking-wide">{character.role}</div>
          </div>
        </div>
        <button 
          onClick={() => onExpand(character.id)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-fabula-surface-dark rounded-full shadow-subtle border border-fabula-border dark:border-fabula-border-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-fabula-accent"
        >
          <Maximize2 className="w-3 h-3" strokeWidth={1.5} />
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-fabula-border dark:!bg-fabula-border-dark !border-0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

const nodeTypes = {
  character: CharacterNode,
};

const generateInitialNodes = (): Node<NodeData>[] => {
  const positions = [
    { x: 0, y: 0 },
    { x: 300, y: -100 },
    { x: 300, y: 150 },
    { x: -300, y: -50 },
    { x: -150, y: 250 },
  ];

  return mockCharacters.map((char, index) => ({
    id: char.id,
    type: 'character',
    position: positions[index] || { x: Math.random() * 400, y: Math.random() * 300 },
    data: { character: char, onExpand: (id: string) => console.log('Expand', id) },
  }));
};

const generateInitialEdges = (): Edge[] => {
  return mockRelations.map((rel) => ({
    id: rel.id,
    source: rel.sourceId,
    target: rel.targetId,
    label: rel.label,
    type: 'smoothstep',
    animated: rel.type === 'conflict',
    style: { 
      stroke: rel.type === 'conflict' ? '#ef4444' : rel.type === 'alliance' ? '#3b82f6' : '#a3a3a3',
      strokeWidth: 1.5,
    },
    labelStyle: { 
      fill: '#737373', 
      fontSize: 11,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
    },
    labelBgStyle: { fill: 'rgba(255,255,255,0.9)', rx: 4 },
    labelBgPadding: [4, 8],
    labelBgBorderRadius: 4,
  }));
};

export const MindMap: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState(generateInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(generateInitialEdges());
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ 
      ...params, 
      type: 'smoothstep',
      style: { stroke: '#a3a3a3', strokeWidth: 1.5 },
      labelStyle: { fill: '#737373', fontSize: 11, fontFamily: 'Inter, sans-serif' },
    }, eds)),
    [setEdges],
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  };

  return (
    <div className="h-full w-full flex">
      {/* React Flow Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
          className="bg-fabula-bg dark:bg-fabula-bg-dark"
        >
          <Background 
            color="#e5e5e5" 
            gap={24} 
            size={1}
            className="dark:!bg-fabula-bg-dark"
          />
          <Controls 
            className="!shadow-subtle !border-fabula-border dark:!border-fabula-border-dark !bg-white dark:!bg-fabula-surface-dark !rounded-xl !overflow-hidden"
            showInteractive={false}
          />
          <MiniMap 
            className="!shadow-subtle !border-fabula-border dark:!border-fabula-border-dark !bg-white dark:!bg-fabula-surface-dark !rounded-xl !overflow-hidden"
            maskColor="rgba(0,0,0,0.05)"
            nodeColor={(node) => {
              const char = mockCharacters.find(c => c.id === node.id);
              return char?.color || '#a3a3a3';
            }}
          />
        </ReactFlow>

        {/* Overlay titre */}
        <div className="absolute top-6 left-8 pointer-events-none">
          <h2 className="text-sm font-semibold tracking-tight text-fabula-text dark:text-fabula-text-dark">Réseau des Personnages</h2>
          <p className="text-xs text-fabula-text-secondary mt-1">5 personnages · 6 relations</p>
        </div>
      </div>

      {/* Sidebar de détails (optionnelle, apparaît au clic) */}
      {selectedNode && (
        <div className="w-80 border-l border-fabula-border dark:border-fabula-border-dark bg-white dark:bg-fabula-surface-dark p-6 flex flex-col animate-in slide-in-from-right duration-300">
          {(() => {
            const char = mockCharacters.find(c => c.id === selectedNode);
            if (!char) return null;
            return (
              <>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-medium"
                      style={{ backgroundColor: char.color }}
                    >
                      {char.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{char.name}</h3>
                      <p className="text-xs text-fabula-accent font-medium">{char.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="text-fabula-text-secondary hover:text-fabula-text transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-fabula-text-secondary uppercase tracking-wider">Description</label>
                    <p className="text-sm mt-1 leading-relaxed">{char.description}</p>
                  </div>
                  
                  {char.motivation && (
                    <div>
                      <label className="text-xs font-medium text-fabula-text-secondary uppercase tracking-wider">Motivation</label>
                      <p className="text-sm mt-1">{char.motivation}</p>
                    </div>
                  )}
                  
                  {char.secret && (
                    <div>
                      <label className="text-xs font-medium text-fabula-text-secondary uppercase tracking-wider">Secret</label>
                      <p className="text-sm mt-1 text-fabula-accent">{char.secret}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-medium text-fabula-text-secondary uppercase tracking-wider">Relations</label>
                    <div className="mt-2 space-y-2">
                      {mockRelations
                        .filter(r => r.sourceId === char.id || r.targetId === char.id)
                        .map(rel => {
                          const otherId = rel.sourceId === char.id ? rel.targetId : rel.sourceId;
                          const other = mockCharacters.find(c => c.id === otherId);
                          return (
                            <div key={rel.id} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: other?.color }} />
                              <span className="truncate">{other?.name}</span>
                              <span className="text-xs text-fabula-text-secondary ml-auto">{rel.label}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
