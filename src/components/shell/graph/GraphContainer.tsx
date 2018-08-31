import * as React from 'react';

import Graph from "react-graph-vis";
import { Network as VisGraph } from "vis";

import Course from "../../utils/Course";
import IdNameMap from "../../utils/graph/IdNameMap";
import Network from "../../utils/Network";
import { IGraphInfo } from "../../utils/types/ServerTypes";

import GraphOptions from "../../utils/graph/GraphOptions";

import { IEvents, IGraphData } from "../../utils/types/GraphTypes";

import VisDataConverter from '../../utils/graph/VisDataConverter';

interface IGraphContainerProps {
    searchedCourse?: Course;
    selectedCourse?: Course;
    onCourseSelect: (name: string) => void;
    isResizing: boolean;
}

interface IGraphContainerState {
    graphData?: IGraphData;
    events: IEvents;
}

class GraphContainer extends React.Component<IGraphContainerProps, IGraphContainerState> {  

    public state: IGraphContainerState = {
        events: {}
    }

    private idNameMap: IdNameMap;
    private rawVisGraph: VisGraph;
 
    public render(){
        const { isResizing } = this.props;
        const { graphData, events } = this.state;

        if (graphData && !isResizing){
            return (
                <Graph
                    graph={this.state.graphData}
                    options={GraphOptions}
                    events={events}
                    style={{ height: "calc(100% - 3.5em)" }}
                    getNetwork={this.handleGetRawGraph}
                />
            );
        } else {
            return null;
        }
    }

    public async componentDidUpdate(prevProps: IGraphContainerProps, prevState: IGraphContainerState) {
        if (this.props.searchedCourse !== prevProps.searchedCourse && this.props.searchedCourse){
            this.constructNewGraph(this.props.searchedCourse);
            this.clearSelectNode();
        }
        
        // 
        const { selectedCourse, isResizing } = this.props;
        if( (prevProps.selectedCourse !== selectedCourse || // New Course Selected
             prevProps.isResizing === true && isResizing === false) // Finished Resizing Panels
             && selectedCourse && this.rawVisGraph ){
            const id = this.idNameMap.getId(selectedCourse.name);
            
            if (id) {
                this.rawVisGraph.selectNodes([id], true);
            }
        }
    }

    private handleGetRawGraph = (network: VisGraph) => {
        this.rawVisGraph = network;
      }

    private constructNewGraph = async (course: Course) => {
        const graphInfo: IGraphInfo = await Network.LoadCourseJSON(course);
        const dataConverter = new VisDataConverter(graphInfo);

        this.idNameMap = dataConverter.getIdNameMap();

        const events = this.createEvents();

        this.setState({
            events,
            graphData: dataConverter.getGraphData(),
        });
    }

    private createEvents = (): IEvents => {
        const { onCourseSelect } = this.props;

        return {
          selectNode: (properties: any) => {
            const id: number = parseInt(properties.nodes[0], 10);
            onCourseSelect(this.idNameMap.getName(id) || "");
          }
        };
    }

    private clearSelectNode = () => {
        if (this.rawVisGraph) {
          this.rawVisGraph.unselectAll();
        }
    }
}

export default GraphContainer;