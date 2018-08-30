import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import CourseView from './CourseView';
import TitleBar from "./TitleBar";

import './css/App.css';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <CssBaseline />
        <TitleBar onCourseSearch={this.handleSearchCourse}/>
        <CourseView />
      </div>
    );
  }

  private handleSearchCourse (searchText: string){
    return;
  }
}

export default App;
