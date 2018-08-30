import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { LoadCalendarJSON, LoadCoursesListJSON } from "../utils/Network";
import { ICalendar } from "../utils/types/ServerTypes";

import CourseView from './CourseView';
import TitleBar from "./TitleBar";


import './css/App.css';
interface IAppState {
  currentCourse: string;
  
  /** The current list of calendars */
  calendarList?: ICalendar[];

  /** The current calendar */
  calendarUri?: string;

  /** The list of currently available courses */
  courseList?: string[];
}

class App extends React.Component<any, IAppState> {
  
  public state: IAppState = {
    currentCourse: ""
  };

  public render() {    
    return (
      <div className="App">
        <CssBaseline />
        <TitleBar 
          courseList={this.state.courseList } 
          onCourseSearch={this.handleSearchCourse}
        />
        <CourseView />
      </div>
    );
  }

  public async componentDidMount() {
    const calendarList = await LoadCalendarJSON();
    this.setState({ calendarList, calendarUri: calendarList[0].uri });
  }

  public async componentDidUpdate(prevProps: any, prevState: IAppState) {
    const { calendarUri } = this.state;
    if (prevState.calendarUri !== calendarUri && calendarUri) {
      
      // Reset App
      const courseList = await LoadCoursesListJSON(calendarUri);
      this.setState({
        courseList: courseList.Courses,       
      });
    }
  }

  public handleSearchCourse = (newCourse: string) => {
    if(newCourse !== this.state.currentCourse){
      this.setState( {currentCourse: newCourse} );
    }
  }
}

export default App;
