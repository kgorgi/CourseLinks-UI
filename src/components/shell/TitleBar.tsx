import * as React from 'react';

import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

import { CourseRegex } from "../utils/Course";
import "./css/TitleBar.css";

const errorSlide: React.StatelessComponent = (props: any) => {
    return <Slide {...props} direction="down" />;
}

interface ITitleBarProps {
    courseList?: string[];
    onCourseSearch: (course: string) => any;
}

interface ITitleBarState {
    errorMessageVisible: boolean;
    invalidCourse: boolean;
    searchText: string;   
}

class Titlebar extends React.Component<ITitleBarProps, ITitleBarState> {
    
    public state: ITitleBarState = {       
        errorMessageVisible: false,
        invalidCourse: false,
        searchText: "",
    };

    public render() {
        const { invalidCourse, searchText, errorMessageVisible } = this.state;

        return (
            <div className="TitleBar">
                <div className="TitleBar-name"> Course Links </div>
                <div className="TitleBar-search">
                    <div className="TitleBar-searchBox">
                        <TextField 
                            className="TitleBar-searchInput"
                            placeholder="Enter a course" 
                            value={searchText}
                            error={invalidCourse}
                            onChange={this.handleUserInput}
                        />
                    </div>
                    <Button 
                        variant="contained"
                        onClick={this.handleUserSearch}
                    >
                        Search
                    </Button>
                </div>
                <div className="TitleBar-calendar">
                    <div className="TitleBar-calendarName"> Spring 2018 </div>                    
                    <Button variant="contained">
                        Switch Calendar
                    </Button>
                </div>
                
                <Button variant="contained" >
                    Help
                </Button>
                <Snackbar
                    open={errorMessageVisible}
                    onClose={this.handleErrorClose}
                    TransitionComponent={errorSlide}
                    message={<span>Invalid Course!</span>}
                />                            
            </div>
        );
    }

    private handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;

        if (searchText.endsWith("\n")){
            this.handleUserSearch();
        } else {
            this.setState( { invalidCourse: false, searchText} );
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
                const { courseList, onCourseSearch } = this.props;
                
                if (courseList && courseList.indexOf(id) > -1) {
                    onCourseSearch(id);
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