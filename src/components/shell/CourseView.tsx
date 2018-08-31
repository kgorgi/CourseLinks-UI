import * as React from "react";
import SplitPane from "react-split-pane";

import Course from "../utils/Course";
import GraphContainer from "./graph/GraphContainer";
import GraphLegend from "./graph/GraphLegend";
import SelectedCourseInfo from "./SelectedCourseInfo";

import { CourseRegex } from "../utils/Course";

import './css/CourseView.css';

interface ICourseViewProps {
    searchedCourse?: Course;
    calendarUri?: string;
}

interface ICourseViewState {
    selectedCourse?: Course;
    isResizing: boolean;
}

class CourseView extends React.Component<ICourseViewProps, ICourseViewState> { 
    public state: ICourseViewState = {
        isResizing: false,
    }
    
    public render() {
        const { searchedCourse, calendarUri } = this.props;
        const { selectedCourse, isResizing } = this.state;

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
                    onDragStarted={this.handleOnDragStart}
                    onDragFinished={this.handleOnDragEnd}
                >
                    <div className="CourseView-Graph">
                        <GraphLegend />
                        <GraphContainer />
                    </div>
                    <SelectedCourseInfo
                        onCourseLinkClick={this.handleCourseLinkClick} 
                        calendarUri={calendarUri}
                        course={!!selectedCourse ? selectedCourse : searchedCourse}
                        isResizing={isResizing}  
                    />
                </SplitPane>
            </div>
        );
    }

    private handleCourseLinkClick = (text: string, link: string) => {
        const matches = CourseRegex.exec(text);
        if (matches && matches[1] && matches[2]) {
            const selectedCourse = new Course(text)
            
            this.setState({ selectedCourse });
        } else if (link.startsWith("http")) {
            window.open(link);
        }
    }
    
    private handleOnDragStart = () => {
        this.setState( {isResizing: true} );
    }

    private handleOnDragEnd = () => {
        this.setState( {isResizing: false} );
    }
}

export default CourseView;