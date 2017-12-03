import * as React from "react";
import * as SplitPane from "react-split-pane";
import CourseInfo from "./CourseInfo";
import GraphContainer from "./GraphContainer";
import { Course } from "./Course";
import "./css/App.css";

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

  handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ courseToSearch: event.target.value });
  }

  handleSearchSubmit = () => {
    const { courseToSearch } = this.state;
    const courseSpilt = courseToSearch.split(" ");
    const newCourse: Course = {
      name: courseToSearch,
      fieldOfStudy: courseSpilt[0],
      courseNum: courseSpilt[1]
    };
    this.setState({ searchedCourse: newCourse });
  }

  render() {
    const { courseToSearch, searchedCourse } = this.state;

    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize={600} primary="second" allowResize={false} >
          <div>
            <input type="text" value={courseToSearch} onChange={this.handleSearchInput} />
            <button type="button" onClick={this.handleSearchSubmit} > Search </button>
            <span> Current Course: {searchedCourse ? searchedCourse.name : ""} </span>
            <br />
            <GraphContainer course={searchedCourse}/>
          </div>
          <CourseInfo course={searchedCourse} />
        </SplitPane>
      </div>
    );
  }
}

export default App;
