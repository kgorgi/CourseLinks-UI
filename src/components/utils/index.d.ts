declare module "react-graph-vis" {
    import { Edge, Options, Network, Node } from "vis";

    interface IGraphProps {
        graph: IGraphData;
        options: Options;
        events: IEvents;
        getNetwork: (network: Network) => void;
        style: any;
    }

    export default class Graph extends React.Component<IGraphProps> { }

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
}