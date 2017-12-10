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
  }
};

export interface GraphContainerProps {
  graphInfo?: GraphInfo;
  onCourseSelect: (name: string) => void;
}

interface GraphContainerState {
  graph?: any;
  events: any;
  validTypes?: DependencyTypes;
}

class GraphContainer extends React.PureComponent<GraphContainerProps, GraphContainerState> {
  state: GraphContainerState = {
    events: {}
  };

  private nameLookup: Map<number, string> = new Map<number, string>();

  createGraph = (graphInfo: GraphInfo) => {
    const idMap: Map<string, number> = new Map<string, number>();
    let currId = 0;

    const edges = [];

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

      let color: any = "blue";
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

    this.setState({ validTypes });

    const nodes = [];
    for (const course of graphInfo.CourseLevelsInfo) {
      const id = idMap.get(course.CourseId);
      if (id) {
        nodes.push({
          id,
          label: course.CourseId,
          color: {
            color: "blue",
            highlight: "orange"
          },
          level: course.Level
        });
      }
    }

    return { nodes, edges };
  }

  async componentDidUpdate(prevProps: GraphContainerProps) {
    const { graphInfo } = this.props;
    if (!graphInfo) {
      return;
    }

    if (prevProps.graphInfo !== this.props.graphInfo) {
      const graph = this.createGraph(graphInfo);
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
    const { graph, events, validTypes } = this.state;
    return (
      <div className="GraphContainer">
        <GraphBar validTypes={validTypes} />
        {graph && <Graph graph={this.state.graph} options={options} events={events} style={{ height: "85vh" }} />}
      </div>
    );
  }
}

export default GraphContainer;
