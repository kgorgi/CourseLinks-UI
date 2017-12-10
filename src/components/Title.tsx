import * as React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import { Course } from "./Course";
import { LoadCourseJSON } from "./Network";

import "./css/Title.css";

export interface TitleProps {
    onSearch: (infoCourse: Course | undefined, graphInfo: any | undefined) => void;
}

const courseRegex = /^ *([A-Z|a-z]{2,4}) *(\d{3}) *$/;

interface TitleState {
    searchText: string;
    error: boolean;
    selectedCourse: string;
}

class Title extends React.Component<TitleProps, TitleState> {
    state: TitleState = {
        searchText: "",
        error: false,
        selectedCourse: ""
    };

    handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;
        this.setState({ searchText });
    }

    handleSearch = async (event?: any) => {
        if (event) {
            event.preventDefault();
        }

        const { searchText } = this.state;
        const matches = courseRegex.exec(searchText);
        if (matches && matches[1] && matches[2]) {
            const courseId =  matches[1].toLocaleUpperCase() + " " + matches[2];
            const course = new Course(courseId);
            try {
                const infoPackage = await LoadCourseJSON(course);
                this.props.onSearch(course, infoPackage);
                this.setState({ searchText: courseId, error: false, selectedCourse: courseId });
            } catch {
                this.setState({ error: true });
            }

        } else {
            this.setState({ error: true });
        }

    }

    render() {
        const { error, selectedCourse } = this.state;
        return (
            <div className="Title" style={{}}>
                <div className="Title-name"> Course Links: {selectedCourse}  </div>
                <div className="Title-middle">
                    <h4 className="Title-search-text"> Enter a Course: </h4>
                    <form className="Title-search-box" onSubmit={this.handleSearch}>
                        <TextField
                            value={this.state.searchText}
                            onChange={this.handleUserInput}
                            name="Enter a Course"
                            placeholder="SENG 265"
                            error={error}
                        />
                    </form>

                    <Button raised={true} color="primary" className="Title-search-button" onClick={this.handleSearch} >
                        Search
                    </Button>
                    <h4 className="Title-error">
                        {error && "Error: Invalid Course"}
                    </h4>
                </div>
                <Button
                    raised={true}
                    color="primary"
                    className="Title-about-button"
                >
                    About
                </Button>
            </div >
        );
    }
}

export default Title;
