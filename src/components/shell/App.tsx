import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';


import Course from "../utils/Course";
import LocalStorage from '../utils/LocalStorage';
import Network from "../utils/Network";
import { ICalendar } from "../utils/ServerTypes";

import CalendarModal from './modals/CalendarModal';
import HelpModal from "./modals/HelpModal";

import CoursesView from './CoursesView';
import TitleBar from "./TitleBar";

import './css/App.css';
import WelcomeModal from './modals/WelcomeModal';

interface IAppState {
  searchedCourse?: Course;

  /** The current list of all available calendars */
  calendarList?: ICalendar[];

  /** The current calendar */
  calendar?: ICalendar;

  /** The list of currently available courses */
  courseList?: string[];

  showCalendarModal: boolean;

  showHelpModal: boolean;

  showStartModal: boolean;
}

class App extends React.Component<any, IAppState> {

  public state: IAppState = {
    showCalendarModal: false,
    showHelpModal: false,
    showStartModal: false,
  };

  public render() {
    const {
      searchedCourse,
      calendarList,
      calendar,
      showCalendarModal,
      showHelpModal,
      showStartModal
    } = this.state;

    return (
      <div className="App">
        <CssBaseline />
        <TitleBar
          courseList={this.state.courseList}
          calendarText={calendar ? calendar.displayName : ""}
          onCourseSearch={this.handleSearchCourse}
          onOpenCalendarModal={this.handleCalendarModalOpen}
          onOpenHelpModal={this.handleHelpModalOpen}
        />
        <CoursesView searchedCourse={searchedCourse} />
        <CalendarModal
          calendars={calendarList}
          currentCalendar={calendar}
          isOpen={showCalendarModal}
          onClose={this.handleCalendarModalClose}
        />
        <HelpModal
          isOpen={showHelpModal}
          onClose={this.handleHelpModalClose}
        />
        <WelcomeModal
          isOpen={showStartModal}
          onClose={this.handleWelcomeModalClose}
        />
      </div>
    );
  }

  public async componentDidMount() {
    const calendarList = await Network.LoadCalendarJSON();

    let calendar = LocalStorage.GetCalendar();

    if (calendar === undefined) {
      calendar = calendarList[0];
      LocalStorage.SetCalendar(calendar);
    }

    this.setState({ calendarList, calendar });

    // Show StartModal
    const showStartModal = LocalStorage.GetShowStartModal();
    this.setState({ showStartModal });
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

    if (!searchedCourse || !newCourse.equals(searchedCourse)) {
      this.setState({ searchedCourse: newCourse });
    }
  }

  // Modal Functions

  private handleCalendarModalOpen = () => {
    this.setState({ showCalendarModal: true });
  }

  private handleCalendarModalClose = (newCalendar?: ICalendar) => {
    if (newCalendar) {
      this.setState({ calendar: newCalendar });
      LocalStorage.SetCalendar(newCalendar);
    }

    this.setState({ showCalendarModal: false });
  }

  private handleHelpModalOpen = () => {
    this.setState({ showHelpModal: true });
  }

  private handleHelpModalClose = () => {
    this.setState({ showHelpModal: false });
  }

  private handleWelcomeModalClose = () => {
    this.setState({ showStartModal: false });
  }
}

export default App;
