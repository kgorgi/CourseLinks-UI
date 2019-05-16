import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Course from "../utils/Course";
import LocalStorage from '../utils/LocalStorage';
import Network from "../utils/Network";
import { ICalendar } from "../utils/ServerTypes";

import CalendarModal from './modals/CalendarModal';
import HelpModal from "./modals/HelpModal";
import WelcomeModal from './modals/WelcomeModal';

import CoursesView from './CoursesView';
import { MinSizeOverlay } from './MinSizeOverlay';
import TitleBar from "./TitleBar";

import './css/App.css';

const minHeight = 500;
const minWidth = 1315;

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

  showOverlay: boolean;
}

class App extends React.Component<any, IAppState> {

  public state: IAppState = {
    showCalendarModal: false,
    showHelpModal: false,
    showOverlay: false,
    showStartModal: false
  };

  public render() {
    const {
      searchedCourse,
      calendarList,
      calendar,
      showCalendarModal,
      showHelpModal,
      showStartModal,
      showOverlay
    } = this.state;

    const overlayClassname = "App-Overlay-" + (showOverlay ? 'Show' : 'Hide')
    return (
      <div className="App">
        <div className={overlayClassname}>
          <MinSizeOverlay />
        </div> 
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

    this.updateOverlay()
    window.addEventListener("resize", this.updateOverlay)
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

  public componentWillUnmount() {
    window.removeEventListener("resize", this.updateOverlay)
  }

  private updateOverlay = async () => {
    if(window.innerWidth < minWidth || window.innerHeight < minHeight){
      this.setState({
        showOverlay: true
      })
    } else {
      this.setState({
        showOverlay: false
      })
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
