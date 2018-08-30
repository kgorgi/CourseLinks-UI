import * as React from "react";
import SplitPane from "react-split-pane";

import GraphContainer from "./GraphContainer";
import GraphLegend from "./GraphLegend";
import SelectedCourseInfo from "./SelectedCourseInfo";

import './css/CourseView.css';

class CourseView extends React.Component {
    public render() {
        return (
            <div className="CourseView">
                <SplitPane
                    split="vertical"
                    minSize={0.2 * window.innerWidth}
                    defaultSize={0.3 * window.innerWidth}
                    maxSize={0.5 * window.innerWidth}
                    primary="second"
                    style={{
                        height: "inherit"
                    }}
                    className="CourseView-splitPane"
                >
                    <div className="CourseView-Graph">
                        <GraphLegend />
                        <GraphContainer />
                    </div>
                    <SelectedCourseInfo />
                </SplitPane>
            </div>
        );
    }
}

export default CourseView;