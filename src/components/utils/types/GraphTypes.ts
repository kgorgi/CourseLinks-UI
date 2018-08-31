import { Edge, Node } from "vis";

export interface ICustomNode extends Node {
    level?: number;
}

export interface ICustomEdge extends Edge {
    type?: string;
    color?: IEdgeColor;
}

export interface IEdgeColor {
    color?: string;
    highlight?: string;
}

export interface IGraphData {
    nodes: ICustomNode[];
    edges: ICustomEdge[];
}

export interface IEvents {
    [key: string]: (properties: any) => void;
}