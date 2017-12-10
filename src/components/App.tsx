import * as React from "react";

import Title from "./Title";
import GraphContainer from "./GraphContainer";
import CourseInfo from "./CourseInfo";

import { MuiThemeProvider } from "material-ui/styles";
import { createMuiTheme } from "material-ui/styles";
import blue from "material-ui/colors/blue";
import red from "material-ui/colors/red";

import { Course } from "./Course";

import "./css/App.css";

const theme = createMuiTheme({
  palette: {
    primary: blue, // Purple and green play nicely together.
    error: red,
  },
});

interface AppState {
  graphInfo?: any;
  infoCourse?: Course;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {};

  handleSearchSubmit = (infoCourse: Course| undefined, graphInfo: any | undefined) => {
    this.setState({ graphInfo, infoCourse });
  }

  handleCourseSelect = (name: string) => {
    const newCourse = new Course(name);
    this.setState({ infoCourse: newCourse });
  }

  render() {
    const { graphInfo, infoCourse } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <div className="App-graph">
            <Title onSearch={this.handleSearchSubmit} />
            <GraphContainer graphInfo={graphInfo} onCourseSelect={this.handleCourseSelect} />
          </div>
          <div className="App-info-pane ">
            <CourseInfo course={infoCourse} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
