import * as React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import { Course, GraphInfo } from "./Course";
import { LoadCourseJSON } from "./Network";

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "material-ui/Dialog";
import Slide from "material-ui/transitions/Slide";

import "./css/Title.css";

export interface TitleProps {
    onSearch: (infoCourse: Course | undefined, graphInfo: GraphInfo | undefined) => void;
}

const courseRegex = /^ *([A-Z|a-z]{2,4}) *(\d{3}) *$/;

interface TitleState {
    searchText: string;
    error: boolean;
    selectedCourse: string;
    aboutOpen: boolean;
    calender: string;
}

class Title extends React.Component<TitleProps, TitleState> {
    state: TitleState = {
        searchText: "",
        error: false,
        selectedCourse: "",
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

        const { searchText } = this.state;
        const matches = courseRegex.exec(searchText);
        if (matches && matches[1] && matches[2]) {
            const courseId = matches[1].toLocaleUpperCase() + " " + matches[2];
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

    handleCalenderSelect = (event: any) => {
        const calender = event.target.value;
        this.setState({ calender });
    }

    handleAboutOpen = () => {
        this.setState({ aboutOpen: true });
    }

    handleAboutClose = () => {
        this.setState({ aboutOpen: false });
    }

    createDialog = () => {
        return (
            <Dialog
                open={this.state.aboutOpen}
                transition={Transition}
                keepMounted={true}
                onRequestClose={this.handleAboutClose}
            >
                <DialogTitle>{"Welcome to Course Links!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Course Links is a website that shows you the different kind of links between UVic Courses.
                         <br /> <br />
                        Created by Kian Gorgichuk and Amandeep Singh
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleAboutClose} color="primary">
                        Okay
                    </Button>
                </DialogActions>
            </ Dialog>);
    }

    render() {
        const { error, selectedCourse, calender } = this.state;
        return (
            <div className="Title" style={{}}>
                <div className="Title-name"> Course Links{selectedCourse && ": " + selectedCourse}</div>

                <div className="Title-calender">
                    <h4 className="Title-text"> Calender: </h4>
                    <Select
                        value={calender}
                        onChange={this.handleCalenderSelect}
                        className="Title-search-box"
                        fullWidth={true}
                    >
                        <MenuItem value="Jan18">Janurary 2018</MenuItem>
                        <MenuItem value="Sept17">September 2017</MenuItem>
                    </Select>
                </div>

                <div className="Title-middle">

                    <h4 className="Title-text"> Enter a Course: </h4>
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
                    onClick={this.handleAboutOpen}
                >
                    About
                </Button>
                {this.createDialog()}
            </div >
        );
    }
}

export default Title;

function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}