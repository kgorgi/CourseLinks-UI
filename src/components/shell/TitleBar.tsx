import * as React from 'react';

import Course, { CourseRegex } from "../utils/Course";
import Logo from "./Logo";

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';

import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

import "./css/TitleBar.css";

const errorSlide: React.StatelessComponent = (props: any) => {
    return <Slide {...props} direction="down" />;
}

interface ITitleBarProps {
    courseList?: string[];
    onCourseSearch: (course: Course) => any;
    calendarText?: string;
    onOpenCalendarModal: () => void;
    onOpenHelpModal: () => void;
}

interface ITitleBarState {
    errorMessageVisible: boolean;
    invalidCourse: boolean;
    searchText: string;
    showCalendarModal: boolean;   
}

class Titlebar extends React.Component<ITitleBarProps, ITitleBarState> {
    
    public state: ITitleBarState = {       
        errorMessageVisible: false,
        invalidCourse: false,
        searchText: "",
        showCalendarModal: false,
    };

    public render() {
        const { courseList, onOpenCalendarModal, onOpenHelpModal, calendarText } = this.props;
        const { invalidCourse, searchText, errorMessageVisible } = this.state;
        
        return (
            <div className="TitleBar">
                <Logo />
                <div className="TitleBar-name"> Course Links </div>
                <div className="TitleBar-search">
                    <div className="TitleBar-searchBox">
                        <TextField 
                            className="TitleBar-searchInput"
                            placeholder="Enter a course (SENG 265)" 
                            value={searchText}
                            error={invalidCourse}
                            onChange={this.handleUserInput}
                            onKeyPress={this.handleKeyPress}
                            disabled={!courseList}
                            spellCheck={false}          
                        />
                    </div>
                    <Button 
                        variant="contained"
                        onClick={this.handleUserSearch}
                        disabled={!courseList}
                    >
                        Search
                    </Button>
                </div>
                <div className="TitleBar-calendar">
                    <div className="TitleBar-calendarName"> {calendarText} </div>                    
                    <Button 
                        variant="contained"
                        onClick={onOpenCalendarModal}
                    >
                        Switch Calendar
                    </Button>
                </div>
                
                <Button 
                    variant="contained"
                    onClick={onOpenHelpModal}
                >
                    Help
                </Button>
                <Snackbar
                    open={errorMessageVisible}
                    onClose={this.handleErrorClose}
                    TransitionComponent={errorSlide}
                >
                    <SnackbarContent
                        message={
                            <div className="TitleBar-errorMessage">
                                <ErrorIcon className="TitleBar-errorIcon" />
                                Invalid Course!
                            </div>
                        }
                        action={[
                            <IconButton
                                key="close"
                                color="inherit"
                                onClick={this.handleErrorClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                        />
                </Snackbar>                            
            </div>
        );
    }

    private handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;
        this.setState( { invalidCourse: false, searchText, errorMessageVisible: false} );  
    }

    private handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter'){
            this.handleUserSearch();
            event.preventDefault();
        }
    }

    private handleUserSearch = () => {
        const { searchText } = this.state;

        const matches = CourseRegex.exec(searchText);
        
        if (matches) {
            const fieldOfStudy = matches[1].toLocaleUpperCase();
            const courseNum = matches[2];

            if (fieldOfStudy && courseNum) {
                const id = fieldOfStudy + courseNum;
                const { courseList } = this.props;
                
                if (courseList && courseList.indexOf(id) > -1) {
                    const course = new Course(fieldOfStudy, courseNum);                    
                    this.props.onCourseSearch(course);
                    return;
                }
            }
        }
        
        this.setState({ invalidCourse: true, errorMessageVisible: true });
    }

    private handleErrorClose = () => {
        this.setState( { errorMessageVisible: false } );
    }
}

export default Titlebar;