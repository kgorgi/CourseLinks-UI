import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Course from "../utils/Course";
import Network from "../utils/Network";
import { ICalendar } from "../utils/types/ServerTypes";

import CoursesView from './CoursesView';
import TitleBar from "./TitleBar";

import './css/App.css';

interface IAppState {
  searchedCourse?: Course;
  
  /** The current list of all available calendars */
  calendarList?: ICalendar[];

  /** The current calendar */
  calendar?: ICalendar;

  /** The list of currently available courses */
  courseList?: string[];
}

class App extends React.Component<any, IAppState> {

  public state: IAppState = {};

  public render() {   
    const { searchedCourse } = this.state;

    return (
      <div className="App">
        <CssBaseline />
        <TitleBar 
          courseList={this.state.courseList } 
          onCourseSearch={this.handleSearchCourse}
        />
        <CoursesView searchedCourse={searchedCourse} />
      </div>
    );
  }

  public async componentDidMount() {
    const calendarList = await Network.LoadCalendarJSON();
    this.setState({ calendarList, calendar: calendarList[0] });
  }

  public async componentDidUpdate(prevProps: any, prevState: IAppState) {
    const { calendar } = this.state;
    
    if (prevState.calendar !== calendar && calendar) {    
      Network.SetCalendarUri(calendar.uri);
      
      // Reset App
      const courseList = await Network.LoadCoursesListJSON();
    
      this.setState({
        courseList: courseList.Courses,       
      });
    }
  }

  public handleSearchCourse = (newCourse: Course) => {
    const { searchedCourse } = this.state;

    if(!searchedCourse || !newCourse.equals(searchedCourse)){
      this.setState( {searchedCourse: newCourse} );
    }
  }
}

export default App;
