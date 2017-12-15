import * as React from "react";
import Graph from "react-graph-vis";
import { GraphInfo, DependencyTypes } from "./Course";
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
}

interface GraphContainerState {
  graph?: any;
  events: any;
  validTypes?: DependencyTypes;
  displayedTypes?: DependencyTypes;
  allEdges?: any[];
}

class GraphContainer extends React.Component<GraphContainerProps, GraphContainerState> {
  state: GraphContainerState = {
    events: {}
  };

  private nameLookup: Map<number, string> = new Map<number, string>();
  private idLookup: Map<string, number> = new Map<string, number>();

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
    const { graphInfo } = this.props;
    const { idLookup } = this;
    const { displayedTypes, graph } = this.state;

    if (!idLookup || !graphInfo || !displayedTypes) {
      return;
    }

    const edges = [];
    const multipleTypes = displayedTypes.getCount() !== 1;
    for (const link of graphInfo.RelationsList) {

      let color = "blue";

      if (link.Type === "coreq") {
        color = "red";
      } else if (link.Type === "precoreq") {
        color = "green";
      }

      const hidden = !((link.Type === "prereq" && displayedTypes.preReq) ||
        (link.Type === "coreq" && displayedTypes.coReq) ||
        (link.Type === "precoreq" && displayedTypes.precoReq));

      edges.push({
        to: idLookup.get(link.Source),
        from: idLookup.get(link.Destination),
        color: {
          color,
          highlight: multipleTypes ? color : "orange"
        },
        hidden

      });

    }

    const { nodes } = graph;
    return { nodes, edges };
  }

  createGraph = (graphInfo: GraphInfo) => {
    const idMap: Map<string, number> = new Map<string, number>();
    let currId = 0;

    let edges = [];

    const validTypes = new DependencyTypes(false, false, false);

    for (const link of graphInfo.RelationsList) {
      if (!idMap.has(link.Source)) {
        idMap.set(link.Source, currId);
        this.nameLookup.set(currId, link.Source);
        currId += 1;
      }

      if (!idMap.has(link.Destination)) {
        idMap.set(link.Destination, currId);
        this.nameLookup.set(currId, link.Destination);
        currId += 1;
      }

      let color = "blue";
      let title = "Prerequisite";

      if (link.Type === "coreq") {
        color = "red";
        title = "Corequisite";
        validTypes.coReq = true;
      } else if (link.Type === "precoreq") {
        color = "green";
        title = "Pre or corequisite";
        validTypes.precoReq = true;
      } else {
        validTypes.preReq = true;
      }

      edges.push({
        to: idMap.get(link.Source),
        from: idMap.get(link.Destination),
        color: {
          color,
          highlight: color
        },
        title,
      });

    }

    this.idLookup = idMap;

    const { preReq, coReq, precoReq } = validTypes;
    const displayedTypes = new DependencyTypes(preReq, coReq, precoReq);
    this.setState({ validTypes, displayedTypes });

    // If only one type, overwrite the highlight color
    if (validTypes.getCount() === 1) {
      edges = edges.map(value => {
        value.color.highlight = "orange";
        return value;
      });
    }

    const nodes = [];
    const courseKeys = Array.from(idMap.keys());
    for (const key of courseKeys) {
      const id = idMap.get(key);
      let level = 0;
      for (const course of graphInfo.CourseLevelsInfo) {
        if (course.CourseId === key && graphInfo.course.name !== key) {
          level = course.Level;
        }
      }

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
      }
    }

    return { nodes, edges };
  }

  async componentDidUpdate(prevProps: GraphContainerProps, prevState: GraphContainerState) {
    const { graphInfo } = this.props;
    if (!graphInfo) {
      return;
    }

    if (prevProps.graphInfo !== this.props.graphInfo) {
      const graph = this.createGraph(graphInfo);
      this.setState({ graph });
    }

    if (prevState.displayedTypes !== this.state.displayedTypes) {
      const graph = this.updateEdges();
      this.setState({ graph });
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

  componentWillReceiveProps(nextProps: GraphContainerProps) {
    if (nextProps.onCourseSelect !== this.props.onCourseSelect) {
      this.setState({ events: this.createEvent() });
    }
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
          <Graph graph={this.state.graph} options={graphOptions} events={events} style={{ height: "85vh" }} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default GraphContainer;
