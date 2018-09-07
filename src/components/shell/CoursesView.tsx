import * as React from "react";
import SplitPane from "react-split-pane";

import Course, { CourseRegex }  from "../utils/Course";
import LocalStorage from "../utils/LocalStorage";
import GraphContainer from "./graph/GraphContainer";
import GraphLegend from "./graph/GraphLegend";
import SelectedCourseInfo from "./SelectedCourseInfo";

import './css/CourseView.css';

interface ICourseViewProps {
    searchedCourse?: Course;
}

interface ICourseViewState {
    selectedCourse?: Course;
    isResizing: boolean;
    panelSize: number;
}

class CoursesView extends React.Component<ICourseViewProps, ICourseViewState> { 
    public state: ICourseViewState = {
        isResizing: false,
        panelSize: 0,
    }
    
    public render() {
        const { searchedCourse } = this.props;
        const { selectedCourse, isResizing, panelSize } = this.state;

        return (
            <div className="CourseView">
                <SplitPane
                    split="vertical"
                    minSize={0.2 * window.innerWidth}
                    size={panelSize}
                    maxSize={0.5 * window.innerWidth}
                    primary="second"
                    style={{
                        height: "inherit"
                    }}
                    className="CourseView-splitPane"
                    onDragStarted={this.handleOnDragStart}
                    onDragFinished={this.handleOnDragEnd}
                    onChange={this.handleOnPanelResize}
                >
                    <div className="CourseView-Graph">
                        <GraphLegend />
                        <GraphContainer 
                            searchedCourse={searchedCourse}
                            selectedCourse={selectedCourse}
                            onCourseSelect={this.handleGraphCourseSelect}
                            isResizing={isResizing}
                        />
                    </div>
                    <SelectedCourseInfo
                        onCourseLinkClick={this.handleCourseLinkClick} 
                        course={!!selectedCourse ? selectedCourse : searchedCourse}
                        isResizing={isResizing}  
                    />
                </SplitPane>
            </div>
        );
    }

    public componentDidMount(){
        let panelSize = LocalStorage.GetPanelSize();

        if(panelSize === undefined) {
            panelSize = 0.3 * window.innerWidth;
            LocalStorage.SetPanelSize(panelSize);
        } 
        
        this.setState( { panelSize } );
    }

    public componentDidUpdate(prevProps: ICourseViewProps, prevState: ICourseViewState){
        if (prevProps.searchedCourse !== this.props.searchedCourse){
            this.setState( { selectedCourse: undefined });
        }
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

    private handleGraphCourseSelect = (courseName: string) => {
        const selectedCourse = new Course(courseName);
        this.setState({ selectedCourse });
    }
    
    private handleOnDragStart = () => {
        this.setState( {isResizing: true} );
    }

    private handleOnDragEnd = () => {
        this.setState( {isResizing: false} );
    }

    private handleOnPanelResize = (newSize: number) => {
        LocalStorage.SetPanelSize(newSize);
        this.setState( { panelSize : newSize });
    }
}

export default CoursesView;