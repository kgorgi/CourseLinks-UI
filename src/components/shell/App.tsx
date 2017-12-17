import * as React from "react";

import Title from "./Title";
import GraphContainer from "./GraphContainer";
import CourseInfoPanel from "./CourseInfoPanel";

import { MuiThemeProvider } from "material-ui/styles";
import { createMuiTheme } from "material-ui/styles";

import blue from "material-ui/colors/blue";
import red from "material-ui/colors/red";

import { GraphInfo } from "../utils/ServerTypes";
import Course, { CourseRegex } from "../utils/Course";
import { LoadCourseJSON, LoadCoursesListJSON } from "../utils/Network";

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

  courseList?: string[];
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    invalidCourse: false
  };

  loadNewGraph = async (course: Course) => {
    try {
      const graphInfo = await LoadCourseJSON(course);
      this.setState({ graphInfo, graphCourse: course, displayedInfoCourse: course, graphSelectedCourse: undefined });
    } catch {
      this.setState({ invalidCourse: true });
    }
  }

  handleSearchSubmit = (courseStr: string) => {
    let invalidCourse = true;

    const matches = CourseRegex.exec(courseStr);
    if (!matches) {
      return;
    }

    const fieldOfStudy = matches[1].toLocaleUpperCase();
    const courseNum = matches[2];

    if (fieldOfStudy && courseNum) {

      const id = fieldOfStudy + courseNum;
      if (this.state.courseList && this.state.courseList.indexOf(id) > 0) {
        const course = new Course(fieldOfStudy, courseNum);
        const { graphCourse } = this.state;
        
        if (!graphCourse || !course.equals(graphCourse)) {
          this.loadNewGraph(course);
          invalidCourse = false;
        } else {
          return;
        }
      }
    }

    this.setState({ invalidCourse });
  }

  handleinfoCourseSelect = (name: string) => {
    const newCourse = new Course(name);
    this.setState({ displayedInfoCourse: newCourse });
  }

  handleLinkClicked = (text: string, link: string) => {
    const matches = CourseRegex.exec(text);
    if (matches && matches[1] && matches[2]) {
      const { graphInfo } = this.state;
      if (!graphInfo) {
        console.warn("App: GraphInfo is undefined");
        return;
      }

      const course = new Course(text);
      if (graphInfo.CourseLevelsInfo[text]) {
        this.setState({ graphSelectedCourse: course });
      } else {
        this.loadNewGraph(course);
      }

    } else if (link.startsWith("http")) {
      window.open(link);
    }
  }

  handleLegendSwitch = () => {
    this.setState({ displayedInfoCourse: undefined });
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
              onLegendSwitch={this.handleLegendSwitch}
            />
          </div>
          <div className="App-info-pane">
            <CourseInfoPanel course={displayedInfoCourse} onCourseLinkClick={this.handleLinkClicked} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

  async componentDidMount() {
    const courseList = await LoadCoursesListJSON();
    this.setState({ courseList: courseList.Courses });
  }
}

export default App;
