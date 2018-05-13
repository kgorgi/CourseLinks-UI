import * as React from "react";

import Button from "material-ui/Button";
import Input, { } from "material-ui/Input";
import IconButton from "material-ui/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import Course from "../utils/Course";

import "./css/Title.css";

export interface TitleBarProps {
    onSearch: (courseStr: string) => any;
    graphCourse?: Course;
    invalidCourse: boolean;
    openAboutModal: () => void;
}

interface TitleBarState {
    searchText: string;
    aboutOpen: boolean;
    calender: string;
}

class Titlebar extends React.Component<TitleBarProps, TitleBarState> {
    state: TitleBarState = {
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
        const { invalidCourse, openAboutModal } = this.props;
        return (
            <div className="Title">
                <span className="Title-name">Course Links Beta</span>
                <div className="Title-middle">
                    <form className="Title-search-box" onSubmit={this.handleSearch}>
                        <Input
                            className="Title-search-text-box"
                            value={this.state.searchText}
                            onChange={this.handleUserInput}
                            name="Enter a Course"
                            placeholder="Enter a Course"
                            error={invalidCourse}
                            spellCheck={false}
                        />

                    </form>
                    <IconButton className="Title-search-icon">
                        <SearchIcon onClick={this.handleSearch} />
                    </IconButton>

                    {invalidCourse &&
                        <h4 className="Title-error">
                            Invalid Course
                        </h4>
                    }
                </div>
                <div className="Title-help-button-wrapper">
                    <Button
                        raised={true}
                        color="primary"
                        className="Title-help-button"
                        onClick={openAboutModal}
                    >
                        Help
                    </Button>
                </div>

            </div >
        );
    }
}

export default Titlebar;
