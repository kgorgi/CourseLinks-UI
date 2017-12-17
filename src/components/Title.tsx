import * as React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import { Course } from "./Course";

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "material-ui/Dialog";
import Slide from "material-ui/transitions/Slide";

import "./css/Title.css";

export interface TitleProps {
    onSearch: (courseStr: string) => any;
    graphCourse?: Course;
    invalidCourse: boolean;
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
        const { calender } = this.state;
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
                        <br /> <br />
                        Select Calender:
                    </DialogContentText>

                    <Select
                        value={calender}
                        onChange={this.handleCalenderSelect}
                        className="Title-search-box"
                        fullWidth={true}
                    >
                        <MenuItem value="Jan18">Janurary 2018</MenuItem>
                        <MenuItem value="Sept17">September 2017</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleAboutClose} color="primary">
                        Okay
                    </Button>
                </DialogActions>
            </ Dialog>);
    }

    render() {
        const { invalidCourse, graphCourse } = this.props;
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