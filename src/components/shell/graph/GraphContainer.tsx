import * as React from "react";
import Graph from "react-graph-vis";
import { Network, Color } from "vis";

import { GraphInfo } from "../../utils/types/ServerTypes";
import Course from "../../utils/Course";
import DependencyTypes from "../../utils/types/DependencyTypes";
import IDNameMap from "../../utils/IDNameMap";
import { CustomEdge, CustomNode, GraphData, Events } from "../../utils/types/GraphTypes";

import GraphBar from "./GraphBar";
import GraphOptions from "./GraphOptions";

import "./css/GraphContainer.css";

export interface GraphContainerProps {
  graphInfo?: GraphInfo;
  onCourseSelect: (name: string) => void;
  onLegendSwitch: () => void;
  currentCourse?: string;
  selectedNode?: Course;
  onHelpButton: () => void;
}

interface GraphContainerState {
  graph?: GraphData;
  events: Events;
  validTypes?: DependencyTypes;
  displayedTypes?: DependencyTypes;
}

class GraphContainer extends React.Component<GraphContainerProps, GraphContainerState> {
  state: GraphContainerState = {
    events: {}
  };

  private graphNetwork: Network;

  private _idNameMap = new IDNameMap();

  private allEdges: CustomEdge[] = [];
  private allNodes: CustomNode[] = [];

  render() {
    const { graph, events, validTypes, displayedTypes } = this.state;
    const { onHelpButton } = this.props;
    return (
      <div className="GraphContainer">
        <GraphBar
          validTypes={validTypes}
          displayTypes={displayedTypes}
          onDisplayPreReqs={this.handleDisplayPreReqs}
          onDisplayCoReqs={this.handleDisplayCoReqs}
          onDisplayPreCoReqs={this.handleDisplayPreCoReqs}
          onHelpButton={onHelpButton}
        />
        {graph && <Graph
          graph={this.state.graph}
          options={GraphOptions}
          events={events}
          style={{ height: "85vh" }}
          getNetwork={this.handleGetGraphNetwork}
        />}
      </div>
    );
  }

  async componentDidUpdate(prevProps: GraphContainerProps, prevState: GraphContainerState) {
    if (prevProps.graphInfo !== this.props.graphInfo) {
      this.createGraph();
    }

    if (prevState.displayedTypes !== this.state.displayedTypes && prevState.displayedTypes) {
      this.updateEdges();
    }

    if (prevProps.onCourseSelect !== this.props.onCourseSelect) {
      this.setState({ events: this.createEvent() });
    }

    const { selectedNode } = this.props;
    if (prevProps.selectedNode !== selectedNode && selectedNode && this.graphNetwork) {
      const id = this._idNameMap.getId(selectedNode.name);
      if (id) {
        this.graphNetwork.selectNodes([id], true);
      }
    }
  }

  private handleDisplayPreReqs = () => {
    const { displayedTypes } = this.state;

    if (displayedTypes) {
      const { preReq, coReq, precoReq } = displayedTypes;
      const newValues = new DependencyTypes(!preReq, coReq, precoReq);
      this.setState({ displayedTypes: newValues });
      this.props.onLegendSwitch();
    }
  }

  private handleDisplayCoReqs = () => {
    const { displayedTypes } = this.state;

    if (displayedTypes) {
      const { preReq, coReq, precoReq } = displayedTypes;
      const newValues = new DependencyTypes(preReq, !coReq, precoReq);
      this.setState({ displayedTypes: newValues });
      this.props.onLegendSwitch();
    }
  }

  private handleDisplayPreCoReqs = () => {
    const { displayedTypes } = this.state;

    if (displayedTypes) {
      const { preReq, coReq, precoReq } = displayedTypes;
      const newValues = new DependencyTypes(preReq, coReq, !precoReq);
      this.setState({ displayedTypes: newValues });
      this.props.onLegendSwitch();
    }
  }

  private handleGetGraphNetwork = (network: Network) => {
    this.graphNetwork = network;
  }

  private updateEdges = () => {
    const { allEdges, allNodes, _idNameMap } = this;

    const { displayedTypes } = this.state;
    if (!allEdges || !allNodes || !displayedTypes) {
      return;
    }

    const nodeMap: Map<string, boolean> = new Map<string, boolean>();

    // Filter Edges
    let edges = allEdges.filter((edge) => {
      const showEdge = (edge.type === "prereq" && displayedTypes.preReq) ||
        (edge.type === "coreq" && displayedTypes.coReq) ||
        (edge.type === "precoreq" && displayedTypes.precoReq);

      if (showEdge) {
        const toNode = _idNameMap.getName(edge.to as number);
        const fromNode = _idNameMap.getName(edge.from as number);
        if (!toNode) {
          console.warn("GraphContainer: UpdateGraph Invalid To Node:", toNode);
          return false;
        }

        if (!fromNode) {
          console.warn("GraphContainer: UpdateGraph Invalid From Node:", fromNode);
          return false;
        }

        if (!nodeMap.has(toNode)) {
          nodeMap.set(toNode, true);
        }

        if (!nodeMap.has(fromNode)) {
          nodeMap.set(fromNode, true);
        }
      }

      return showEdge;

    });

    // If only one type, overwrite the highlight color
    if (displayedTypes.getCount() === 1) {
      edges = edges.map(value => {
        const newEdge = Object.assign({}, value);
        
        if (newEdge.color) {
          const color = newEdge.color.color;
          newEdge.color = {
            color,
            highlight: "orange"
          };
        }

        if (newEdge.id) {
          newEdge.id = undefined;
        }

        return newEdge;
      });
    }

    // Filter Nodes
    const nodes = this.allNodes.filter((node) => {
      return nodeMap.has(node.label as string);
    });

    this.setState({ graph: { nodes, edges } });
    this.clearSelectedNode();
  }

  private createGraph = () => {
    const { graphInfo } = this.props;
    if (!graphInfo) {
      const graph: GraphData = {
        nodes: [],
        edges: []
      };

      this.setState({ graph, validTypes: undefined, displayedTypes: undefined });
      return;
    }
    
    let currId = 0;

    let edges: CustomEdge[] = [];

    const validTypes = new DependencyTypes(false, false, false);

    const  {_idNameMap } = this;
    _idNameMap.clear();

    for (const link of graphInfo.RelationsList) {
      // Create Source Node
      if (!_idNameMap.has(link.Source)) {
        _idNameMap.set(link.Source, currId);
        currId += 1;
      }

      // Create Destionation Node
      if (!_idNameMap.has(link.Destination)) {
        _idNameMap.set(link.Destination, currId);
        currId += 1;
      }

      // Set type and color
      let color = "blue";
      if (link.Type === "coreq") {
        color = "red";
        validTypes.coReq = true;
      } else if (link.Type === "precoreq") {
        color = "green";
        validTypes.precoReq = true;
      } else {
        validTypes.preReq = true;
      }

      // Add Edge
      edges.push({
        to: _idNameMap.getId(link.Source),
        from: _idNameMap.getId(link.Destination),
        color: {
          color,
          highlight: color
        },
        type: link.Type
      });
    }

    // If only one type, overwrite the highlight color
    if (validTypes.getCount() === 1) {
      edges = edges.map(value => {
        if (value.color) {
          value.color.highlight = "orange";
        }

        return value;
      });
    }

    // Set Valid and DisplayedTypes
    const displayedTypes = validTypes.createCopy();
    this.setState({ validTypes, displayedTypes });

    // Add Nodes
    const nodes: CustomNode[] = [];
    const courseKeys = _idNameMap.getAllNames();
    for (const key of courseKeys) {
      const id = _idNameMap.getId(key);
      const level = graphInfo.CourseLevelsInfo[key];

      if (typeof id === "number") {
        const color: Color = {
          background: "#D2E5FF",
          highlight: "orange"
        };

        nodes.push({
          id,
          label: key,
          color,
          level
        });
      } else {
        console.warn("GraphContainer: Invalid Key:", key);
      }
    }

    this.allNodes = nodes;
    this.allEdges = edges;
    console.log(this.allEdges);
    this.setState({ graph: { nodes, edges }, events: this.createEvent() });
    this.clearSelectedNode();
  }

  private createEvent = (): Events => {
    const { onCourseSelect } = this.props;
    const { _idNameMap } = this;
    return {
      selectNode: function (properties: any) {
        const id: number = parseInt(properties.nodes[0], 10);
        onCourseSelect(_idNameMap.getName(id) || "");
      }
    };
  }

  private clearSelectedNode = () => {
    if (this.graphNetwork) {
      this.graphNetwork.unselectAll();
    }
  }
}

export default GraphContainer;
