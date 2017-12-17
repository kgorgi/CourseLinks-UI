import { Node, Edge } from "vis";

export interface CustomNode extends Node {
    level?: number;
}

export interface CustomEdge extends Edge {
    type?: string;
    color?: EdgeColor;
}

export interface EdgeColor {
    color?: string;
    highlight?: string;
}

export interface GraphData {
    nodes: CustomNode[];
    edges: CustomEdge[];
}

export interface Events {
    [key: string]: (properties: any) => void;
}