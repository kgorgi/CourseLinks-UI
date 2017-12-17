import * as React from "react";
import Graph from "react-graph-vis";
import { Course, GraphInfo, DependencyTypes } from "./Course";
import GraphBar from "./GraphBar";

import "./css/GraphContainer.css";

const options = {
  layout: {
    improvedLayout: false,
    hierarchical: {
      enabled: true,
      levelSeparation: 100,
      nodeSpacing: 100,
      blockShifting: false,
      edgeMinimization: true,
      direction: "UD",        // UD, DU, LR, RL
      sortMethod: "directed"   // hubsize, directedF
    }
  },
  edges: {
    smooth: {
      type: "cubicBezier",
      forceDirection: "vertical"
    },
  },
  interaction: {
    dragNodes: false
  },
  physics: {
    enabled: false
  },
};

export interface GraphContainerProps {
  graphInfo?: GraphInfo;
  onCourseSelect: (name: string) => void;
  currentCourse?: string;
  selectedNode?: Course;
}

interface GraphContainerState {
  graph?: any;
  events: any;
  validTypes?: DependencyTypes;
  displayedTypes?: DependencyTypes;
}

class GraphContainer extends React.Component<GraphContainerProps, GraphContainerState> {
  state: GraphContainerState = {
    events: {}
  };

  private graphNetwork: any;

  private nameLookup: Map<number, string>;
  private idLookup: Map<string, number>;

  private allEdges: any[];
  private allNodes: any[];

  handleDisplayPreReqs = () => {
    const { displayedTypes } = this.state;

    if (displayedTypes) {
      const { preReq, coReq, precoReq } = displayedTypes;
      const newValues = new DependencyTypes(!preReq, coReq, precoReq);
      this.setState({ displayedTypes: newValues });
    }
  }

  handleDisplayCoReqs = () => {
    const { displayedTypes } = this.state;

    if (displayedTypes) {
      const { preReq, coReq, precoReq } = displayedTypes;
      const newValues = new DependencyTypes(preReq, !coReq, precoReq);
      this.setState({ displayedTypes: newValues });
    }
  }

  handleDisplayPreCoReqs = () => {
    const { displayedTypes } = this.state;

    if (displayedTypes) {
      const { preReq, coReq, precoReq } = displayedTypes;
      const newValues = new DependencyTypes(preReq, coReq, !precoReq);
      this.setState({ displayedTypes: newValues });
    }
  }

  updateEdges = () => {
    const { allEdges, allNodes, nameLookup } = this;

    const { displayedTypes } = this.state;
    if (!allEdges || !allNodes || !nameLookup || !displayedTypes) {
      return;
    }

    const nodeMap: Map<string, boolean> = new Map<string, boolean>();

    // Filter Edges
    const edges = allEdges.filter((edge) => {
      const showEdge = (edge.type === "prereq" && displayedTypes.preReq) ||
        (edge.type === "coreq" && displayedTypes.coReq) ||
        (edge.type === "precoreq" && displayedTypes.precoReq);

      if (showEdge) {
        const toNode = nameLookup.get(edge.to);
        const fromNode = nameLookup.get(edge.from);

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

    // Filter Nodes
    const nodes = this.allNodes.filter((node) => {
      return nodeMap.has(node.label);
    });

    this.setState({ graph: { nodes, edges } });
  }

  createGraph = () => {
    const { graphInfo } = this.props;
    if (!graphInfo) {
      return;
    }
    const idMap: Map<string, number> = new Map<string, number>();
    const nameMap: Map<number, string> = new Map<number, string>();
    let currId = 0;

    let edges = [];

    const validTypes = new DependencyTypes(false, false, false);

    for (const link of graphInfo.RelationsList) {
      // Create Source Node
      if (!idMap.has(link.Source)) {
        idMap.set(link.Source, currId);
        nameMap.set(currId, link.Source);
        currId += 1;
      }

      // Create Destionation Node
      if (!idMap.has(link.Destination)) {
        idMap.set(link.Destination, currId);
        nameMap.set(currId, link.Destination);
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
        to: idMap.get(link.Source),
        from: idMap.get(link.Destination),
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
        value.color.highlight = "orange";
        return value;
      });
    }

    // Set Object Dictionaries
    this.idLookup = idMap;
    this.nameLookup = nameMap;

    // Set Valid and DisplayedTypes
    const displayedTypes = validTypes.createCopy();
    this.setState({ validTypes, displayedTypes });

    // Add Nodes
    const nodes = [];
    const courseKeys = Array.from(idMap.keys());
    for (const key of courseKeys) {
      const id = idMap.get(key);
      const level = graphInfo.CourseLevelsInfo[key];

      if (typeof id === "number") {
        nodes.push({
          id,
          label: key,
          color: {
            color: "blue",
            highlight: "orange"
          },
          level
        });
      } else {
        console.warn("GraphContainer: Invalid Key:", key);
      }
    }

    this.allNodes = nodes;
    this.allEdges = edges;
    this.setState({ graph: { nodes, edges }, events: this.createEvent() });
  }

  async componentDidUpdate(prevProps: GraphContainerProps, prevState: GraphContainerState) {
    const { graphInfo } = this.props;
    if (!graphInfo) {
      return;
    }

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
      const id = this.idLookup.get(selectedNode.name);
      if (id) {
        this.graphNetwork.selectNodes([id], true);
      }
    }
  }

  componentDidMount() {
    this.setState({ events: this.createEvent() });
  }

  createEvent = (): any => {
    const { onCourseSelect } = this.props;
    const { nameLookup } = this;
    return {
      selectNode: function (event: any) {
        const id: number = parseInt(event.nodes[0], 10);
        onCourseSelect(nameLookup.get(id) || "");
      }
    };
  }

  handleGetGraphNetwork = (network: any) => {
    this.graphNetwork = network;
  }

  render() {
    const { graph, events, validTypes, displayedTypes } = this.state;
    const graphOptions: any = options;

    if (graph) {
      return (
        <div className="GraphContainer">
          <GraphBar
            validTypes={validTypes}
            displayTypes={displayedTypes}
            onDisplayPreReqs={this.handleDisplayPreReqs}
            onDisplayCoReqs={this.handleDisplayCoReqs}
            onDisplayPreCoReqs={this.handleDisplayPreCoReqs}
          />
          <Graph
            graph={this.state.graph}
            options={graphOptions}
            events={events}
            style={{ height: "85vh" }}
            getNetwork={this.handleGetGraphNetwork}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default GraphContainer;
