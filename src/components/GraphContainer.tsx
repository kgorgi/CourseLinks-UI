import * as React from "react";
import Graph from "react-graph-vis";
import { Course, CourseLink } from "./Course";

import "./css/GraphContainer.css";

const serverUrl = "http://amandeep-laptop/Data/";

const options = {
  layout: {
    hierarchical: true
  },
  edges: {
    color: "#000000",
  },
  interaction: {
    dragNodes: false
  }
};

export interface GraphContainerProps {
  course?: Course;
}

interface GraphContainerState {
  graph?: any;
}

class GraphContainer extends React.PureComponent<GraphContainerProps, GraphContainerState> {
  state: GraphContainerState = {};

  async componentDidUpdate(prevProps: GraphContainerProps) {
    const { course } = this.props;
    if (!course) {
      return;
    }

    const { fieldOfStudy, courseNum } = course;

    if (prevProps.course !== this.props.course) {
      const response = await fetch(serverUrl + fieldOfStudy + "/" + fieldOfStudy + courseNum + ".json");
      const relations = await JSON.parse(await response.text());
      const graph = createGraph(relations.RelationsList);
      this.setState({ graph });
    }
  }
  render() {
    if(this.state.graph){
      return (
        <Graph graph={this.state.graph} options={options} events={{}} style={{ height: "800px" }} />
      );
    }

    return null;
    
  }
}

export default GraphContainer;

function createGraph(links: CourseLink[]) {
  const idMap: Map<string, number> = new Map<string, number>();
  let currId = 1;

  const edges = [];

  for (const link of links) {
    console.log(link);
    if (!idMap.has(link.Source)) {
      idMap.set(link.Source, currId);
      currId += 1;
    }

    if (!idMap.has(link.Destination)) {
      idMap.set(link.Destination, currId);
      currId += 1;
    }

    edges.push({
      from: idMap.get(link.Source),
      to: idMap.get(link.Destination)
    });
  }

  const nodes = [];
  const courseKeys = Array.from(idMap.keys());

  for (const course of courseKeys) {
    const id = idMap.get(course);
    nodes.push({
      id,
      label: course,
      color: "#e04141"
    });
  }

  return { nodes, edges };
}



