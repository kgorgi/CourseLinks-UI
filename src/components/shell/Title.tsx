import * as React from "react";

import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

import  Course from "../utils/Course";

import "./css/Title.css";

export interface TitleProps {
    onSearch: (courseStr: string) => any;
    graphCourse?: Course;
    invalidCourse: boolean;
    openAboutModal: () => void;
}

interface TitleState {
    searchText: string;
    aboutOpen: boolean;
    calender: string;
}

class Title extends React.Component<TitleProps, TitleState> {
    state: TitleState = {
        searchText: "",
        aboutOpen: true,
        calender: "Jan18",
    };

    handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;
        this.setState({ searchText });
    }

    handleSearch = async (event?: any) => {
        if (event) {
            event.preventDefault();
        }

        this.props.onSearch(this.state.searchText);
    }

    render() {
        const { invalidCourse, graphCourse, openAboutModal } = this.props;
        return (
            <div className="Title" style={{}}>
                <div className="Title-name"> Course Links{graphCourse && ": " + graphCourse.name}</div>
                <div className="Title-middle">
                    <h4 className="Title-text"> Enter a Course: </h4>
                    <form className="Title-search-box" onSubmit={this.handleSearch}>
                        <TextField
                            value={this.state.searchText}
                            onChange={this.handleUserInput}
                            name="Enter a Course"
                            placeholder="SENG 265"
                            error={invalidCourse}
                        />
                    </form>

                    <Button raised={true} color="primary" className="Title-search-button" onClick={this.handleSearch} >
                        Search
                    </Button>
                    <h4 className="Title-error">
                        {invalidCourse && "Error: Invalid Course"}
                    </h4>
                </div>
                <Button
                    raised={true}
                    color="primary"
                    className="Title-about-button"
                    onClick={openAboutModal}
                >
                    About
                </Button>
            </div >
        );
    }
}

export default Title;
