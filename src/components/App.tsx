import * as React from "react";

import Title from "./Title";
import GraphContainer from "./GraphContainer";
import CourseInfo from "./CourseInfo";

import { MuiThemeProvider } from "material-ui/styles/";
import { createMuiTheme } from "material-ui/styles/";
import purple from "material-ui/colors/purple";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";

import { Course } from "./Course";

import "./css/App.css";

const theme = createMuiTheme({
  palette: {
    primary: purple, // Purple and green play nicely together.
    secondary: {
      ...green,
      A400: "#00e677",
    },
    error: red,
  },
});

interface AppState {
  searchedCourse?: Course;
  courseToSearch: string;
  infoCourse: string;
}

class App extends React.Component<{}, AppState> {

  state: AppState = {
    courseToSearch: "",
    infoCourse: "",
  };

  handleSearchSubmit = (strCourse: string) => {
    const courseSpilt = strCourse.split(" ");
    const newCourse: Course = {
      name: strCourse,
      fieldOfStudy: courseSpilt[0],
      courseNum: courseSpilt[1]
    };
    this.setState({ searchedCourse: newCourse });
  }

  render() {
    const { searchedCourse } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <div className="App-graph">
            <Title onSearch={this.handleSearchSubmit} selectedCourse={searchedCourse}/>
            <GraphContainer course={searchedCourse} />
          </div>
          <div className="App-info-pane ">
            <CourseInfo course={searchedCourse} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
