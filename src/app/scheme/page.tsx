'use client';

interface Position {
  x: number;
  y: number;
}

interface NodeData {
  id: string;
  label: string;
  position: Position;
  width?: number;
  height?: number;
}

interface Connection {
  from: string;
  to: string;
  fromSide?: 'left' | 'right' | 'top' | 'bottom';
  toSide?: 'left' | 'right' | 'top' | 'bottom';
}

const nodes: NodeData[] = [
  { id: 'alliksaar', label: 'Алликсаар', position: { x: 180, y: 50 }, width: 180, height: 44 },
  { id: 'duhast', label: 'Ду Хаст\nВячеславович', position: { x: 800, y: 45 }, width: 180, height: 54 },
  { id: 'shirinkina', label: 'Анастасия Ширинкина', position: { x: 800, y: 130 }, width: 180, height: 44 },
  { id: 'klitotehnis', label: 'Станислав\nКлитотехнис', position: { x: 300, y: 200 }, width: 180, height: 54 },
  { id: 'troyan', label: 'Александр Троян', position: { x: 800, y: 205 }, width: 180, height: 44 },
  { id: 'vodolazskaya', label: 'Людмила\nВодолазская', position: { x: 410, y: 300 }, width: 180, height: 54 },
  { id: 'borgdorf', label: 'Ольга Боргдорф', position: { x: 410, y: 380 }, width: 180, height: 44 },
  { id: 'vozinguy', label: 'Дмитрий Возингуй', position: { x: 800, y: 380 }, width: 180, height: 44 },
  { id: 'boltushkina', label: 'Кристина Болтушкина', position: { x: 800, y: 440 }, width: 180, height: 44 },
  { id: 'visyulkin', label: 'Максим Висюлькин', position: { x: 800, y: 500 }, width: 180, height: 44 },
  { id: 'brus', label: 'Сергей Брус', position: { x: 410, y: 520 }, width: 180, height: 44 },
  { id: 'zverek', label: 'Игорь Зверёк', position: { x: 300, y: 600 }, width: 180, height: 44 },
  { id: 'stroy', label: 'Антон Строй', position: { x: 300, y: 680 }, width: 180, height: 44 },
];

const connections: Connection[] = [
  { from: 'duhast', to: 'alliksaar', fromSide: 'left', toSide: 'right' },
  { from: 'shirinkina', to: 'alliksaar', fromSide: 'left', toSide: 'right' },
  { from: 'troyan', to: 'klitotehnis', fromSide: 'left', toSide: 'right' },
  { from: 'vodolazskaya', to: 'klitotehnis', fromSide: 'left', toSide: 'bottom' },
  { from: 'borgdorf', to: 'klitotehnis', fromSide: 'left', toSide: 'bottom' },
  { from: 'brus', to: 'klitotehnis', fromSide: 'left', toSide: 'bottom' },
  { from: 'vozinguy', to: 'borgdorf', fromSide: 'left', toSide: 'right' },
  { from: 'boltushkina', to: 'borgdorf', fromSide: 'left', toSide: 'right' },
  { from: 'visyulkin', to: 'borgdorf', fromSide: 'left', toSide: 'right' },
  { from: 'visyulkin', to: 'vozinguy', fromSide: 'right', toSide: 'right' },
  { from: 'zverek', to: 'alliksaar', fromSide: 'left', toSide: 'bottom' },
  { from: 'stroy', to: 'alliksaar', fromSide: 'left', toSide: 'bottom' },
  { from: 'klitotehnis', to: 'alliksaar', fromSide: 'left', toSide: 'bottom' },

];

export default function Page() {
  const maxRight = Math.max(...nodes.map(n => (n.position.x || 0) + (n.width || 150))) + 50;
  const minWidth = Math.max(maxRight, 1200);
  const diagramHeight = 'calc(100vh - 130px)';

  const getNodeEdgePosition = (id: string, side: 'left' | 'right' | 'top' | 'bottom') => {
    const node = nodes.find(n => n.id === id);
    if (!node) return { x: 0, y: 0 };

    const width = node.width || 150;
    const height = node.height || 40;
    const x = node.position.x;
    const y = node.position.y;

    switch (side) {
      case 'left':
        return { x: x, y: y + height / 2 };
      case 'right':
        return { x: x + width, y: y + height / 2 };
      case 'top':
        return { x: x + width / 2, y: y };
      case 'bottom':
        return { x: x + width / 2, y: y + height };
      default:
        return { x: x + width / 2, y: y + height / 2 };
    }
  };

  const renderLine = (conn: Connection, index: number) => {
    const fromSide = conn.fromSide || 'right';
    const toSide = conn.toSide || 'left';

    const fromPos = getNodeEdgePosition(conn.from, fromSide);
    const toPos = getNodeEdgePosition(conn.to, toSide);

    const visulkinToVozinguy = conn.from === "visyulkin" && conn.to === "vozinguy" ? 20 : 0;
    const shirinkinaToAliksaar = conn.from === "shirinkina" && conn.to === "alliksaar" ? 200 : 0;

    let path = '';

    if (toSide === 'bottom') {
      path = `
        M ${fromPos.x} ${fromPos.y} 
        L ${toPos.x} ${fromPos.y} 
        L ${toPos.x} ${toPos.y + 1}
        L ${toPos.x} ${toPos.y}
      `;
    } else if (fromSide === 'left' || fromSide === 'right') {
      const midX = (fromPos.x + toPos.x) / 2;
      path = `
    M ${fromPos.x} ${fromPos.y} 
    L ${midX + visulkinToVozinguy + shirinkinaToAliksaar} ${fromPos.y} 
    L ${midX + visulkinToVozinguy + shirinkinaToAliksaar} ${toPos.y} 
    L ${toPos.x} ${toPos.y}`;
    } else {
      const midY = (fromPos.y + toPos.y) / 2;
      path = `M ${fromPos.x} ${fromPos.y} L ${fromPos.x} ${midY} L ${toPos.x} ${midY} L ${toPos.x} ${toPos.y}`;
    }

    return (
      <path
        key={index}
        d={path}
        fill="none"
        stroke="#8899aa"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#2d3440]">
      <h1 className="text-white text-2xl font-light pt-20 ps-45">Масоны Самсона</h1>

      <div className="w-full overflow-x-auto">
        <div
          className="relative"
          style={{
            minWidth: `${minWidth}px`,
            height: diagramHeight
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 12 10"
                markerWidth="12"
                markerHeight="10"
                refX="6"
                refY="5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path
                  d="M2,2 L6,5 L2,8"
                  fill="none"
                  stroke="#8899aa"
                  strokeWidth="1"
                />
              </marker>
            </defs>
            {connections.map((conn, idx) => renderLine(conn, idx))}
          </svg>

          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute bg-white px-4 py-2 text-center text-[13px] shadow-md border border-gray-300"
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
                width: `${node.width || 150}px`,
                minHeight: `${node.height || 40}px`,
                whiteSpace: 'pre-line',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1.3',
              }}
            >
              {node.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}