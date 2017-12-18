import * as React from "react";

import TitleBar from "./TitleBar";
import GraphContainer from "./graph/GraphContainer";
import CourseInfoPanel from "./CourseInfoPanel";

import { MuiThemeProvider } from "material-ui/styles";
import { createMuiTheme } from "material-ui/styles";

import blue from "material-ui/colors/blue";
import red from "material-ui/colors/red";
import lightBlue from "material-ui/colors/lightBlue";

import { GraphInfo, Calendar } from "../utils/types/ServerTypes";
import Course, { CourseRegex } from "../utils/Course";
import { LoadCourseJSON, LoadCoursesListJSON, LoadCalendarJSON } from "../utils/Network";
import AboutModal from "../utils/modals/AboutModal";
import HelpModal from "../utils/modals/HelpModal";

import "./css/App.css";

const theme = createMuiTheme({
  palette: {
    primary: blue, 
    secondary: lightBlue,
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

  /** The list of currently available courses */
  courseList?: string[];

  /** The current calendar */
  calendarUri?: string;

  /** The current list of calendars */
  calendarList?: Calendar[];

  /** Controls if the about modal is open */
  aboutOpen: boolean;

  /** Controls if the help modal is open */
  helpOpen: boolean;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    invalidCourse: false,
    aboutOpen: true,
    helpOpen: false
  };

  loadNewGraph = async (course: Course) => {
    const { calendarUri } = this.state;
    if (!calendarUri) {
      return;
    }

    try {
      const graphInfo = await LoadCourseJSON(course, calendarUri);
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
        this.setState({ graphSelectedCourse: course, displayedInfoCourse: course });
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

  // About Modal Handlers
  handleAboutClicked = () => {
    const aboutOpen = !this.state.aboutOpen;
    this.setState({ aboutOpen });
  }

  handleHelpClicked = () => {
    const helpOpen = !this.state.helpOpen;
    this.setState({ helpOpen });
  }

  handleGetStarted = () => {
    this.handleAboutClicked();
    this.handleHelpClicked();
  }

  handleNewCalendar = async (calendarUri: string) => {
    // Reset App
    this.setState({ calendarUri });
  }

  render() {
    const {
      graphInfo,
      graphCourse,
      displayedInfoCourse,
      graphSelectedCourse,
      invalidCourse,
      aboutOpen,
      helpOpen,
      calendarList,
      calendarUri
    } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <div className="App-graph">
            <TitleBar
              onSearch={this.handleSearchSubmit}
              graphCourse={graphCourse}
              invalidCourse={invalidCourse}
              openAboutModal={this.handleAboutClicked}
            />
            <GraphContainer
              graphInfo={graphInfo}
              onCourseSelect={this.handleinfoCourseSelect}
              selectedNode={graphSelectedCourse}
              onLegendSwitch={this.handleLegendSwitch}
              onHelpButton={this.handleHelpClicked}
            />
          </div>
          <div className="App-info-pane">
            <CourseInfoPanel 
              course={displayedInfoCourse} 
              onCourseLinkClick={this.handleLinkClicked} 
              calendarUri={calendarUri} 
            />
          </div>
          <AboutModal
            onClose={this.handleAboutClicked}
            open={aboutOpen}
            onGetStarted={this.handleGetStarted}
            calendars={calendarList}
            currentCalendar={calendarUri}
            onChangeCalendar={this.handleNewCalendar}
          />
          <HelpModal onClose={this.handleHelpClicked} open={helpOpen} />
        </div>
      </MuiThemeProvider>
    );
  }

  async componentDidUpdate(prevProps: any, prevState: AppState) {
    const { calendarUri } = this.state;
    if (prevState.calendarUri !== calendarUri && calendarUri) {
      // Reset App
      const courseList = await LoadCoursesListJSON(calendarUri);
      this.setState({
        courseList: courseList.Courses,
        graphInfo: undefined,
        graphCourse: undefined,
        displayedInfoCourse: undefined,
        graphSelectedCourse: undefined,
        invalidCourse: false,
      });
    }
  }

  async componentDidMount() {
    const calendarList = await LoadCalendarJSON();
    this.setState({ calendarList, calendarUri: calendarList[0].uri });

  }
}

export default App;
