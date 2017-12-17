import * as React from "react";

import Title from "./Title";
import GraphContainer from "./GraphContainer";
import CourseInfo from "./CourseInfo";

import { MuiThemeProvider } from "material-ui/styles";
import { createMuiTheme } from "material-ui/styles";

import blue from "material-ui/colors/blue";
import red from "material-ui/colors/red";

import { Course, courseRegex, GraphInfo } from "./Course";
import { LoadCourseJSON } from "./Network";

import "./css/App.css";

const theme = createMuiTheme({
  palette: {
    primary: blue, // Purple and green play nicely together.
    error: red,
  },
});

interface AppState {
  /** The json detailing the course links */
  graphInfo?: GraphInfo;

  /** The current course */
  graphCourse?: Course;
  
  /** The course displayed in the right side information panel */
  displayedInfoCourse?: Course;

  /** The course selected in the graph */
  graphSelectedCourse?: Course;

  /** Whether an error has occured for the user's searched graph */
  invalidCourse: boolean;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    invalidCourse: false
  };

  loadNewGraph = async (course: Course) => {
    try {
      const graphInfo = await LoadCourseJSON(course);
      this.setState({ graphInfo, graphCourse: course, displayedInfoCourse: course });
    } catch {
      this.setState({ invalidCourse: true });
    }
  }

  handleSearchSubmit = (courseStr: string) => {
    const matches = courseRegex.exec(courseStr);
    if (matches && matches[1] && matches[2]) {
      const courseId = matches[1].toLocaleUpperCase() + " " + matches[2];
      this.loadNewGraph(new Course(courseId));
    } else {
      this.setState({ invalidCourse: true });
    }
  }

  handleinfoCourseSelect = (name: string) => {
    const newCourse = new Course(name);
    this.setState({ displayedInfoCourse: newCourse });
  }

  handleGraphCourseSelect = (graphSelectedCourse: Course) => {
    this.setState({ graphSelectedCourse });
  }

  render() {
    const { graphInfo, graphCourse, displayedInfoCourse, graphSelectedCourse, invalidCourse } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <div className="App-graph">
            <Title onSearch={this.handleSearchSubmit} graphCourse={graphCourse} invalidCourse={invalidCourse} />
            <GraphContainer
              graphInfo={graphInfo}
              onCourseSelect={this.handleinfoCourseSelect}
              selectedNode={graphSelectedCourse}
            />
          </div>
          <div className="App-info-pane">
            <CourseInfo course={displayedInfoCourse} onCourseLinkClick={this.handleGraphCourseSelect} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
