import * as React from "react";
import Graph from "react-graph-vis";
import { CourseLink } from "./Course";
import blue from "material-ui/colors/blue";

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
  }
};

export interface GraphContainerProps {
  graphInfo?: any;
  onCourseSelect: (name: string) => void;
}

interface GraphContainerState {
  graph?: any;
  events: any;
}

class GraphContainer extends React.PureComponent<GraphContainerProps, GraphContainerState> {
  state: GraphContainerState = {
    events: {}
  };

  private nameLookup: Map<number, string> = new Map<number, string>();

  createGraph = (links: CourseLink[]) => {
    const idMap: Map<string, number> = new Map<string, number>();
    const levelMap: Map<string, number> = new Map<string, number>();

    let currId = 0;

    const edges = [];

    for (const link of links) {
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

      const mapValue = levelMap.get(link.Destination);
      if (mapValue) {
        if (link.Level > mapValue) {
          levelMap.set(link.Destination, link.Level);
        }
      } else {
        levelMap.set(link.Destination, link.Level);
        if (link.Level === 1) {
          levelMap.set(link.Source, 0);
        }
      }

      let color = "blue";
      let title = "Prerequisite";
      if (link.Type === "coreq") {
        color = "red";
        title = "Corequisite";
      } else if (link.Type === "precoreq") {
        color = "green";
        title = "Pre or corequisite";
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

    const nodes = [];
    const courseKeys = Array.from(idMap.keys());

    for (const course of courseKeys) {
      const id = idMap.get(course);
      nodes.push({
        id,
        label: course,
        color: blue,
        level: levelMap.get(course)
      });
    }

    return { nodes, edges };
  }

  async componentDidUpdate(prevProps: GraphContainerProps) {
    const { graphInfo } = this.props;
    if (!graphInfo) {
      return;
    }

    if (prevProps.graphInfo !== this.props.graphInfo) {
      const graph = this.createGraph(graphInfo.RelationsList);
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
    const { graph, events } = this.state;
    if (graph) {
      return (
        <div className="GraphContainer">
          <Graph graph={this.state.graph} options={options} events={events} style={{ height: "94vh" }} />
        </div>
      );
    }

    return null;
  }
}

export default GraphContainer;
