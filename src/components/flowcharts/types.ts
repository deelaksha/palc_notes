
export interface FlowchartNode {
    id: string;
    label: string;
    position: { x: number; y: number };
  }
  
  export interface FlowchartEdge {
    from: string;
    to: string;
    label: string;
  }
  
  export interface FlowchartProps {
    nodes: FlowchartNode[];
    edges: FlowchartEdge[];
    steps: string[];
  }
  