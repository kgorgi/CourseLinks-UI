import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';


import Course from "../utils/Course";
import { GetCalendar, SetCalendar } from '../utils/LocalStorage';
import Network from "../utils/Network";
import { ICalendar } from "../utils/ServerTypes";

import CalendarModal from './modals/CalendarModal';

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

  showCalendarModal: boolean;
}

class App extends React.Component<any, IAppState> {

  public state: IAppState = {
    showCalendarModal: false
  };

  public render() {   
    const { 
      searchedCourse, 
      calendarList, 
      calendar, 
      showCalendarModal 
    } = this.state;

    return (
      <div className="App">
        <CssBaseline />
        <TitleBar 
          courseList={this.state.courseList } 
          onCourseSearch={this.handleSearchCourse}
          onOpenCalendarModal={this.handleCalendarModalOpen}
          calendarText={calendar ? calendar.displayName : ""}
        />
        <CoursesView searchedCourse={searchedCourse} />
        <CalendarModal 
          calendars={calendarList}
          currentCalendar={calendar}
          isOpen={showCalendarModal}
          onClose={this.handleCalendarModalClose}
          />
      </div>
    );
  }

  public async componentDidMount() {
    const calendarList = await Network.LoadCalendarJSON();

    let calendar = GetCalendar();

    if(calendar === undefined){
      calendar = calendarList[0];
      SetCalendar(calendar);
    }

    this.setState({ calendarList, calendar });
  }

  public async componentDidUpdate(prevProps: any, prevState: IAppState) {
    const { calendar } = this.state;
    
    if (prevState.calendar !== calendar && calendar) {    
      Network.SetCalendarUri(calendar.uri);
      
      // Reset App
      const courseList = await Network.LoadCoursesListJSON();
    
      this.setState({
        courseList: courseList.Courses,
        searchedCourse: undefined       
      });
    }
  }

  private handleSearchCourse = (newCourse: Course) => {
    const { searchedCourse } = this.state;

    if(!searchedCourse || !newCourse.equals(searchedCourse)){
      this.setState( {searchedCourse: newCourse} );
    }
  }

  private handleCalendarModalOpen = () => {
    this.setState( { showCalendarModal: true});
  }

  private handleCalendarModalClose = (newCalendar: ICalendar) => {
    if(newCalendar){
      this.setState( {calendar: newCalendar} );
      SetCalendar(newCalendar);
    }
    
    this.setState( { showCalendarModal: false});
  }
}

export default App;
